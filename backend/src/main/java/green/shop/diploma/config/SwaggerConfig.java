package green.shop.diploma.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Value("${custom.email}")
    private String email;
    @Value("${custom.url}")
    private String url;
    @Value("${custom.author}")
    private String author;

    @Bean
    public OpenAPI customOpenApi(@Value("${custom.description}") String appDescription,
                                 @Value("${custom.version}") String appVersion) {
        return new OpenAPI()
                .components(
                        new Components().addSecuritySchemes("bearerAuth",
                                new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT"))
                )
                .info(new Info().title("Application API")
                        .version(appVersion)
                        .description(appDescription)
                        .title("Task Tracker")
                        .license(new License().name("Apache 3.0")
                                .url("https://springdoc.org"))
                        .contact(
                                new Contact()
                                        .email(email)
                                        .url(url)
                                        .name(author)));
    }
}