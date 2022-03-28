package green.shop.diploma.repository;

import green.shop.diploma.entity.Product;
import green.shop.diploma.entity.ProductParam;
import org.springframework.data.repository.CrudRepository;

public interface ProductParamRepo extends CrudRepository<ProductParam, Long> {

    Iterable<ProductParam> findByProduct(Product product);
}
