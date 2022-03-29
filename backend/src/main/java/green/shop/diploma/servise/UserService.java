package green.shop.diploma.servise;

import green.shop.diploma.exception.NotFoundException;
import green.shop.diploma.model.Role;
import green.shop.diploma.model.User;
import green.shop.diploma.model.authentication.AuthenticationRequest;
import green.shop.diploma.model.authentication.AuthenticationResponse;
import green.shop.diploma.repository.UserRepo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtTokenUtil;

    private final MailSenderService mailSender;

    @Value("${custom.hostname}")
    private String hostname;

    public UserService(PasswordEncoder passwordEncoder, UserRepo userRepo, JwtService jwtTokenUtil, MailSenderService mailSender) {
        this.passwordEncoder = passwordEncoder;
        this.userRepo = userRepo;
        this.jwtTokenUtil = jwtTokenUtil;
        this.mailSender = mailSender;
    }

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String email) {
        return userRepo.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User '" + email + "' not found"));
    }

    @Transactional
    public User addUser(User user) {
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            throw new UsernameNotFoundException("User '" + user.getEmail() + "' already exist");
        } else {
            user.setActive(false);
            user.setRoles(Collections.singleton(Role.ROLE_USER));
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setActivationCode(UUID.randomUUID().toString());
            sendMessage(user);
            return user;
        }
    }

    @Transactional
    public String activateUser(String code) {
        User user = userRepo.findByActivationCode(code).orElseThrow(() -> new NotFoundException(0L, code));
        user.setActivationCode(null);
        user.setActive(true);
        return "Пользователь успешно активирован";
    }

    public void sendMessage(User user) {
        if (!StringUtils.hasText(user.getEmail())) {
            String message = String.format(
                    "Привет, %s! \n" +
                            "Добро пожаловать на GREEN HOUSE. Перейди по ссылке для активации: http://%s/user/%s/activate",
                    user.getFirstName(),
                    hostname,
                    user.getActivationCode()
            );
            mailSender.send(user.getEmail(), "Activation code", message);
        }
    }

    public User getById(Long id) {
        return userRepo.findById(id).orElseThrow(() -> new NotFoundException(id, "user"));
    }

    public Iterable<User> getAll() {
        return userRepo.findAll();
    }

    public void deleteById(Long id) {
        userRepo.deleteById(id);
    }

    public User replaceUser(User replaced, Long id) {
        return userRepo.findById(id)
                .map(user -> {
                    user.setFirstName(replaced.getFirstName());
                    user.setLastName(replaced.getLastName());
                    user.setPatronymic(replaced.getPatronymic());
                    user.setPhone(replaced.getPhone());
                    return userRepo.save(user);
                }).orElseGet(() -> {
                    replaced.setId(id);
                    return userRepo.save(replaced);
                });
    }

    @Transactional
    public ResponseEntity<AuthenticationResponse> authentication(AuthenticationRequest authenticationRequest, AuthenticationManager authenticationManager) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>(new AuthenticationResponse(null, null), HttpStatus.UNAUTHORIZED);
        }

        UserDetails userDetails = loadUserByUsername(authenticationRequest.getEmail());
        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return new ResponseEntity<>(new AuthenticationResponse(jwt, userDetails), HttpStatus.OK);
    }
}