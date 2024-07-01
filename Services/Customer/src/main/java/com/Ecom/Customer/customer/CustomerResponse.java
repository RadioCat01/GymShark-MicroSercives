package com.Ecom.Customer.customer;

import com.Ecom.Customer.Address.Address;

public record CustomerResponse(
        String Id,
        String firstname,
        String lastname,
        String email,
        Address address
) {
}
