package green.shop.diploma.repository;

import green.shop.diploma.model.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepo extends CrudRepository<Category, Long> {
}
