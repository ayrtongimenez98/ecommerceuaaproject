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
    public class CiudadsController : ApiController
    {
        private UAAEcommerceEntities2 db = new UAAEcommerceEntities2();

        // GET: api/Ciudads
        public IQueryable<Ciudad> GetCiudad()
        {
            return db.Ciudad;
        }

        // GET: api/Ciudads/5
        [ResponseType(typeof(Ciudad))]
        public async Task<IHttpActionResult> GetCiudad(int id)
        {
            Ciudad ciudad = await db.Ciudad.FindAsync(id);
            if (ciudad == null)
            {
                return NotFound();
            }

            return Ok(ciudad);
        }

        // PUT: api/Ciudads/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCiudad(int id, Ciudad ciudad)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ciudad.idCiudad)
            {
                return BadRequest();
            }

            db.Entry(ciudad).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CiudadExists(id))
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

        // POST: api/Ciudads
        [ResponseType(typeof(Ciudad))]
        public async Task<IHttpActionResult> PostCiudad(Ciudad ciudad)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Ciudad.Add(ciudad);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = ciudad.idCiudad }, ciudad);
        }

        // DELETE: api/Ciudads/5
        [ResponseType(typeof(Ciudad))]
        public async Task<IHttpActionResult> DeleteCiudad(int id)
        {
            Ciudad ciudad = await db.Ciudad.FindAsync(id);
            if (ciudad == null)
            {
                return NotFound();
            }

            db.Ciudad.Remove(ciudad);
            await db.SaveChangesAsync();

            return Ok(ciudad);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CiudadExists(int id)
        {
            return db.Ciudad.Count(e => e.idCiudad == id) > 0;
        }
    }
}