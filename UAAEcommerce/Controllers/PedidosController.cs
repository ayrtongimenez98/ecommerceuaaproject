using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using UAAEcommerce.Areas.Admin.Models;
using UAAEcommerce.Models;
using UAAEcommerce.Services;

namespace UAAEcommerce.Controllers
{
    public class PedidosController : ApiController
    {
        private DataContext db = new DataContext();
        private BlobStorageService blobStorage = new BlobStorageService();
        // GET: api/Pedidos
        public IQueryable<Pedido> GetPedido()
        {
            return db.Pedido;
        }

        // GET: api/Pedidos/5
        [ResponseType(typeof(Pedido))]
        public IHttpActionResult GetPedido(int id)
        {
            Pedido pedido = db.Pedido.Include(x => x.PedidoDetalle).FirstOrDefault(x => x.idPedido == id);
            if (pedido == null)
            {
                return NotFound();
            }

            var model = new PedidoModel() {
                IdPedido = pedido.idPedido,
                Confirmado = pedido.ped_confirmado == "True",
                IdCliente = pedido.idCliente
            };
            foreach (var item in pedido.PedidoDetalle)
            {
                var itemModel = new PedidoDetalleModel() {
                    IPedidoDetalle = item.idPedidoDetalle,
                    Cantidad = item.pedet_cantidad,
                    Descripcion = item.Producto.pro_descripcion,
                    IdPedido = pedido.idPedido,
                    IdProducto = item.idProducto,
                    Precio = item.pedet_precio,
                    SubTotal = item.pedet_montototal,
                    Photo = blobStorage.GetBlobUrl(item.Producto.pro_blobname, item.Producto.pro_blobcontainername)
                };
                model.Total += itemModel.SubTotal;
                model.Detalle.Add(itemModel);
            }
            return Ok(pedido);
        }

        // PUT: api/Pedidos/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPedido(int id, PedidoModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != model.IdPedido)
            {
                return BadRequest();
            }
            var pedido = db.Pedido.Find(model.IdPedido);
            pedido.ped_confirmado = model.Confirmado.ToString();
            db.Entry(pedido).State = EntityState.Modified;

            try
            {
                var result = await db.SaveChangesAsync() > 0;
                var validation = new SystemValidationModel()
                {
                    Success = result,
                    Message = result ? "Actualizado con exito" : "Error al actualizar el pedido"
                };

                return Ok(validation);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PedidoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }

        // POST: api/Pedidos
        [ResponseType(typeof(Pedido))]
        public async Task<IHttpActionResult> PostPedido(Pedido pedido)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Pedido.Add(pedido);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = pedido.idPedido }, pedido);
        }

        // DELETE: api/Pedidos/5
        [ResponseType(typeof(Pedido))]
        public async Task<IHttpActionResult> DeletePedido(int id)
        {
            Pedido pedido = await db.Pedido.FindAsync(id);
            if (pedido == null)
            {
                return NotFound();
            }

            db.Pedido.Remove(pedido);
            await db.SaveChangesAsync();

            return Ok(pedido);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PedidoExists(int id)
        {
            return db.Pedido.Count(e => e.idPedido == id) > 0;
        }
    }
}