package com.Ecom.Product.product;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record ProductRequest(
         Integer id,

         @NotNull(message = "ProductName empty")
         String naame,
         @NotNull(message = "Product description empty")
         String description,
         @NotNull(message = "Product quantity empty")
         double availableQuantity,
         @NotNull(message = "Product price empty")
         BigDecimal price,
         @NotNull(message = "set the id")
         Integer categoryId
) {
}
