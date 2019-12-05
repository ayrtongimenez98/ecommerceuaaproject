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
    public class MensajesWebsController : ApiController
    {
        private DataContext db = new DataContext();

        // GET: api/MensajesWebs
        public IQueryable<MensajesWeb> GetMensajesWeb()
        {
            return db.MensajesWeb;
        }

        // GET: api/MensajesWebs/5
        [ResponseType(typeof(MensajesWeb))]
        public async Task<IHttpActionResult> GetMensajesWeb(int id)
        {
            MensajesWeb mensajesWeb = await db.MensajesWeb.FindAsync(id);
            if (mensajesWeb == null)
            {
                return NotFound();
            }

            return Ok(mensajesWeb);
        }

        // PUT: api/MensajesWebs/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutMensajesWeb(int id, MensajesWeb mensajesWeb)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != mensajesWeb.idMensajes)
            {
                return BadRequest();
            }

            db.Entry(mensajesWeb).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MensajesWebExists(id))
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

        // POST: api/MensajesWebs
        [ResponseType(typeof(MensajesWeb))]
        public async Task<IHttpActionResult> PostMensajesWeb(MensajesWeb mensajesWeb)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.MensajesWeb.Add(mensajesWeb);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = mensajesWeb.idMensajes }, mensajesWeb);
        }

        // DELETE: api/MensajesWebs/5
        [ResponseType(typeof(MensajesWeb))]
        public async Task<IHttpActionResult> DeleteMensajesWeb(int id)
        {
            MensajesWeb mensajesWeb = await db.MensajesWeb.FindAsync(id);
            if (mensajesWeb == null)
            {
                return NotFound();
            }

            db.MensajesWeb.Remove(mensajesWeb);
            await db.SaveChangesAsync();

            return Ok(mensajesWeb);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MensajesWebExists(int id)
        {
            return db.MensajesWeb.Count(e => e.idMensajes == id) > 0;
        }
    }
}