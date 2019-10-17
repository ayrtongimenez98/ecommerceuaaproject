using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace UAAEcommerce.Models
{
    public class ContactModel
    {
        public int Id { get; set; }

        [Required]
        [Display(Name = "Correo electrónico")]
        public string Email { get; set; }

        [Required]
        [Display(Name = "Nombre Completo")]
        public string NombreCompleto { get; set; }

        [Required]
        [Display(Name = "Mensaje")]
        public string Mensaje { get; set; }

        [Required]
        [Display(Name = "Interes")]
        public string Interes { get; set; }
    }
}