using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UAAEcommerce.Models
{
    public class AgregarAPedidoModel
    {
        public int IdPedido { get; set; }
        public int IdProducto { get; set; }
        public int IdCliente { get; set; }
        public int Cantidad { get; set; }
    }
}