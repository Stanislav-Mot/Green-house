package green.shop.diploma.controller;

import green.shop.diploma.model.Product;
import green.shop.diploma.repository.ProductRepo;
import green.shop.diploma.servise.ProductService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class ProductController {

    private final ProductRepo repository;
    private final ProductService productService;

    ProductController(ProductRepo repository, ProductService productService) {
        this.repository = repository;
        this.productService = productService;
    }

    @GetMapping("/products/{id}")
    public Product one(@PathVariable Long id) {
        return productService.getById(id);
    }

    @GetMapping("/products")
    public Iterable<Product> all() {
        return productService.getAll();
    }

    @PostMapping("/products")
    public Product add(@RequestBody Product product) {
        return productService.add(product);
    }

    @DeleteMapping("/products/{id}")
    void delete(@PathVariable Long id) {
        productService.deleteProduct(id);
    }

    @PutMapping("/products/{id}")
    public Product replaceProduct(@RequestBody Product newProduct, @PathVariable Long id) {
        return productService.replaceProduct(newProduct, id);
    }

    @PutMapping("/products/{id}/pic")
    public Product replaceProductPic(@RequestParam("file") MultipartFile pic, @PathVariable Long id) {
        return productService.replaceProductPic(pic, id);
    }

}
