package green.shop.diploma.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "custom")
@Data
public class AppProperties {
    private String version;
    private String description;
    private String url;
    private String email;
    private String author;
    private String hostname;
    private String mailDebug;
    private String secretKey;
}