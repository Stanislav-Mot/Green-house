package green.shop.diploma.exception;

public class NotFoundException extends RuntimeException {

    public NotFoundException(Long id, String message) {
        super("Could not find " + message + " " + id);
    }
}
