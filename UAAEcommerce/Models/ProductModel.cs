using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UAAEcommerce.Models
{
    public class ProductModel
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public string Photo { get; set; }
        public int Precio { get; set; }
        public string TipoProducto { get; set; }
    }
}