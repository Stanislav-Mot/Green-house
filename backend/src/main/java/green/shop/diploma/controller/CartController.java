package green.shop.diploma.controller;

import green.shop.diploma.model.Cart;
import green.shop.diploma.model.Product;
import green.shop.diploma.servise.CartService;
import org.springframework.web.bind.annotation.*;

@RestController
public class CartController {

    private final CartService cartService;

    CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/cart")
    public Cart add(@RequestBody Cart cart) {
        return cartService.add(cart);
    }

    @PutMapping("/cart/{id}")
    public void addProduct(@RequestBody Product product, @PathVariable Long id) {
        cartService.addProduct(product, id);
    }
}
