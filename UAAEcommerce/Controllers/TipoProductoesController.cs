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

namespace UAAEcommerce.Controllers
{
    public class TipoProductoesController : ApiController
    {
        private UAAEcommerceEntities2 db = new UAAEcommerceEntities2();

        // GET: api/TipoProductoes
        public IQueryable<TipoProducto> GetTipoProducto()
        {
            return db.TipoProducto;
        }

        // GET: api/TipoProductoes/5
        [ResponseType(typeof(TipoProducto))]
        public async Task<IHttpActionResult> GetTipoProducto(int id)
        {
            TipoProducto tipoProducto = await db.TipoProducto.FindAsync(id);
            if (tipoProducto == null)
            {
                return NotFound();
            }

            return Ok(tipoProducto);
        }

        // PUT: api/TipoProductoes/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutTipoProducto(int id, TipoProducto tipoProducto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tipoProducto.idTipoProducto)
            {
                return BadRequest();
            }

            db.Entry(tipoProducto).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TipoProductoExists(id))
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

        // POST: api/TipoProductoes
        [ResponseType(typeof(TipoProducto))]
        public async Task<IHttpActionResult> PostTipoProducto(TipoProducto tipoProducto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TipoProducto.Add(tipoProducto);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = tipoProducto.idTipoProducto }, tipoProducto);
        }

        // DELETE: api/TipoProductoes/5
        [ResponseType(typeof(TipoProducto))]
        public async Task<IHttpActionResult> DeleteTipoProducto(int id)
        {
            TipoProducto tipoProducto = await db.TipoProducto.FindAsync(id);
            if (tipoProducto == null)
            {
                return NotFound();
            }

            db.TipoProducto.Remove(tipoProducto);
            await db.SaveChangesAsync();

            return Ok(tipoProducto);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TipoProductoExists(int id)
        {
            return db.TipoProducto.Count(e => e.idTipoProducto == id) > 0;
        }
    }
}