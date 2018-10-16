using DotNetCoreFinalProject.Data.Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DotNetCoreFinalProject.Library
{
    public interface IUserServices
    {
        Task<User> GetUser(int id);
        Task<ICollection<User>> GetUsers();
        Task<User> CreateUser(User user);
        Task<User> UpdateUser(User user);
        Task DeleteUser(User user);
        
    }
}
