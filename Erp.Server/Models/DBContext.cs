﻿using Erp.Server.Services;
using Microsoft.EntityFrameworkCore;

namespace Erp.Server.Models
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<DbResult> DbResult { get; set; }
        public DbSet<MenuType> MenuTypes { get; set; }
        public DbSet<PurchaseOrder> PurchaseOrders { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Income> Incomes { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<MasterData> MasterDatas { get; set; }
        public DbSet<MasterType> MasterTypes { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Barcode> Barcodes { get; set; }
        public DbSet<ProdColor> ProdColors { get; set; }
        public DbSet<ProdSize> ProdSizes { get; set; }
        public DbSet<ProdAttachment> ProdAttachments { get; set; }


    }

}
