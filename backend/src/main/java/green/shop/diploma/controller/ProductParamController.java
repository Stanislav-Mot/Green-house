package green.shop.diploma.controller;

import green.shop.diploma.entity.Product;
import green.shop.diploma.entity.ProductParam;
import green.shop.diploma.repository.ProductParamRepo;
import green.shop.diploma.repository.ProductRepo;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProductParamController {

    private final ProductParamRepo repository;

    private final ProductRepo productRepo;

    ProductParamController(ProductParamRepo repository,
                           ProductRepo productRepo) {
        this.repository = repository;
        this.productRepo = productRepo;
    }

    @GetMapping("/product-params/{id}")
    Iterable<ProductParam> prodParams(@PathVariable Long id){
        Product product = productRepo.findById(id).get();
        return product.getProductParams();
    }

    @PutMapping("/product-params/{id}")
    ProductParam replaceProductDescription(@RequestBody ProductParam newProductParam, @PathVariable Long id) {

        return repository.findById(id)
                .map(productParam -> {
                    productParam.setPercent(newProductParam.getPercent());
                    productParam.setText(newProductParam.getText());

                    return repository.save(productParam);
                })
                .orElseGet(() -> {
                    newProductParam.setId(id);
                    return repository.save(newProductParam);
                });
    }
}
