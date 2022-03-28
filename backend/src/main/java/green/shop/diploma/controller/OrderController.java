package green.shop.diploma.controller;

import green.shop.diploma.entity.Order;
import green.shop.diploma.entity.User;
import green.shop.diploma.exception.NotFoundException;
import green.shop.diploma.repository.OrderRepo;
import green.shop.diploma.repository.UserRepo;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class OrderController {

    private final OrderRepo repository;

    private final UserRepo userRepo;

    OrderController(OrderRepo repository, UserRepo userRepo) {
        this.repository = repository;
        this.userRepo = userRepo;
    }

    @GetMapping("/orders/{id}")
    Order one(@PathVariable Long id){
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException(id, "order"));
    }

    @GetMapping("/orders")
    Iterable<Order> all(){
        return repository.findAll();
    }

    @GetMapping("/orders/user/{id}")
    Iterable<Order> byUser(@PathVariable Long id){
        Optional<User> user = userRepo.findById(id);
//        if(user.isEmpty()){
//            return null;
//        }else {
//            return repository.findByUser(
//                    user.get()
//            );
//        }
        return null;
    }

    @PostMapping("/orders")
    Order newCategory(@RequestBody Order newOrder) {
        return repository.save(newOrder);
    }

    @DeleteMapping("/orders/{id}")
    void deleteCategory(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @PutMapping("/orders/{id}")
    Optional<Order> replaceCategory(@RequestBody Order newOrder, @PathVariable Long id) {

        return repository.findById(id)
                .map(order -> {
                    order.setStatus(newOrder.getStatus());
                    return repository.save(order);
                });
    }
}
