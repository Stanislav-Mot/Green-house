package green.shop.diploma.servise;

import green.shop.diploma.exception.NotFoundException;
import green.shop.diploma.model.Product;
import green.shop.diploma.model.ProductDescription;
import green.shop.diploma.repository.DescriptionRepo;
import green.shop.diploma.repository.ProductRepo;
import org.springframework.stereotype.Service;

@Service
public class DescriptionService {

    private final DescriptionRepo descriptionRepo;
    private final ProductRepo productRepo;

    public DescriptionService(DescriptionRepo descriptionRepo, ProductRepo productRepo) {
        this.descriptionRepo = descriptionRepo;
        this.productRepo = productRepo;
    }


    public Iterable<ProductDescription> getAllDescriptionByProductId(Long id) {
        Product product = productRepo.findById(id).orElseThrow(() -> new NotFoundException(id, "Product"));
        return descriptionRepo.findByProduct(product);
    }

    public void deleteById(Long id) {
        descriptionRepo.deleteById(id);
    }

    public ProductDescription add(ProductDescription productDescription, Long id) {
        Product product = productRepo.findById(id).orElseThrow(() -> new NotFoundException(id, "Product"));
        productDescription.setProduct(product);
        return descriptionRepo.save(productDescription);
    }

    public ProductDescription replaceProductDescription(ProductDescription newProductDescription, Long id) {
        return descriptionRepo.findById(id)
                .map(productDescription -> {
                    productDescription.setHeading(newProductDescription.getHeading());
                    productDescription.setText(newProductDescription.getText());
                    return descriptionRepo.save(productDescription);
                })
                .orElseGet(() -> {
                    newProductDescription.setId(id);
                    return descriptionRepo.save(newProductDescription);
                });
    }
}
