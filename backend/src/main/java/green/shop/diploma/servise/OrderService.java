package green.shop.diploma.servise;

import green.shop.diploma.exception.NotFoundException;
import green.shop.diploma.model.Order;
import green.shop.diploma.repository.OrderRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    private final OrderRepo orderRepo;

    public OrderService(OrderRepo orderRepo) {
        this.orderRepo = orderRepo;
    }

    public Order getById(Long id) {
        return orderRepo.findById(id).orElseThrow(() -> new NotFoundException(id, "order"));
    }

    public Iterable<Order> getAll() {
        return orderRepo.findAll();
    }

    @Transactional
    public Iterable<Order> getByUserId(Long id) {
        return orderRepo.findByUserId(id);
    }

    public Order add(Order order) {
        return orderRepo.save(order);
    }

    public Order setOrderStatus(Order order, Long id) {
        return orderRepo.findById(id).map(obj -> {
            obj.setStatus(order.getStatus());
            return orderRepo.save(obj);
        }).orElseThrow(() -> new NotFoundException(id, "Order"));
    }

    public void deleteById(Long id) {
        orderRepo.deleteById(id);
    }
}
