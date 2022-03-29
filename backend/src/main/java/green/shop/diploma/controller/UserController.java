package green.shop.diploma.controller;

import green.shop.diploma.model.User;
import green.shop.diploma.model.authentication.AuthenticationRequest;
import green.shop.diploma.model.authentication.AuthenticationResponse;
import green.shop.diploma.servise.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    UserController(UserService userService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @GetMapping("/users/{id}")
    public User one(@PathVariable Long id) {
        return userService.getById(id);
    }

    @GetMapping("/users")
    public Iterable<User> all() {
        return userService.getAll();
    }

    @PostMapping("/users")
    public User add(@RequestBody User user) {
        return userService.addUser(user);
    }

    @GetMapping("/user/{code}/activate")
    public String activate(@PathVariable String code) {
        return userService.activateUser(code);
    }

    @DeleteMapping("/users/{id}")
    public void delete(@PathVariable Long id) {
        userService.deleteById(id);
    }

    @PutMapping("/users/{id}")
    public User replaceUser(@RequestBody User user, @PathVariable Long id) {
        return userService.replaceUser(user, id);
    }

    @PostMapping(value = "/authenticate")
    public ResponseEntity<AuthenticationResponse> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        return userService.authentication(authenticationRequest, authenticationManager);
    }
}
