//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace UAAEcommerce.Areas.Admin.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Producto
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Producto()
        {
            this.PedidoDetalle = new HashSet<PedidoDetalle>();
        }
    
        public int idProducto { get; set; }
        public int idTipoProducto { get; set; }
        public string pro_descripcion { get; set; }
        public string pro_codigobarra { get; set; }
        public int pro_precio { get; set; }
        public string pro_blobname { get; set; }
        public string pro_blobcontainername { get; set; }
        public string pro_descripcionlarga { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PedidoDetalle> PedidoDetalle { get; set; }
        public virtual TipoProducto TipoProducto { get; set; }
    }
}
