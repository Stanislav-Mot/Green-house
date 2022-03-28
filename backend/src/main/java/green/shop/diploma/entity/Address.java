package green.shop.diploma.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String city;
    private String street;
    private short build;
    private short entrance;
    private short flat;

    @ManyToOne
    private User user;
}
