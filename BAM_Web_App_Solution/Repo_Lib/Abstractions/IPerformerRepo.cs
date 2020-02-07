using System;
using System.Collections.Generic;
using System.Text;

namespace Repo_Lib.Abstractions
{
   
        public interface IPerformerRepo<T>
        {

            IEnumerable<T> GetPerformers();
            void AddPerformers(T performers);
            void ModifyPerformers(T performers);
            void RemovePerformers(string name);

        }
    
}
