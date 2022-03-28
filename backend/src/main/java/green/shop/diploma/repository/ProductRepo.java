package green.shop.diploma.repository;

import green.shop.diploma.entity.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepo extends CrudRepository<Product, Long> {
}
