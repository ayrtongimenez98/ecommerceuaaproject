using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UAAEcommerce.Models
{
    public class PedidoModel
    {
        public int IdPedido { get; set; }
        public int IdCliente { get; set; }
        public bool Confirmado { get; set; }
        public int Total { get; set; }
        public List<PedidoDetalleModel> Detalle { get; set; }
    }
}