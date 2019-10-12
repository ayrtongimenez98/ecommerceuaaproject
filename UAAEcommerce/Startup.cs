using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(UAAEcommerce.Startup))]
namespace UAAEcommerce
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
