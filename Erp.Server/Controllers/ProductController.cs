using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ILogger<ProductController> logger;
        private readonly IUser iuser;
        private readonly IProduct iproduct;

        public ProductController(ILogger<ProductController> _logger,IUser _iuser,IProduct _iproduct)
        {
            logger = _logger;
            iuser = _iuser;
            iproduct = _iproduct;

        }
        [HttpPost("getProducts")]
        [Authorize]
        public IEnumerable<Product> getProducts()
        {
            IEnumerable<Product> products =Enumerable.Empty<Product>();
            products = iproduct.getProducts();
            return products;
        }
        [HttpPost("deleteProduct")]
        [Authorize]
        public DbResult deleteProduct([FromBody] int id)
        {
            DbResult dbResult=new DbResult();
            dbResult = iproduct.deleteProduct(id);
            return dbResult;
        }

        [HttpPost("getProduct")]
        [Authorize]
        public Product getProduct([FromBody] int id)
        {
            Product product = new Product();
            product = iproduct.getProduct(id);
            return product;
        }
        [HttpPost("createOrUpdateProduct")]
        [Authorize]
        public DbResult createOrUpdateProduct([FromBody] Product product)
        {
            DbResult dbResult = new DbResult();
            dbResult = iproduct.createOrUpdateProduct(product);
            return dbResult;
        }


    }
}
