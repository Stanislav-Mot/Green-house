package green.shop.diploma.controller;

import green.shop.diploma.entity.Address;
import green.shop.diploma.exception.NotFoundException;
import green.shop.diploma.repository.AddressRepo;
import org.springframework.web.bind.annotation.*;

@RestController
public class AddressController {

    private final AddressRepo repository;

    AddressController(AddressRepo repository) { this.repository = repository; }

    @GetMapping("addresses/{id}")
    Address one(@PathVariable Long id){
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException(id, "address"));
    }

    @GetMapping("/addresses")
    Iterable<Address> all(){
        return repository.findAll();
    }

    @PostMapping("/addresses")
    Address newAddress(@RequestBody Address newAddress) {
        return repository.save(newAddress);
    }

    @DeleteMapping("/addresses/{id}")
    void deleteAddress(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @PutMapping("/addresses/{id}")
    Address replaceAddress(@RequestBody Address newAddress, @PathVariable Long id) {

        return repository.findById(id)
                .map(address -> {
                    address.setStreet(newAddress.getStreet());
                    address.setCity(newAddress.getCity());
                    address.setBuild(newAddress.getBuild());
                    address.setEntrance(newAddress.getEntrance());
                    address.setFlat(newAddress.getFlat());

                    return repository.save(address);
                })
                .orElseGet(() -> {
                    newAddress.setId(id);
                    return repository.save(newAddress);
                });
    }
}
