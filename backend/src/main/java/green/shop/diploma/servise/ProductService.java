package green.shop.diploma.servise;

import green.shop.diploma.entity.Product;
import green.shop.diploma.entity.ProductDescription;
import green.shop.diploma.entity.ProductParam;
import green.shop.diploma.repository.ProductDescriptionRepo;
import green.shop.diploma.repository.ProductParamRepo;
import green.shop.diploma.repository.ProductRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepo repository;
    private final ProductDescriptionRepo productDescriptionRepo;
    private final ProductParamRepo productParamRepo;

    ProductService(ProductRepo repository, ProductDescriptionRepo productDescriptionRepo, ProductParamRepo productParamRepo) {
        this.repository = repository;
        this.productDescriptionRepo = productDescriptionRepo;
        this.productParamRepo = productParamRepo;
    }

    public Product saveProduct(Product new_product) {
        List<ProductParam> productParams = new ArrayList<>();

        productParams.add(new ProductParam("sun"));
        productParams.add(new ProductParam("temperature"));
        productParams.add(new ProductParam("water"));

        for (ProductParam item : productParams) {
            productParamRepo.save(item);
        }

        new_product.setProductParams(productParams);

        Product product = repository.save(new_product);
        return product;
    }

    public void deleteProduct(Long id) {

        Product product = repository.findById(id).get();

        Iterable<ProductDescription> productDescriptionList = productDescriptionRepo.findByProduct(product);

        for (ProductDescription item: productDescriptionList) {
            productDescriptionRepo.deleteById(item.getId());
        }

        repository.delete(product);

    }
}
