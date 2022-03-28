package green.shop.diploma.controller;

import green.shop.diploma.entity.User;
import green.shop.diploma.exception.NotFoundException;
import green.shop.diploma.repository.UserRepo;
import green.shop.diploma.servise.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private final UserRepo repository;

    final UserService userService;

    UserController(UserRepo repository, UserService userService) { this.repository = repository;
        this.userService = userService;
    }

//    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/users/{id}")
    User one(@PathVariable Long id){
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException(id, "user"));
    }

    @GetMapping("/users")
    Iterable<User> all(){
        return repository.findAll();
    }

    @PostMapping("/users")
    User add(@RequestBody User user){
        if (userService.addUser(user)) {
            return user;
        } else {
            return null;
        }
    }

    @GetMapping("/user/{code}/activate")
    public String activate(@PathVariable String code) {
        boolean isActivated = userService.activateUser(code);

        if (isActivated) {
            return "Пользователь успешно активирован";
        } else {
            return "Код активации не найден";
        }
    }

    @DeleteMapping("/users/{id}")
    void delete(@PathVariable Long id){
        repository.deleteById(id);
    }

    @PutMapping("/users/{id}")
    User replaceUser(@RequestBody User newUser, @PathVariable Long id) {

        return repository.findById(id)
                .map(user -> {
                    user.setFirst_name(newUser.getFirst_name());
                    user.setLast_name(newUser.getLast_name());
                    user.setPatronymic(newUser.getPatronymic());
                    user.setPhone(newUser.getPhone());

                    return repository.save(user);
                })
                .orElseGet(() -> {
                    newUser.setId(id);
                    return repository.save(newUser);
                });
    }
}
