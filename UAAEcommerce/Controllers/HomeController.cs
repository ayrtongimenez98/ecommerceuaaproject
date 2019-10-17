using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using UAAEcommerce.Areas.Admin.Models;
using UAAEcommerce.Models;

namespace UAAEcommerce.Controllers
{
    public class HomeController : Controller
    {
        private UAAEcommerceEntities2 db = new UAAEcommerceEntities2();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> CreateMessage([Bind(Include = "idMensajes,mens_email,mens_nombrecompleto,mens_texto,mens_interes")] MensajesWeb mensajesWeb)
        {
            if (ModelState.IsValid)
            {
                db.MensajesWeb.Add(mensajesWeb);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(mensajesWeb);
        }
    }
}