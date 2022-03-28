package green.shop.diploma.servise;

import green.shop.diploma.exception.NotFoundException;
import green.shop.diploma.model.Product;
import green.shop.diploma.model.ProductDescription;
import green.shop.diploma.model.ProductParam;
import green.shop.diploma.repository.DescriptionRepo;
import green.shop.diploma.repository.ParameterRepo;
import green.shop.diploma.repository.ProductRepo;
import green.shop.diploma.util.AmazonS3;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static green.shop.diploma.util.AmazonS3.deleteObjectAmazonS3;

@Service
public class ProductService {

    private final ProductRepo repository;
    private final DescriptionRepo descriptionRepo;
    private final ParameterRepo parameterRepo;

    ProductService(ProductRepo repository, DescriptionRepo descriptionRepo, ParameterRepo parameterRepo) {
        this.repository = repository;
        this.descriptionRepo = descriptionRepo;
        this.parameterRepo = parameterRepo;
    }

    public void deleteProduct(Long id) {
        Product product = repository.findById(id).orElseThrow(() -> new RuntimeException("id not found"));

        Iterable<ProductDescription> productDescriptionList = descriptionRepo.findByProduct(product);

        for (ProductDescription item : productDescriptionList) {
            descriptionRepo.deleteById(item.getId());
        }
        repository.delete(product);
    }

    public Product getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException(id, "product"));
    }

    public Iterable<Product> getAll() {
        return repository.findAll();
    }

    public Product add(Product product) {
        List<ProductParam> productParams = new ArrayList<>();
        productParams.add(new ProductParam("sun"));
        productParams.add(new ProductParam("temperature"));
        productParams.add(new ProductParam("water"));

        parameterRepo.saveAll(productParams);
        product.setProductParams(productParams);
        return repository.save(product);
    }

    public Product replaceProduct(Product newProduct, Long id) {
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

    public Product replaceProductPic(MultipartFile pic, Long id) {
        return repository.findById(id)
                .map(product -> {
                    if (pic != null) {
                        try {
                            String picUrl = AmazonS3.putObjectAmazonS3(pic);
                            if (product.getPicture() != null) {
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
