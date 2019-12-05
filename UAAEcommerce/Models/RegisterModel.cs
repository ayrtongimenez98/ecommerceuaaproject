using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UAAEcommerce.Models
{
    public class RegisterModel
    {
        public string Email { get; set; }
        public int CiudadId { get; set; }
        public string Ruc { get; set; }
        public string RazonSocial { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public string Password { get; set; }
    }
}