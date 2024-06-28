package com.Ecom.Order.order;

import com.Ecom.Order.product.PurchaseRequest;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.util.List;

public record OrderRequest(
        Integer id,
        String reference,

        @Positive(message = "Order amount should be positive")
        BigDecimal amount,

        @NotNull(message = "Select one")
        PaymentMethod paymentMethod,

        @NotBlank(message = "blank")
        @NotEmpty(message = "empty")
        @NotNull(message = "Id invalid")
        String customerId,

        @NotEmpty(message = "Select a product")
        List<PurchaseRequest> products
) {
}
