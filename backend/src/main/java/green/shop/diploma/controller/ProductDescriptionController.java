package green.shop.diploma.controller;

import green.shop.diploma.entity.Product;
import green.shop.diploma.entity.ProductDescription;
import green.shop.diploma.exception.NotFoundException;
import green.shop.diploma.repository.ProductDescriptionRepo;
import green.shop.diploma.repository.ProductRepo;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProductDescriptionController {

    private final ProductDescriptionRepo repository;

    private final ProductRepo productRepo;

    ProductDescriptionController(ProductDescriptionRepo repository, ProductRepo productRepo) {
        this.repository = repository;
        this.productRepo = productRepo;
    }

    @GetMapping("/product-descriptions/{id}")
    Iterable<ProductDescription> prodDescriptions(@PathVariable Long id){
        Product product = productRepo.findById(id).get();
        return repository.findByProduct(product);
    }

    @PostMapping("/product-descriptions/{id}")
    ProductDescription add(@RequestBody ProductDescription productDescription, @PathVariable Long id){
        Product product =  productRepo.findById(id).get();
        productDescription.setProduct(product);
        return repository.save(productDescription);
    }

    @DeleteMapping("/product-descriptions/{id}")
    void delete(@PathVariable Long id){
        repository.deleteById(id);
    }

    @PutMapping("/product-descriptions/{id}")
    ProductDescription replaceProductDescription(@RequestBody ProductDescription newProductDescription, @PathVariable Long id) {

        return repository.findById(id)
                .map(productDescription -> {
                    productDescription.setHeading(newProductDescription.getHeading());
                    productDescription.setText(newProductDescription.getText());

                    return repository.save(productDescription);
                })
                .orElseGet(() -> {
                    newProductDescription.setId(id);
                    return repository.save(newProductDescription);
                });
    }
}
