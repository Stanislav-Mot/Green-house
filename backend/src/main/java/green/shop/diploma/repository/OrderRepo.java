package green.shop.diploma.repository;

import green.shop.diploma.model.Order;
import org.springframework.data.repository.CrudRepository;

public interface OrderRepo extends CrudRepository<Order, Long> {
    Iterable<Order> findByUserId(Long id);
}
