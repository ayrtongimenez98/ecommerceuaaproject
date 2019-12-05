using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using UAAEcommerce.Areas.Admin.Models;

namespace UAAEcommerce.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    public class MensajesWebsController : Controller
    {
        private DataContext db = new DataContext();

        // GET: Admin/MensajesWebs
        public async Task<ActionResult> Index()
        {
            return View(await db.MensajesWeb.ToListAsync());
        }

        // GET: Admin/MensajesWebs/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            MensajesWeb mensajesWeb = await db.MensajesWeb.FindAsync(id);
            if (mensajesWeb == null)
            {
                return HttpNotFound();
            }
            return View(mensajesWeb);
        }

        // GET: Admin/MensajesWebs/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin/MensajesWebs/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "idMensajes,mens_email,mens_nombrecompleto,mens_texto,mens_interes")] MensajesWeb mensajesWeb)
        {
            if (ModelState.IsValid)
            {
                db.MensajesWeb.Add(mensajesWeb);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(mensajesWeb);
        }

        // GET: Admin/MensajesWebs/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            MensajesWeb mensajesWeb = await db.MensajesWeb.FindAsync(id);
            if (mensajesWeb == null)
            {
                return HttpNotFound();
            }
            return View(mensajesWeb);
        }

        // POST: Admin/MensajesWebs/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "idMensajes,mens_email,mens_nombrecompleto,mens_texto,mens_interes")] MensajesWeb mensajesWeb)
        {
            if (ModelState.IsValid)
            {
                db.Entry(mensajesWeb).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(mensajesWeb);
        }

        // GET: Admin/MensajesWebs/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            MensajesWeb mensajesWeb = await db.MensajesWeb.FindAsync(id);
            if (mensajesWeb == null)
            {
                return HttpNotFound();
            }
            return View(mensajesWeb);
        }

        // POST: Admin/MensajesWebs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            MensajesWeb mensajesWeb = await db.MensajesWeb.FindAsync(id);
            db.MensajesWeb.Remove(mensajesWeb);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
