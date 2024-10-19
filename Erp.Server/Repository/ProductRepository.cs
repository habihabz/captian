using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;


namespace Erp.Server.Repository
{
    public class ProductRepository : IProduct
    {
        private DBContext db;

        public ProductRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateProduct(Product product)
        {
            // Set parameters for stored procedure
            var p_id = new SqlParameter("p_id", product.p_id);
            var p_name = new SqlParameter("p_name", product.p_name ?? (object)DBNull.Value);
            var p_short_name = new SqlParameter("p_short_name", product.p_short_name ?? (object)DBNull.Value);
            var p_description = new SqlParameter("p_description", product.p_description ?? (object)DBNull.Value);
            var p_category = new SqlParameter("p_category", product.p_category);
            var p_sub_category = new SqlParameter("p_sub_category", product.p_sub_category);
            var p_division = new SqlParameter("p_division", product.p_division);
            var p_sub_division = new SqlParameter("p_sub_division", product.p_sub_division);
            var p_active_yn = new SqlParameter("p_active_yn", product.p_active_yn ?? (object)DBNull.Value);
            var p_cre_by = new SqlParameter("p_cre_by", product.p_cre_by ?? (object)DBNull.Value);

            // Call stored procedure and return result
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateProduct @p_id, @p_name, @p_short_name, @p_description, @p_category, @p_sub_category, @p_division,@p_sub_division, @p_active_yn, @p_cre_by;",
                p_id, p_name, p_short_name, p_description, p_category, p_sub_category, p_division, p_sub_division, p_active_yn, p_cre_by)
                .ToList()
                .FirstOrDefault() ?? new DbResult();

            return dbresult;
        }

        public DbResult deleteProduct(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteProduct @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public Product getProduct(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var product = db.Set<Product>().FromSqlRaw("EXEC dbo.getProduct @id;", _id).ToList().FirstOrDefault() ?? new Product();
            return product;
        }

        public List<Product> getProducts()
        {
            var products = db.Set<Product>().FromSqlRaw("EXEC dbo.getProducts;").ToList();
            return products;
        }
    }


}
