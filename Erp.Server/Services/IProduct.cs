﻿using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IProduct
    {
        DbResult createOrUpdateProduct(Product product);
        DbResult deleteProduct(int id);
        
        Product getProduct(int id);
        List<Product> getProducts();
        List<Barcode> getBarcodesOfaProduct(int p_id);
        List<ProdSize> getSizesOfaProduct(int p_id);
        List<ProdColor> getColorsOfaProduct(int p_id);
        List<ProdAttachment> getProdAttachmentsOfaProduct(int p_id);
  
    }

}
