using Microsoft.EntityFrameworkCore;

namespace PaymentDetailAPI.Models
{
    public class PaymentDeatilContext : DbContext
    {
        public PaymentDeatilContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<PaymentDetail> PaymentDetails { get; set; }
    }
}