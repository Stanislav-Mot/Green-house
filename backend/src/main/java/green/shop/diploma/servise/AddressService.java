package green.shop.diploma.servise;

import green.shop.diploma.exception.NotFoundException;
import green.shop.diploma.model.Address;
import green.shop.diploma.repository.AddressRepo;
import org.springframework.stereotype.Service;

@Service
public class AddressService {

    private final AddressRepo addressRepo;

    public AddressService(AddressRepo addressRepo) {
        this.addressRepo = addressRepo;
    }

    public Address getById(Long id) {
        return addressRepo.findById(id)
                .orElseThrow(() -> new NotFoundException(id, "address"));
    }

    public Iterable<Address> getAll() {
        return addressRepo.findAll();
    }

    public Address add(Address address) {
        return addressRepo.save(address);
    }

    public void deleteById(Long id) {
        addressRepo.deleteById(id);
    }

    public Address replaceAddress(Address address, Long id) {
        return addressRepo.findById(id)
                .map(obj -> {
                    obj.setStreet(address.getStreet());
                    obj.setCity(address.getCity());
                    obj.setBuild(address.getBuild());
                    obj.setEntrance(address.getEntrance());
                    obj.setFlat(address.getFlat());

                    return addressRepo.save(obj);
                })
                .orElseGet(() -> {
                    address.setId(id);
                    return addressRepo.save(address);
                });
    }
}
