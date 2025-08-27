using System;
using Microsoft.EntityFrameworkCore;

namespace Project.Function
{
    public class ProjectContext : DbContext
    {
        public ProjectContext()
        {
        }

        public ProjectContext(DbContextOptions<ProjectContext> options)
            : base(options)
        { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.EnableSensitiveDataLogging();

            var connectionString = "Server=tcp:tablebooking-mssqlserver-dev.database.windows.net,1433;Initial Catalog=tablebooking-sql-db-dev;Persist Security Info=False;User ID=missadministrator;Password=thisIsKat11;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
            
            //Environment.GetEnvironmentVariable("ConnectionString");

            optionsBuilder.UseSqlServer(connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);
            
            base.OnModelCreating(modelBuilder);
        }

    }
}