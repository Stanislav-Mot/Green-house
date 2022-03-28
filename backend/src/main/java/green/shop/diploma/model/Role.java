package green.shop.diploma.model;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    USER, ADMIN, ROLE_ADMIN, SUPER_ADMIN, ROLE_USER;

    @Override
    public String getAuthority() {
        return name();
    }
}
