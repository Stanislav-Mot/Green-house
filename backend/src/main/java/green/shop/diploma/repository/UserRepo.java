package green.shop.diploma.repository;

import green.shop.diploma.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,Long> {

    User findByEmail(String email);

    User findByActivationCode(String activationCode);


}
