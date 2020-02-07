using System;
using System.Collections.Generic;
using System.Text;

namespace Repo_Lib.Abstractions
{
   public interface IClientRepo<T>
    {
        IEnumerable<T> GetClients();
        void AddClients(T clients);
        void ModifyClients(T clients);
        void RemoveClients(string name);
    }
}
