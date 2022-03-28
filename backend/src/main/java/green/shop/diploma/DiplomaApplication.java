package green.shop.diploma;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationTrustResolver;
import org.springframework.security.core.Authentication;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class DiplomaApplication {

	public static void main(String[] args) {
		SpringApplication.run(DiplomaApplication.class, args);
	}

	@Bean
	public AuthenticationTrustResolver trustResolver() {
		return new AuthenticationTrustResolver() {

			@Override
			public boolean isRememberMe(final Authentication authentication) {
				return false;
			}

			@Override
			public boolean isAnonymous(final Authentication authentication) {
				return false;
			}
		};
	}
}
