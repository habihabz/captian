﻿using Erp.Server.Models;
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
            var p_barcodes = new SqlParameter("p_barcodes", product.p_barcodes ?? (object)DBNull.Value);
            var p_colors = new SqlParameter("p_colors", product.p_colors ?? (object)DBNull.Value);
            var p_sizes = new SqlParameter("p_sizes", product.p_sizes ?? (object)DBNull.Value);
            var p_attachements = new SqlParameter("p_attachements", product.p_attachements ?? (object)DBNull.Value);

            // Call stored procedure with additional parameters
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateProduct @p_id, @p_name, @p_short_name, @p_description, @p_category, " +
                "@p_sub_category, @p_division, @p_sub_division, @p_active_yn, @p_cre_by, @p_barcodes, @p_colors, @p_sizes, @p_attachements;",
                p_id, p_name, p_short_name, p_description, p_category, p_sub_category, p_division, p_sub_division, p_active_yn, p_cre_by,
                p_barcodes, p_colors, p_sizes, p_attachements)
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

        public List<Barcode> getBarcodesOfaProduct(int p_id)
        {
            var _p_id = new SqlParameter("p_id", p_id + "");
            var barcodes = db.Set<Barcode>().FromSqlRaw("EXEC dbo.getBarcodesOfaProduct @p_id;", _p_id).ToList();
            return barcodes;
        }

        public List<ProdColor> getColorsOfaProduct(int p_id)
        {
            var _p_id = new SqlParameter("p_id", p_id + "");
            var prodColors = db.Set<ProdColor>().FromSqlRaw("EXEC dbo.getColorsOfaProduct @p_id;", _p_id).ToList();
            return prodColors;
        }

        public List<ProdAttachment> getProdAttachmentsOfaProduct(int p_id)
        {
            var _p_id = new SqlParameter("p_id", p_id + "");
            var prodAttachments = db.Set<ProdAttachment>().FromSqlRaw("EXEC dbo.getProdAttachmentsOfaProduct @p_id;", _p_id).ToList();
            return prodAttachments;
        }

        public List<ProdSize> getSizesOfaProduct(int p_id)
        {
            var _p_id = new SqlParameter("p_id", p_id + "");
            var prodSizes = db.Set<ProdSize>().FromSqlRaw("EXEC dbo.getSizesOfaProduct @p_id;", _p_id).ToList();
            return prodSizes;
        }
     
    }

}
