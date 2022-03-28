package green.shop.diploma.repository;

import green.shop.diploma.model.Cart;
import org.springframework.data.repository.CrudRepository;

public interface CartRepo extends CrudRepository<Cart, Long> {
}
