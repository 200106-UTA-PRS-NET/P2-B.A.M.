using System;
using System.Collections.Generic;
using System.Text;

namespace Repo_Lib.Abstractions
{
    public interface ITagRepo<T>
    {
        IEnumerable<T> GetTags();
        void AddTags(T tags);
        void ModifyTags(T tags);
        void RemoveTags(int id);
    }
}
