package com.Ecom.Customer.customer;

import jakarta.persistence.*;
import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue
    private String Id;
    private String firstname;
    private String lastname;
    private String email;
    @Embedded
    private Address address;
}
