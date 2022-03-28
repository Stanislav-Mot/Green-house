package green.shop.diploma.repository;

import green.shop.diploma.model.Product;
import green.shop.diploma.model.ProductDescription;
import org.springframework.data.repository.CrudRepository;

public interface DescriptionRepo extends CrudRepository<ProductDescription, Long> {
    Iterable<ProductDescription> findByProduct(Product product);
}
