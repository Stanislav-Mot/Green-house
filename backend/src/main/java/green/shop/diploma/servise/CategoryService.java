package green.shop.diploma.servise;

import green.shop.diploma.exception.NotFoundException;
import green.shop.diploma.model.Category;
import green.shop.diploma.repository.CategoryRepo;
import green.shop.diploma.util.AmazonS3;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static green.shop.diploma.util.AmazonS3.deleteObjectAmazonS3;

@Service
public class CategoryService {

    private final CategoryRepo categoryRepo;

    public CategoryService(CategoryRepo categoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    public Iterable<Category> getAll() {
        return categoryRepo.findAll();
    }

    public Category getById(Long id) {
        return categoryRepo.findById(id)
                .orElseThrow(() -> new NotFoundException(id, "category"));
    }

    public Category add(Category category) {
        return categoryRepo.save(category);
    }

    public Category addCategoryPic(MultipartFile pic, Long id) {
        return categoryRepo.findById(id)
                .map(category -> {
                    if (pic != null) {
                        try {
                            String picUrl = AmazonS3.putObjectAmazonS3(pic);
                            category.setPicture(picUrl);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    return categoryRepo.save(category);
                }).orElseThrow(() -> new RuntimeException("Not added"));
    }

    public void deleteById(Long id) {
        Category category = categoryRepo.findById(id).orElseThrow(() -> new RuntimeException("category not found"));
        if (category.getPicture() != null && !category.getPicture().isEmpty()) {
            deleteObjectAmazonS3(category.getPicture());
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
                    if (pic != null) {
                        try {
                            String picUrl = AmazonS3.putObjectAmazonS3(pic);
                            if (category.getPicture() != null) {
                                deleteObjectAmazonS3(category.getPicture());
                            }
                            category.setPicture(picUrl);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    return categoryRepo.save(category);
                })
                .orElse(null);
    }
}
