﻿using ProductRecommender.DataModel;
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
using UAAEcommerce.Services;

namespace UAAEcommerce.Controllers
{
    [EnableCors("*", "*", "*")]
    public class ProductoController : ApiController
    {
        private DataContext db = new DataContext();
        private Recommender recommender = new Recommender();
        private BlobStorageService blobStorage = new BlobStorageService();
        // GET: api/Producto
        [EnableCors("http://localhost:4200", // Origin
              null,                     // Request headers
              "*",                    // HTTP methods
              "bar",                    // Response headers
              SupportsCredentials = true  // Allow credentials
  )]
        public IEnumerable<ProductModel> GetProducto()
        {
            var productos = db.Producto.Include(x => x.TipoProducto).ToList();
            var models = new List<ProductModel>();
            foreach (var item in productos)
            {
                var model = new ProductModel()
                {
                    Descripcion = item.pro_descripcion,
                    Id = item.idProducto,
                    Photo = blobStorage.GetBlobUrl(item.pro_blobname, item.pro_blobcontainername),
                    Precio = item.pro_precio,
                    TipoProducto = item.TipoProducto.tipro_descripcion,
                    Descripcionlarga = item.pro_descripcionlarga
                };
                models.Add(model);
            };
            return models;
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
            var model = new ProductModel()
            {
                Descripcion = producto.pro_descripcion,
                Id = producto.idProducto,
                Photo = blobStorage.GetBlobUrl(producto.pro_blobname, producto.pro_blobcontainername),
                Precio = producto.pro_precio,
                TipoProducto = producto.TipoProducto.tipro_descripcion,
                Descripcionlarga = producto.pro_descripcionlarga
            };

            if (db.PedidoDetalle.Any(x => x.idProducto == id))
            {
                model.Recomendaciones = await Recommendations(id);
            }

            return Ok(model);
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

        public async Task<List<ProductModel>> Recommendations(int id)
        {
            var enigneTask = await recommender.GetEngine();
            var productTask = await db.Producto
                .FirstOrDefaultAsync(x => x.idProducto == id);

            var engine = enigneTask;
            var product = productTask;

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
            var models = new List<ProductModel>();
            foreach (var item in recommendations)
            {
                var model = new ProductModel()
                {
                    Descripcion = item.pro_descripcion,
                    Id = item.idProducto,
                    Photo = blobStorage.GetBlobUrl(item.pro_blobname, item.pro_blobcontainername),
                    Precio = item.pro_precio,
                    TipoProducto = item.TipoProducto.tipro_descripcion,
                    Descripcionlarga = item.pro_descripcionlarga
                };
                models.Add(model);
            };
            return models;
        }

        private bool ProductoExists(int id)
        {
            return db.Producto.Count(e => e.idProducto == id) > 0;
        }
    }
}