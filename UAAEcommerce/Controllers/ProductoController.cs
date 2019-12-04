using ProductRecommender.DataModel;
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
using System.Web.Http.Description;
using UAAEcommerce.Areas.Admin.Models;
using UAAEcommerce.Services;

namespace UAAEcommerce.Controllers
{
    public class ProductoController : ApiController
    {
        private UAAEcommerceEntities2 db = new UAAEcommerceEntities2();
        private Recommender recommender = new Recommender();
        private BlobStorageService blobStorage = new BlobStorageService();
        // GET: api/Producto

        public IEnumerable<Producto> GetProducto()
        {
            var productos = db.Producto.ToList();
            foreach (var item in productos)
            {
                item.pro_blobname = blobStorage.GetBlobUrl(item.pro_blobname, item.pro_blobcontainername);
            }
            return productos;
        }

        // GET: api/Producto/5
        [ResponseType(typeof(Producto))]
        public async Task<IHttpActionResult> GetProducto(int id)
        {
            Producto producto = await db.Producto.FindAsync(id);
            if (producto == null)
            {
                return NotFound();
            }

            return Ok(producto);
        }

        // PUT: api/Producto/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutProducto(int id, Producto producto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != producto.idProducto)
            {
                return BadRequest();
            }

            db.Entry(producto).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Producto
        [ResponseType(typeof(Producto))]
        public async Task<IHttpActionResult> PostProducto(Producto producto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Producto.Add(producto);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = producto.idProducto }, producto);
        }

        // DELETE: api/Producto/5
        [ResponseType(typeof(Producto))]
        public async Task<IHttpActionResult> DeleteProducto(int id)
        {
            Producto producto = await db.Producto.FindAsync(id);
            if (producto == null)
            {
                return NotFound();
            }

            db.Producto.Remove(producto);
            await db.SaveChangesAsync();

            return Ok(producto);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        public IEnumerable<Producto> Recommendations(int id)
        {
            var enigneTask = recommender.GetEngine();
            var productTask = db.Producto
                .FirstOrDefaultAsync(x => x.idProducto == id);
            Task.WaitAll(enigneTask, productTask);

            var engine = enigneTask.Result;
            var product = productTask.Result;

            var products = db.Producto.Where(x =>  x.TipoProducto.idTipoProducto == product.TipoProducto.idTipoProducto && x.idProducto != id).ToList();
            var scores = new Dictionary<int, float>();
            foreach (var coProduct in products)
            {
                var input = new ProductInput
                {
                    ProductId = (uint)product.idProducto,
                    CoPurchasedProductId = (uint)coProduct.idProducto
                };

                scores.Add(coProduct.idProducto, engine.Predict(input).Score);
            }

            var recommendationIds = scores.OrderByDescending(x => x.Value).Take(5).Select(x => x.Key).ToList();
            var recommendations = products.Where(x => recommendationIds.Contains(x.idProducto)).ToList();
            foreach (var item in recommendations)
            {
                item.pro_blobname = blobStorage.GetBlobUrl(item.pro_blobname, item.pro_blobcontainername);
            }
            return recommendations;
        }

        private bool ProductoExists(int id)
        {
            return db.Producto.Count(e => e.idProducto == id) > 0;
        }
    }
}