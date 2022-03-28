package green.shop.diploma.servise;

import green.shop.diploma.exception.NotFoundException;
import green.shop.diploma.model.Product;
import green.shop.diploma.model.ProductParam;
import green.shop.diploma.repository.ParameterRepo;
import green.shop.diploma.repository.ProductRepo;
import org.springframework.stereotype.Service;

@Service
public class ParameterService {

    private final ParameterRepo parameterRepo;
    private final ProductRepo productRepo;

    public ParameterService(ParameterRepo parameterRepo, ProductRepo productRepo) {
        this.parameterRepo = parameterRepo;
        this.productRepo = productRepo;
    }

    public Iterable<ProductParam> getParametersByProductId(Long id) {
        Product product = productRepo.findById(id).orElseThrow(() -> new NotFoundException(id, "Product"));
        return product.getProductParams();
    }

    public ProductParam replaceProductDescription(ProductParam newProductParam, Long id) {
        return parameterRepo.findById(id)
                .map(productParam -> {
                    productParam.setPercent(newProductParam.getPercent());
                    productParam.setText(newProductParam.getText());

                    return parameterRepo.save(productParam);
                })
                .orElseGet(() -> {
                    newProductParam.setId(id);
                    return parameterRepo.save(newProductParam);
                });
    }
}
