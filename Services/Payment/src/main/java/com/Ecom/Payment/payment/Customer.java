package com.Ecom.Payment.payment;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import org.springframework.validation.annotation.Validated;

@Validated
public record Customer(

        @NotNull(message = "id is required")
        String id,
        @NotNull(message = "firstname is required")
        String firstName,
        @NotNull(message = "lastname is required")
        String lastName,
        @NotNull(message = "email is required")
        @Email(message = "email invalid")
        String email
) {
}
