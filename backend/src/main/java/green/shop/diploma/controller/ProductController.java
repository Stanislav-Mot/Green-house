package green.shop.diploma.controller;

import green.shop.diploma.entity.Category;
import green.shop.diploma.entity.Product;
import green.shop.diploma.exception.NotFoundException;
import green.shop.diploma.repository.ProductRepo;
import green.shop.diploma.servise.ProductService;
import green.shop.diploma.util.AmazonS3;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static green.shop.diploma.util.AmazonS3.deleteObjectAmazonS3;

@RestController
public class ProductController {

    private final ProductRepo repository;

    private final ProductService productService;

    ProductController(ProductRepo repository, ProductService productService) {
        this.repository = repository;
        this.productService = productService;
    }

    @GetMapping("/products/{id}")
    Product one(@PathVariable Long id){
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException(id, "product"));
    }

    @GetMapping("/products")
    Iterable<Product> all(){
        return repository.findAll();
    }

    @PostMapping("/products")
    Product add(@RequestBody Product new_product){
        Product product = productService.saveProduct(new_product);
        return product;
    }

    @DeleteMapping("/products/{id}")
    void delete(@PathVariable Long id){
        productService.deleteProduct(id);
        return;
    }

    @PutMapping("/products/{id}")
    Product replaceProduct(@RequestBody Product newProduct, @PathVariable Long id) {

        return repository.findById(id)
                .map(product -> {
                    product.setName(newProduct.getName());
                    product.setPicture(newProduct.getPicture());
                    product.setPrice(newProduct.getPrice());
                    product.setSale(newProduct.getSale());
                    product.setCategory(newProduct.getCategory());

                    return repository.save(product);
                })
                .orElseGet(() -> {
                    newProduct.setId(id);
                    return repository.save(newProduct);
                });
    }

    @PutMapping("/products/{id}/pic")
    Product replaceProductPic(@RequestParam("file") MultipartFile pic, @PathVariable Long id) {
        return repository.findById(id)
                .map(product -> {
                    if(pic != null){
                        try {
                            String picUrl = AmazonS3.putObjectAmazonS3(pic);
                            if(product.getPicture() != null){
                                deleteObjectAmazonS3(product.getPicture());
                            }
                            product.setPicture(picUrl);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    return repository.save(product);
                })
                .orElse(null);
    }

}
