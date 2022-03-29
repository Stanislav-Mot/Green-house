package green.shop.diploma.repository;

import green.shop.diploma.model.ProductParam;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParameterRepo extends CrudRepository<ProductParam, Long> {
}
