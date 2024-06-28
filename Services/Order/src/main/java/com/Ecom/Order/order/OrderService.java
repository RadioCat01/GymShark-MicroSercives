package com.Ecom.Order.order;

import com.Ecom.Order.customer.CustomerClient;
import com.Ecom.Order.exception.BusinesException;
import com.Ecom.Order.kafka.OrderConfirmation;
import com.Ecom.Order.kafka.OrderProducer;
import com.Ecom.Order.orderline.OrderLineRequest;
import com.Ecom.Order.orderline.OrderLineService;
import com.Ecom.Order.payment.PaymentClient;
import com.Ecom.Order.payment.PaymentRequest;
import com.Ecom.Order.product.ProductClient;
import com.Ecom.Order.product.PurchaseRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderMapper mapper;
    private final OrderRepository repo;
    private final CustomerClient customerClient;
    private final ProductClient productClient;
    private final OrderLineService orderLineService;
    private final OrderProducer orderProducer;
    private final PaymentClient paymentClient;


    public Integer createOrder(OrderRequest request) {

        var customer =this.customerClient.findCustomerById(request.customerId())
                .orElseThrow(()-> new BusinesException("Cannot create order : invalid customer id"));

        var purchasedProduct = this.productClient.purchaseProducts(request.products());

        var order = this.repo.save(mapper.toOrder(request));


        for(PurchaseRequest purchaseRequest: request.products()){
            orderLineService.saveOrderLine(
                    new OrderLineRequest(
                            null,
                            order.getId(),
                            purchaseRequest.productId(),
                            purchaseRequest.quantity()
                    ));

        }

        var paymentRequest = new PaymentRequest(
                request.amount(),
                request.paymentMethod(),
                order.getId(),
                order.getReference(),
                customer
        );

        paymentClient.requestOrderPayment(paymentRequest);

        orderProducer.sendOrderConfirmation(
                new OrderConfirmation(
                        request.reference(),
                        request.amount(),
                        request.paymentMethod(),
                        customer,
                        purchasedProduct
                )
        );

        return order.getId();
    }

    public List<OrderResponse> findAll() {
        return repo.findAll().stream().map(mapper::fromOrder)
                .collect(Collectors.toList());
    }

    public OrderResponse findById(Integer orderId) {
        return repo.findById(orderId).map(mapper::fromOrder).orElseThrow(()->new EntityNotFoundException(String.format("Order not found")));
    }
}
