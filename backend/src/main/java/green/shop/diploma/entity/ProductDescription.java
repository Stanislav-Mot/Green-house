package green.shop.diploma.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class ProductDescription {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String heading;

    private String text;

    @ManyToOne
    private Product product;
}
