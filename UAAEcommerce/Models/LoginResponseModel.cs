using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UAAEcommerce.Models
{
    public class LoginResponseModel
    {
        public bool Succeeded { get; set; }
        public string Message { get; set; }
        public string Token { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Documento { get; set; }
        public string Ruc { get; set; }
        public string RazonSocial { get; set; }
        public DateTime ExpirationDate { get; set; }
        public List<string> Roles { get; set; } = new List<string>();
        public int UserId { get; set; }
    }
}