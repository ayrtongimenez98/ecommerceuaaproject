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
using UAAEcommerce.Models;

namespace UAAEcommerce.Controllers
{
    public class ContactModelsController : ApiController
    {
        private UAAEcommerceEntities2 db = new UAAEcommerceEntities2();

        // GET: api/ContactModels
        public IQueryable<ContactModel> GetContactModels()
        {
            return db.ContactModels;
        }

        // GET: api/ContactModels/5
        [ResponseType(typeof(ContactModel))]
        public async Task<IHttpActionResult> GetContactModel(int id)
        {
            ContactModel contactModel = await db.ContactModels.FindAsync(id);
            if (contactModel == null)
            {
                return NotFound();
            }

            return Ok(contactModel);
        }

        // PUT: api/ContactModels/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutContactModel(int id, ContactModel contactModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != contactModel.Id)
            {
                return BadRequest();
            }

            db.Entry(contactModel).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactModelExists(id))
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

        // POST: api/ContactModels
        [ResponseType(typeof(ContactModel))]
        public async Task<IHttpActionResult> PostContactModel(ContactModel contactModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ContactModels.Add(contactModel);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = contactModel.Id }, contactModel);
        }

        // DELETE: api/ContactModels/5
        [ResponseType(typeof(ContactModel))]
        public async Task<IHttpActionResult> DeleteContactModel(int id)
        {
            ContactModel contactModel = await db.ContactModels.FindAsync(id);
            if (contactModel == null)
            {
                return NotFound();
            }

            db.ContactModels.Remove(contactModel);
            await db.SaveChangesAsync();

            return Ok(contactModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ContactModelExists(int id)
        {
            return db.ContactModels.Count(e => e.Id == id) > 0;
        }
    }
}