package green.shop.diploma.controller;

import green.shop.diploma.model.ProductParam;
import green.shop.diploma.servise.ParameterService;
import org.springframework.web.bind.annotation.*;

@RestController
public class ParameterController {

    private final ParameterService parameterService;

    public ParameterController(ParameterService parameterService) {
        this.parameterService = parameterService;
    }

    @GetMapping("/product-params/{id}")
    public Iterable<ProductParam> prodParams(@PathVariable Long id) {
        return parameterService.getParametersByProductId(id);
    }

    @PutMapping("/product-params/{id}")
    public ProductParam replaceProductDescription(@RequestBody ProductParam newProductParam, @PathVariable Long id) {
        return parameterService.replaceProductDescription(newProductParam, id);
    }
}
