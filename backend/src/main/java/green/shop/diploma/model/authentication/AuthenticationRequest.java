package green.shop.diploma.model.authentication;

import lombok.Data;

import java.io.Serializable;

@Data
public class AuthenticationRequest implements Serializable {
    private String email;
    private String password;
}