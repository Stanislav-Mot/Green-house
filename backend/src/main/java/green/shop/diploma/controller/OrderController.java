package green.shop.diploma.controller;

import green.shop.diploma.model.Order;
import green.shop.diploma.servise.OrderService;
import org.springframework.web.bind.annotation.*;

@RestController
public class OrderController {

    private final OrderService orderService;

    OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/orders/{id}")
    public Order one(@PathVariable Long id) {
        return orderService.getById(id);
    }

    @GetMapping("/orders")
    public Iterable<Order> all() {
        return orderService.getAll();
    }

    @GetMapping("/orders/user/{id}")
    public Iterable<Order> getByUserId(@PathVariable Long id) {
        return orderService.getByUserId(id);
    }

    @PostMapping("/orders")
    public Order add(@RequestBody Order order) {
        return orderService.add(order);
    }

    @DeleteMapping("/orders/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderService.deleteById(id);
    }

    @PutMapping("/orders/{id}")
    public Order replaceOrderStatus(@RequestBody Order order, @PathVariable Long id) {
        return orderService.setOrderStatus(order, id);
    }
}
