package com.Ecom.Order.order;


import com.Ecom.Order.customer.CustomerResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService service;

    @PostMapping
    public ResponseEntity<Integer> createOrder(
            @RequestBody @Valid OrderRequest request,
            @RequestHeader("User-ID")String UserId,
            @RequestHeader("First-Name")String firstName,
            @RequestHeader("Last-Name")String lastName,
            @RequestHeader("Email")String Email
            ) {

        CustomerResponse currentCustomer = new CustomerResponse(
                UserId,
                firstName,
                lastName,
                Email
                );

        return ResponseEntity.ok(service.createOrder(request , currentCustomer));
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> findAll(){
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{order-id}")
    public ResponseEntity<OrderResponse> findById(
            @PathVariable("order-id") Integer orderId
    ){
        return ResponseEntity.ok(service.findById(orderId));
    }
}
