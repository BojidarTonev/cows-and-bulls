using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using CowsAndBullsAPI.Models;
using CowsAndBullsAPI.Services;
using CowsAndBullsAPI.Services.Contracts;
using CowsAndBullsAPI.Repository.Contracts;
using CowsAndBullsAPI.Repository;

namespace CowsAndBullsAPI
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "http://localhost:3000";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddDbContext<CowsAndBullsContext>(opt =>
                opt.UseLazyLoadingProxies()
                .UseSqlServer(Configuration.GetConnectionString("CowsAndBullsDataBase")));
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  builder =>
                                  {
                                      builder.WithOrigins("http://localhost:3000").AllowAnyHeader()
                                                  .AllowAnyMethod(); ;
                                  });
            });
            services.AddScoped(typeof(IRepository<>), typeof(DbRepository<>));
            services.AddTransient<IGameService, GameService>();
            services.AddTransient<IUsersService, UserService>();
            services.AddControllers().AddNewtonsoftJson(opt => opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                using (var serviceScrope = app.ApplicationServices.CreateScope())
                {
                    var context = serviceScrope.ServiceProvider.GetRequiredService<CowsAndBullsContext>();
                    context.Database.Migrate();
                }
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
