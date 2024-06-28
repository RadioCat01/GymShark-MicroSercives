package com.Ecom.Notification.kafka;

import com.Ecom.Notification.email.EmailService;
import com.Ecom.Notification.kafka.order.OrderConfirmation;
import com.Ecom.Notification.kafka.payment.PaymentConfirmation;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
@EnableKafka
public class NotificationConsumer {

    private final EmailService emailService;

    @KafkaListener(topics = "payment-topic")
    public void consumePaymentSuccessNotification(PaymentConfirmation paymentConfirmation) throws MessagingException {

        log.info(String.format("Consuming the message from payment-topic"));

        var customerName = paymentConfirmation.customerFirstName() + " " + paymentConfirmation.customerLastName();

        emailService.sendPaymentSuccessEmail(
                paymentConfirmation.customerEmail(),
                customerName,
                paymentConfirmation.amount(),
                paymentConfirmation.orderReference()
        );

    }

    @KafkaListener(topics = "order-topic")
    public void consumeOrderConfirmationNotification(OrderConfirmation orderConfirmation) throws MessagingException {

        log.info(String.format("Consuming the message from order-topic"));

        var customerName = orderConfirmation.customer().firstName() + " " + orderConfirmation.customer().lastName();

        emailService.sendOrderConfirmationEmail(
                orderConfirmation.customer().email(),
                customerName,
                orderConfirmation.totalAmount(),
                orderConfirmation.orderReference(),
                orderConfirmation.products()
        );
    }

}
