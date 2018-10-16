using DotNetCoreFinalProject.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace DotNetCoreFinalProject.Data
{
    sealed public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    }
}
