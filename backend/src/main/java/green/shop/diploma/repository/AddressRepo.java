package green.shop.diploma.repository;

import green.shop.diploma.model.Address;
import org.springframework.data.repository.CrudRepository;

public interface AddressRepo extends CrudRepository<Address, Long> {
}
