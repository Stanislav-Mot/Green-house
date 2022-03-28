package green.shop.diploma.controller;

import green.shop.diploma.entity.Category;
import green.shop.diploma.entity.ProductParam;
import green.shop.diploma.exception.NotFoundException;
import green.shop.diploma.repository.CategoryRepo;
import green.shop.diploma.util.AmazonS3;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static green.shop.diploma.util.AmazonS3.deleteObjectAmazonS3;

@RestController
public class CategoryController {

    private final CategoryRepo repository;

    CategoryController(CategoryRepo repository) {
        this.repository = repository;
    }

    @GetMapping("/categories")
    Iterable<Category> all(){
        return repository.findAll();
    }

    @GetMapping("/categories/{id}")
    Category one(@PathVariable Long id){
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException(id, "category"));
    }

    @PostMapping("/categories")
    Category newCategory(@RequestBody Category newCategory) {
        return repository.save(newCategory);
    }

    @PostMapping("/categories/{id}")
    Category addCategoryPic(@RequestParam("file") MultipartFile pic, @PathVariable Long id) {
        return repository.findById(id)
                .map(category -> {
                    if(pic != null){
                        try {
                            String picUrl = AmazonS3.putObjectAmazonS3(pic);
                            category.setPicture(picUrl);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    return repository.save(category);
                })
                .orElse(null);
    }

    @DeleteMapping("/categories/{id}")
    void deleteCategory(@PathVariable Long id) {

        Category category = repository.findById(id).get();
        if(category.getPicture() != null && !category.getPicture().isEmpty()){
            deleteObjectAmazonS3(category.getPicture());
        }
        repository.deleteById(id);
    }

    @PutMapping("/categories/{id}")
    Category replaceCategoryName(@RequestBody Category newCategory, @PathVariable Long id) {

        return repository.findById(id)
                .map(category -> {
                    category.setName(newCategory.getName());
                    return repository.save(category);
                })
                .orElseGet(() -> {
                    newCategory.setId(id);
                    return repository.save(newCategory);
                });
    }

    @PutMapping("/categories/{id}/pic")
    Category replaceCategoryName(@RequestParam("file") MultipartFile pic, @PathVariable Long id) {

        return repository.findById(id)
                .map(category -> {
                    if(pic != null){
                        try {
                            String picUrl = AmazonS3.putObjectAmazonS3(pic);
                            if(category.getPicture() != null){
                                deleteObjectAmazonS3(category.getPicture());
                            }
                            category.setPicture(picUrl);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    return repository.save(category);
                })
                .orElse(null);
    }
}
