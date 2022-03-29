package green.shop.diploma.servise;

import green.shop.diploma.exception.NotFoundException;
import green.shop.diploma.model.Cart;
import green.shop.diploma.model.Product;
import green.shop.diploma.repository.CartRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    private final CartRepo cartRepo;

    public CartService(CartRepo cartRepo) {
        this.cartRepo = cartRepo;
    }

    public Cart add(Cart cart) {
        return cartRepo.save(cart);
    }

    public void addProduct(Product product, Long id) {
        Cart cart = cartRepo.findById(id).orElseThrow(() -> new NotFoundException(id, "Product"));
        List<Product> products = cart.getProducts();
        products.add(product);
        cart.setProducts(products);
        cartRepo.save(cart);
    }
}
