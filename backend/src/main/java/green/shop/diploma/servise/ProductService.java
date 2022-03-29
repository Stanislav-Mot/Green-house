package green.shop.diploma.servise;

import green.shop.diploma.exception.NotFoundException;
import green.shop.diploma.model.Product;
import green.shop.diploma.model.ProductParam;
import green.shop.diploma.repository.DescriptionRepo;
import green.shop.diploma.repository.ParameterRepo;
import green.shop.diploma.repository.ProductRepo;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepo productRepo;
    private final DescriptionRepo descriptionRepo;
    private final ParameterRepo parameterRepo;
    private final AmazonService amazonService;

    ProductService(ProductRepo productRepo, DescriptionRepo descriptionRepo, ParameterRepo parameterRepo, AmazonService amazonService) {
        this.productRepo = productRepo;
        this.descriptionRepo = descriptionRepo;
        this.parameterRepo = parameterRepo;
        this.amazonService = amazonService;
    }

    public void deleteProduct(Long id) {
        Product product = productRepo.findById(id).orElseThrow(() -> new NotFoundException(id, "Product"));
        descriptionRepo.findByProduct(product).forEach(description -> descriptionRepo.deleteById(description.getId()));
        productRepo.delete(product);
    }

    public Product getById(Long id) {
        return productRepo.findById(id).orElseThrow(() -> new NotFoundException(id, "Product"));
    }

    public Iterable<Product> getAll() {
        return productRepo.findAll();
    }

    public Product add(Product product) {
        List<ProductParam> productParams = new ArrayList<>();
        productParams.add(new ProductParam("sun"));
        productParams.add(new ProductParam("temperature"));
        productParams.add(new ProductParam("water"));

        parameterRepo.saveAll(productParams);
        product.setProductParams(productParams);
        return productRepo.save(product);
    }

    public Product replaceProduct(Product newProduct, Long id) {
        return productRepo.findById(id)
                .map(product -> {
                    product.setName(newProduct.getName());
                    product.setPicture(newProduct.getPicture());
                    product.setPrice(newProduct.getPrice());
                    product.setSale(newProduct.getSale());
                    product.setCategory(newProduct.getCategory());
                    return productRepo.save(product);
                }).orElseGet(() -> {
                    newProduct.setId(id);
                    return productRepo.save(newProduct);
                });
    }

    public Product replaceProductPic(MultipartFile pic, Long id) {
        return productRepo.findById(id)
                .map(product -> {
                    try {
                        String picUrl = amazonService.putObjectAmazonS3(pic);
                        if (product.getPicture() != null) {
                            amazonService.deleteObjectAmazonS3(product.getPicture());
                        }
                        product.setPicture(picUrl);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    return productRepo.save(product);
                }).orElseThrow(() -> new NotFoundException(id, "Product"));
    }
}
