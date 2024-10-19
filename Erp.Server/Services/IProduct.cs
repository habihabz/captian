using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IProduct
    {
        DbResult createOrUpdateProduct(Product product);
        DbResult deleteProduct(int id);
        Product getProduct(int id);
        List<Product> getProducts();
    }

}
