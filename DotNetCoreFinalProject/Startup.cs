using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using DotNetCoreFinalProject.Data;
using Microsoft.AspNetCore.Mvc;
using DotNetCoreFinalProject.Library;
using Microsoft.Extensions.Configuration;

namespace DotNetCoreFinalProject.API
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940

        public Startup(IConfiguration configuration) => this.Configuration = configuration;

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // Demonstrating the use of CORS since we are being consumed by an angular application on a different port (or domain).
            services.AddCors();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // Demonstrating the use of services using IoC.
            services.AddScoped<IUserServices, UserServices>();  
            services.AddScoped<ISecurityServices, SecurityServices>();

            // Demonstrating the use of EF and the ease of using configuration data.
            services.AddDbContext<DataContext>(options => options.UseSqlServer(this.Configuration.GetConnectionString("DefaultConnection")));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(builder =>
                        builder.AllowAnyOrigin().
                        AllowAnyMethod().
                        AllowAnyHeader());

            app.UseMvc();
        }
    }
}
