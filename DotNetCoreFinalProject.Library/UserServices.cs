using DotNetCoreFinalProject.Data;
using DotNetCoreFinalProject.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotNetCoreFinalProject.Library
{
    sealed public class UserServices : IUserServices
    {
        private DataContext context;

        public UserServices(DataContext context) => this.context = context;

        public async Task<User> GetUser(int id)
        {
            return await context.Users.FindAsync(id);
        }

        public async Task<ICollection<User>> GetUsers()
        {
            return await context.Users.ToListAsync();
        }

        public async Task<User> CreateUser(User user)
        {
            context.Users.Add(user);
            await context.SaveChangesAsync();

            return user;
        }

        public async Task<User> UpdateUser(User user)
        {
            context.Entry(user).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return user;
        }

        public async Task DeleteUser(User user)
        {
            context.Users.Remove(user);
            await context.SaveChangesAsync();
        }
    }
}
