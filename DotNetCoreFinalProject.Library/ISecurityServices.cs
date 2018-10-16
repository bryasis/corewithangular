using DotNetCoreFinalProject.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DotNetCoreFinalProject.Library
{
    public interface ISecurityServices
    {
        Task<User> Authenticate(User user);
    }
}
