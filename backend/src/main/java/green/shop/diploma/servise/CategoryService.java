package green.shop.diploma.servise;

import green.shop.diploma.exception.NotFoundException;
import green.shop.diploma.model.Category;
import green.shop.diploma.repository.CategoryRepo;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class CategoryService {

    private final CategoryRepo categoryRepo;
    private final AmazonService amazonService;

    public CategoryService(CategoryRepo categoryRepo, AmazonService amazonService) {
        this.categoryRepo = categoryRepo;
        this.amazonService = amazonService;
    }

    public Iterable<Category> getAll() {
        return categoryRepo.findAll();
    }

    public Category getById(Long id) {
        return categoryRepo.findById(id).orElseThrow(() -> new NotFoundException(id, "category"));
    }

    public Category add(Category category) {
        return categoryRepo.save(category);
    }

    public Category addCategoryPic(MultipartFile pic, Long id) {
        return categoryRepo.findById(id)
                .map(category -> {
                    try {
                        String picUrl = amazonService.putObjectAmazonS3(pic);
                        category.setPicture(picUrl);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    return categoryRepo.save(category);
                }).orElseThrow(() -> new RuntimeException("Not added"));
    }

    public void deleteById(Long id) {
        Category category = categoryRepo.findById(id).orElseThrow(() -> new NotFoundException(id, "Category"));
        if (category.getPicture() != null && !category.getPicture().isEmpty()) {
            amazonService.deleteObjectAmazonS3(category.getPicture());
        }
        categoryRepo.deleteById(id);
    }

    public Category replaceCategoryName(Category category, Long id) {
        return categoryRepo.findById(id)
                .map(obj -> {
                    obj.setName(category.getName());
                    return categoryRepo.save(obj);
                })
                .orElseGet(() -> {
                    category.setId(id);
                    return categoryRepo.save(category);
                });
    }

    public Category replaceCategoryPic(MultipartFile pic, Long id) {
        return categoryRepo.findById(id)
                .map(category -> {
                    try {
                        String picUrl = amazonService.putObjectAmazonS3(pic);
                        if (category.getPicture() != null) {
                            amazonService.deleteObjectAmazonS3(category.getPicture());
                        }
                        category.setPicture(picUrl);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    return categoryRepo.save(category);
                }).orElseThrow(() -> new NotFoundException(id, "Category"));
    }
}
