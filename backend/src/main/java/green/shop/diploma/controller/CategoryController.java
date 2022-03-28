package green.shop.diploma.controller;

import green.shop.diploma.model.Category;
import green.shop.diploma.servise.CategoryService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class CategoryController {

    private final CategoryService categoryService;

    CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/categories")
    public Iterable<Category> all() {
        return categoryService.getAll();
    }

    @GetMapping("/categories/{id}")
    public Category one(@PathVariable Long id) {
        return categoryService.getById(id);
    }

    @PostMapping("/categories")
    public Category newCategory(@RequestBody Category category) {
        return categoryService.add(category);
    }

    @PostMapping("/categories/{id}")
    public Category addCategoryPic(@RequestParam("file") MultipartFile pic, @PathVariable Long id) {
        return categoryService.addCategoryPic(pic, id);
    }

    @DeleteMapping("/categories/{id}")
    public void deleteCategory(@PathVariable Long id) {
        categoryService.deleteById(id);
    }

    @PutMapping("/categories/{id}")
    public Category replaceCategoryName(@RequestBody Category category, @PathVariable Long id) {
        return categoryService.replaceCategoryName(category, id);
    }

    @PutMapping("/categories/{id}/pic")
    public Category replaceCategoryPic(@RequestParam("file") MultipartFile pic, @PathVariable Long id) {
        return categoryService.replaceCategoryPic(pic, id);
    }
}
