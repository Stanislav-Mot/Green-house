package green.shop.diploma.controller;

import green.shop.diploma.model.Address;
import green.shop.diploma.servise.AddressService;
import org.springframework.web.bind.annotation.*;

@RestController
public class AddressController {

    private final AddressService addressService;

    AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping("addresses/{id}")
    public Address one(@PathVariable Long id) {
        return addressService.getById(id);
    }

    @GetMapping("/addresses")
    public Iterable<Address> all() {
        return addressService.getAll();
    }

    @PostMapping("/addresses")
    public Address add(@RequestBody Address address) {
        return addressService.add(address);
    }

    @DeleteMapping("/addresses/{id}")
    public void deleteAddress(@PathVariable Long id) {
        addressService.deleteById(id);
    }

    @PutMapping("/addresses/{id}")
    public Address replaceAddress(@RequestBody Address address, @PathVariable Long id) {
        return addressService.replaceAddress(address, id);
    }
}
