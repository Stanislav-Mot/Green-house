package green.shop.diploma.servise;

import green.shop.diploma.entity.Role;
import green.shop.diploma.entity.User;
import green.shop.diploma.repository.UserRepo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Collections;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {

    final UserRepo userRepo;

    final PasswordEncoder passwordEncoder;

    private final MailSenderService mailSender;

    @Value("${hostname}")
    private String hostname;

    public UserService(PasswordEncoder passwordEncoder, UserRepo userRepo, MailSenderService mailSender) {
        this.passwordEncoder = passwordEncoder;
        this.userRepo = userRepo;
        this.mailSender = mailSender;
    }

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        User user = userRepo.findByEmail(email);
        if (user != null) {
            return user;
        }
        throw new UsernameNotFoundException(
                "User '" + email + "' not found");
    }

    public boolean addUser(User user) {
        if (userRepo.findByEmail(user.getEmail()) != null) {
            return false;
        }

        user.setActive(false);
        user.setRoles(Collections.singleton(Role.ROLE_USER));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setActivationCode(UUID.randomUUID().toString());
        userRepo.save(user);
        sendMessage(user);

        return true;
    }

    public boolean activateUser(String code) {
        User user = userRepo.findByActivationCode(code);

        if (user == null) {
            return false;
        }

        user.setActivationCode(null);
        user.setActive(true);

        userRepo.save(user);

        return true;
    }

    public void sendMessage(User user) {
        if (!StringUtils.isEmpty(user.getEmail())) {
            String message = String.format(
                    "Привет, %s! \n" +
                            "Добро пожаловать на GREEN HOUSE. Переди по ссылаке для активации: http://%s/user/%s/activate",
                    user.getFirst_name(),
                    hostname,
                    user.getActivationCode()
            );
            mailSender.send(user.getEmail(), "Activation code", message);
        }
    }
}
