using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using UAAEcommerce.Areas.Admin.Models;
using UAAEcommerce.Models;

namespace UAAEcommerce.Controllers
{
    [EnableCors("*", "*", "*")]
    public class PedidoDetallesController : ApiController
    {
        private DataContext db = new DataContext();

        // GET: api/PedidoDetalles
        public IQueryable<PedidoDetalle> GetPedidoDetalle()
        {
            return db.PedidoDetalle;
        }

        // GET: api/PedidoDetalles/5
        [ResponseType(typeof(PedidoDetalle))]
        public async Task<IHttpActionResult> GetPedidoDetalle(int id)
        {
            PedidoDetalle pedidoDetalle = await db.PedidoDetalle.FindAsync(id);
            if (pedidoDetalle == null)
            {
                return NotFound();
            }

            return Ok(pedidoDetalle);
        }

        // PUT: api/PedidoDetalles/5
        [ResponseType(typeof(SystemValidationModel))]
        [AcceptVerbs("POST", "PUT", "OPTIONS")]
        public async Task<IHttpActionResult> PutPedidoDetalle(AgregarAPedidoModel model)
        {
            if (model.IdPedido == 0)
            {
                var pedido = new Pedido();
                try
                {
                    var cliente = db.Cliente.Find(model.IdCliente);
                    if (db.Pedido.Any())
                    {
                        pedido.idPedido = db.Pedido.Max(x => x.idPedido) + 1;
                    } else
                    {
                        pedido.idPedido = 1;
                    }
                    pedido.idCliente = model.IdCliente;
                    pedido.Cliente = cliente;
                    pedido.ped_confirmado = "N";
                    pedido.ped_descuento = 1;
                    pedido.ped_fecha = DateTime.Now;
                    
                    db.Pedido.Add(pedido);
                    var result = db.SaveChanges();
                    var product = db.Producto.Find(model.IdProducto);
                    var detalle = new PedidoDetalle()
                    {
                        idPedidoCabecera = pedido.idPedido,
                        Producto = product,
                        idProducto = product.idProducto,
                        pedet_cantidad = model.Cantidad,
                        pedet_precio = product.pro_precio,
                        pedet_montototal = product.pro_precio * model.Cantidad

                    };
                    db.PedidoDetalle.Add(detalle);
                   

                    await db.SaveChangesAsync();

                }
                catch (Exception ex)
                {

                    throw;
                }
                return Json(new SystemValidationModel() { Message = pedido.idPedido.ToString(), Success = true });
            }
            else
            {
                var detalle = db.PedidoDetalle.FirstOrDefault(x => x.idPedidoCabecera == model.IdPedido && x.idProducto == model.IdProducto);
                if (detalle is null)
                {
                    var product = db.Producto.Find(model.IdProducto);
                    var newdetalle = new PedidoDetalle()
                    {
                        idPedidoCabecera = model.IdPedido,
                        Producto = product,
                        idProducto = product.idProducto,
                        pedet_cantidad = model.Cantidad,
                        pedet_precio = product.pro_precio,
                        pedet_montototal = product.pro_precio * model.Cantidad

                    };
                    db.PedidoDetalle.Add(newdetalle);
                    var result = await db.SaveChangesAsync() > 0;

                    var validation = new SystemValidationModel()
                    {
                        Success = result,
                        Message = result ? model.IdPedido.ToString() : "Error al ingresar/actualizar el producto"
                    };
                    return Json(validation);
                }
                else
                {
                    detalle.pedet_cantidad = model.Cantidad;
                    db.Entry(detalle).State = EntityState.Modified;
                    var result = await db.SaveChangesAsync() > 0;

                    var validation = new SystemValidationModel()
                    {
                        Success = result,
                        Message = result ? model.IdPedido.ToString() : "Error al ingresar/actualizar el producto"
                    };
                    return Json(validation);
                }

                

            }
        }

        // POST: api/PedidoDetalles
        [ResponseType(typeof(PedidoDetalle))]
        public async Task<IHttpActionResult> PostPedidoDetalle(AgregarAPedidoModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (model.IdPedido == 0)
            {
                var pedido = new Pedido()
                {
                    idCliente = model.IdCliente,
                    ped_confirmado = "False",
                    ped_descuento = 0,
                    ped_fecha = DateTime.Now
                };

                db.Pedido.Add(pedido);
                db.SaveChanges();
                model.IdPedido = pedido.idPedido;
            } 
            var producto = db.Producto.Find(model.IdProducto);
            var pedidoDetalle = new PedidoDetalle()
            {
                idPedidoCabecera = model.IdPedido,
                idProducto = model.IdProducto,
                pedet_cantidad = model.Cantidad,
                pedet_montototal = model.Cantidad * producto.pro_precio,
                pedet_precio = producto.pro_precio
            };

            db.PedidoDetalle.Add(pedidoDetalle);
            
            var result = await db.SaveChangesAsync() > 0;

            var validation = new SystemValidationModel()
            {
                Success = result,
                Message = result ? model.IdPedido.ToString() : "Error al ingresar/actualizar el producto"
            };

            return Ok(validation);
        }

        // DELETE: api/PedidoDetalles/5
        [ResponseType(typeof(PedidoDetalle))]
        public async Task<IHttpActionResult> DeletePedidoDetalle(int id)
        {
            PedidoDetalle pedidoDetalle = await db.PedidoDetalle.FindAsync(id);
            if (pedidoDetalle == null)
            {
                return NotFound();
            }

            db.PedidoDetalle.Remove(pedidoDetalle);
            await db.SaveChangesAsync();

            return Ok(pedidoDetalle);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PedidoDetalleExists(int id)
        {
            return db.PedidoDetalle.Count(e => e.idPedidoDetalle == id) > 0;
        }
    }
}