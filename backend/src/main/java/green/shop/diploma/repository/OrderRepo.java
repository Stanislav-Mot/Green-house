package green.shop.diploma.repository;

import green.shop.diploma.entity.Order;
import green.shop.diploma.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderRepo extends CrudRepository<Order,Long> {
    List<Order> findByUser(User user);
}
