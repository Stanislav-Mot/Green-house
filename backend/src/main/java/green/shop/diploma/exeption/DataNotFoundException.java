package green.shop.diploma.exeption;

import javax.persistence.EntityNotFoundException;

public class DataNotFoundException extends EntityNotFoundException {
    public DataNotFoundException(String message) {
        super(message);
    }
}