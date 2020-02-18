
namespace DB_Data.Models
{
    public partial class Tags
    {
        public int TagId { get; set; }
        public string Tag { get; set; }
        public string GroupName { get; set; }

        public virtual Performers GroupNameNavigation { get; set; }
    }
}
