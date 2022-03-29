package green.shop.diploma.controller;

import green.shop.diploma.model.Category;
import green.shop.diploma.servise.CategoryService;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@RestController
public class CategoryController {

    private final CategoryService categoryService;

    CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
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

    @PostMapping(value = "/categories/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Category addCategoryPic(@RequestPart("file") @RequestParam("file") MultipartFile pic, @PathVariable Long id) {
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
    public Category replaceCategoryPic(@Valid @NotNull @RequestParam("file") MultipartFile pic, @PathVariable Long id) {
        return categoryService.replaceCategoryPic(pic, id);
    }
}
