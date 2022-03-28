package green.shop.diploma.servise;

import green.shop.diploma.exception.NotFoundException;
import green.shop.diploma.model.Order;
import green.shop.diploma.model.User;
import green.shop.diploma.repository.OrderRepo;
import green.shop.diploma.repository.UserRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepo orderRepo;
    private final UserRepo userRepo;

    public OrderService(OrderRepo orderRepo, UserRepo userRepo) {
        this.orderRepo = orderRepo;
        this.userRepo = userRepo;
    }

    public Order getById(Long id) {
        return orderRepo.findById(id)
                .orElseThrow(() -> new NotFoundException(id, "order"));

    }

    public Iterable<Order> getAll() {
        return orderRepo.findAll();
    }

    @Transactional
    public Iterable<Order> getByUserId(Long id) {
        User user = userRepo.findById(id).orElseThrow(() -> new NotFoundException(id, "user"));
        return orderRepo.findByUserId(user.getId());
    }

    public Order add(Order order) {
        return orderRepo.save(order);
    }

    public Optional<Order> setOrderStatus(Order order, Long id) {
        return orderRepo.findById(id).map(obj -> {
            obj.setStatus(order.getStatus());
            return orderRepo.save(obj);
        });
    }

    public void deleteById(Long id) {
        orderRepo.deleteById(id);
    }
}
