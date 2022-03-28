package green.shop.diploma.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "order_s")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Date placedAt;

    private String status;

    @ManyToOne
    private Address address;

    @ManyToOne
    private User user;

    @ManyToMany
    private List<Product> products;

    @PrePersist
    void placedAt() {
        this.placedAt = new Date();
    }
}
