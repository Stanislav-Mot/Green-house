package green.shop.diploma.controller;

import green.shop.diploma.entity.Cart;
import green.shop.diploma.entity.Product;
import green.shop.diploma.repository.CartRepo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CartController {

    private final CartRepo repository;

    CartController(CartRepo repository) {
        this.repository = repository;
    }

    @PostMapping("/cart")
    Cart add(@RequestBody Cart cart){
        return repository.save(cart);
    }

    @PutMapping("/cart/{id}")
    void addProduct(@RequestBody Product product, @PathVariable Long id){
        Cart cart = repository.findById(id).get();
        List<Product> products = cart.getProducts();
        products.add(product);
        cart.setProducts(products);
        repository.save(cart);

    }

}
