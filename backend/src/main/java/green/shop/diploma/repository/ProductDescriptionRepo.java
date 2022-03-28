package green.shop.diploma.repository;

import green.shop.diploma.entity.Product;
import green.shop.diploma.entity.ProductDescription;
import org.springframework.data.repository.CrudRepository;

public interface ProductDescriptionRepo extends CrudRepository<ProductDescription,Long> {

    Iterable<ProductDescription> findByProduct(Product product);
}
