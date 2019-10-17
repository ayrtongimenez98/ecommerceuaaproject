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
    public class TipoClientesController : Controller
    {
        private UAAEcommerceEntities2 db = new UAAEcommerceEntities2();

        // GET: Admin/TipoClientes
        public async Task<ActionResult> Index()
        {
            return View(await db.TipoCliente.ToListAsync());
        }

        // GET: Admin/TipoClientes/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TipoCliente tipoCliente = await db.TipoCliente.FindAsync(id);
            if (tipoCliente == null)
            {
                return HttpNotFound();
            }
            return View(tipoCliente);
        }
        [Authorize]
        // GET: Admin/TipoClientes/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin/TipoClientes/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "idTipoCliente,tipcli_descripcion")] TipoCliente tipoCliente)
        {
            if (ModelState.IsValid)
            {
                db.TipoCliente.Add(tipoCliente);
                await db.SaveChangesAsync();
                //return RedirectToAction("Index");
                return RedirectToAction("Create");
            }

            return View(tipoCliente);
        }

        // GET: Admin/TipoClientes/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TipoCliente tipoCliente = await db.TipoCliente.FindAsync(id);
            if (tipoCliente == null)
            {
                return HttpNotFound();
            }
            return View(tipoCliente);
        }

        // POST: Admin/TipoClientes/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que desea enlazarse. Para obtener 
        // más información vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "idTipoCliente,tipcli_descripcion")] TipoCliente tipoCliente)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tipoCliente).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(tipoCliente);
        }

        // GET: Admin/TipoClientes/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TipoCliente tipoCliente = await db.TipoCliente.FindAsync(id);
            if (tipoCliente == null)
            {
                return HttpNotFound();
            }
            return View(tipoCliente);
        }

        // POST: Admin/TipoClientes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            TipoCliente tipoCliente = await db.TipoCliente.FindAsync(id);
            db.TipoCliente.Remove(tipoCliente);
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
