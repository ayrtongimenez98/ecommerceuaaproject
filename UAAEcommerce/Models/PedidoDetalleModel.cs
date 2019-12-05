using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UAAEcommerce.Models
{
    public class PedidoDetalleModel
    {
        public int IPedidoDetalle { get; set; }
        public int IdPedido { get; set; }
        public int IdProducto { get; set; }
        public string Photo { get; set; }
        public string Descripcion { get; set; }
        public int Precio { get; set; }
        public int Cantidad { get; set; }
        public int SubTotal { get; set; }
    }
}