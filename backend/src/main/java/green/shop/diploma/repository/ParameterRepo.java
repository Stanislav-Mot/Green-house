package green.shop.diploma.repository;

import green.shop.diploma.model.ProductParam;
import org.springframework.data.repository.CrudRepository;

public interface ParameterRepo extends CrudRepository<ProductParam, Long> {
}
