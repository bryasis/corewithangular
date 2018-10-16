using DotNetCoreFinalProject.Data;
using DotNetCoreFinalProject.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotNetCoreFinalProject.Library
{
    sealed public class SecurityServices : ISecurityServices
    {
        private DataContext context;
        public SecurityServices(DataContext context) => this.context = context;
        public async Task<User> Authenticate(User user)
        {
            return await this.context.Users.Where(x => x.UserName == user.UserName && x.Password == user.Password).FirstOrDefaultAsync();
        }
    }
}
