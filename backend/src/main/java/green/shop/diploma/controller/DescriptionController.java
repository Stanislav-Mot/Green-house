package green.shop.diploma.controller;

import green.shop.diploma.model.ProductDescription;
import green.shop.diploma.servise.DescriptionService;
import org.springframework.web.bind.annotation.*;

@RestController
public class DescriptionController {

    private final DescriptionService descriptionService;

    public DescriptionController(DescriptionService descriptionService) {
        this.descriptionService = descriptionService;
    }

    @GetMapping("/product-descriptions/{id}")
    public Iterable<ProductDescription> prodDescriptions(@PathVariable Long id) {
        return descriptionService.getAllDescriptionByProductId(id);
    }

    @PostMapping("/product-descriptions/{id}")
    public ProductDescription add(@RequestBody ProductDescription productDescription, @PathVariable Long id) {
        return descriptionService.add(productDescription, id);
    }

    @DeleteMapping("/product-descriptions/{id}")
    public void delete(@PathVariable Long id) {
        descriptionService.deleteById(id);
    }

    @PutMapping("/product-descriptions/{id}")
    public ProductDescription replaceProductDescription(@RequestBody ProductDescription newProductDescription, @PathVariable Long id) {
        return descriptionService.replaceProductDescription(newProductDescription, id);
    }
}
