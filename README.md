# Micro service architecture of GymShark E-commerce website

![1](https://github.com/RadioCat01/Ecom-Micro/assets/159749345/6fa7a789-da87-4c9b-a870-377395fee99f)

## Micro services -
        Configuration-service      - port 8080
        Discovery-service          - port 8761
        Customer-service           - port 8050
        Product-service            - port 8051
        Order-service              - port 8052
        Payment-service            - port 8053
        Notification-service       - port 8054
        API Gateway                - port 8055
---

### Configuration Service - 
#### Configurations
Includes necessary confguraion details ( connection details, API keys, endpoint URLs ) of all the microservices for centralized management, dynamic configuration - services can dynamically refresh configurations without restarting...

    spring:
      profiles:
         active: native  // set active profile - native profile indicates that the configuration properties are stored locally rather than in a remote Git repository or other external sources
      application:
       name: config-server  // set name of the server
      cloud:
         config:
            server:
                native:
                   search-locations: classpath:/configurations   // Specifies the location where the configuration files are stored
    server:
        port: 8080

This class path contains all the configuration files of each micro-service

    application.yml 
    discovery-service.yml
    customer-service.yml
    customer-service.yml
    product-service.yml
    payment-service.yml
    order-service.yml
    gateway-service.yml

#### this application.yml file under configurations defines all common configurations for all others yml files
    
    eureka:
      instance:
         hostname: localhost  // Specifies the hostname for the Eureka instance, indicating that the Eureka server is running on the local machine.
      client:
         service-url:
             defaultZone: http://localhost:8761/eureka  // Defines the default Eureka server URL where this client will register
      name:
         value: CEcom
      spring:
         cloud:
            config:
                override-system-properties: false //ndicates whether the configuration properties from the Config Server should override system properties

    management:   // for zipkin
        tracing:
            sampling:
                probability: 1.0 // Configures the sampling probability for tracing. A value of 1.0 means 100% of requests will be sampled and traced, which is useful for full tracing in a development or testing environment.

#### Java code
No additional classes, main class Annotated tith @EnableConfig server
       
     Dependencies
         config server

---
### Discovery-service
#### Configurations
Discovery server is essential for enabling services to locate each other dynamically otherwise will have to manage the addresses of all microservices manually.

Dynamic discovery - Services can discover and communicate with each other dynamically without needing to know the specific addresses.
Load Balancing - It can provide a list of available service instances, allowing clients to distribute requests among them, thus enabling load balancing.

#### discovery-service.yml in configuration-service
    eureka:
      instance:
        hostname: localhost  // Specifies the hostname for the Eureka instance.
      client:
         register-with-eureka: false
         fetch-registry: false
         serviceUrl:
             defaultZone: http://${eureka.instance.hostname}/${server.port}/eureka/  //specifies the default URL for the Eureka server, using placeholders for the hostname and port

    server:
         port: 8761

#### application.yml in discovery-service
    spring:
      config:
        import: optional:configserver:http://localhost:8080  //Common practice - this line specifies that the application should import configuration properties from an external Spring Cloud Config Server located at http://localhost:8080. The optional: prefix indicates that if the config server is unavailable, the application should still start up using local configurations or defaults.
    application:
      name: discovery-service // application name

#### Java code
No additional classes, main class Annotated tith @EnableConfig server
       
     Dependencies
         config client
         eureka server

---
### Gateway-service
#### Configurations
#### gateway-service.yml in configuration-service

    spring:
       cloud:
         gateway:
           discovery:
              locator:
                 enabled: true  // Enables the discovery locator, which allows the gateway to discover routes from a service registry like Eureka
          
           routes:                                //Defines a list of routes for the gateway to forward requests to specific microservices based on the request path.
               - id: customer-service             // A unique identifier for the route.
                 uri: lb:http://CUSTOMER-SERVICE  // The URI of the target microservice. The lb: prefix indicates that the URI is a load-balanced address.
                 predicates:                      // A list of conditions that incoming requests must match to be routed to the specified URI. In this case, it uses the Path predicate to match the request path
                    - Path=/api/v1/customers/**
               - id: order-service
                 uri: lb:http://ORDER-SERVICE
                 predicates:
                    - Path=/api/v1/orders/**
               - id: order-line-service
                 uri: lb:http://CUSTOMER-SERVICE
                 predicates:
                    - Path=/api/v1/order-lines/**
               - id: product-service
                 uri: lb:http://PRODUCT-SERVICE
                 predicates:
                    - Path=/api/v1/products/**
               - id: payment-service
                 uri: lb:http://PAYMENT-SERVICE
                 predicates:
                    - Path=/api/v1/payments/**
    server:
       port: 8055

#### application.yml in gateway-service

    spring:
       security:
           oauth2:
               resourceserver:
                 jwt:
                    issuer-uri: "http://localhost:9098/realms/micro-service"   // keycloak service up by docker
        config:
            import: optional:configserver:http://localhost:8080
        application:
            name: gateway-service

#### Java code
- security: contains Security filter chain xxx Integrated Keycloak at gateway
- Here have implemented a filter to add user id, first name, last name, email in to the passing request header - that laterly persisted on customer database along with other data ( adress, zip code, city )
##  
    Dependencies
         Config client
         Reactive GateWay
         Eureca discovery client
         Oauth2 Resource Server
         Lombok
         Zipkin

---

### Customer-service
#### Configurations
#### customer-service.yml in configuration-service
    common configuration
    
    spring:
      datasource:  // This section configures the data source, which is the database connection.
          url: jdbc:postgresql://localhost:5432/customer   // databse url
          username: username
          password: password
          driver-class-name: org.postgresql.Driver
      jpa:  // configures JPA properties.
          hibernate:
            ddl-auto: update  //Specifies the action that Hibernate should take with the database schema at startup
          database: postgresql
          database-platform: org.hibernate.dialect.PostgreSQLDialect  //Specifies the Hibernate dialect to use, which is PostgreSQLDialect in this case. This dialect tells Hibernate how to convert its operations into SQL specific to PostgreSQL.

      flyway: // a tool for database migrations.
          baseline-on-migrate: true
          enabled: true
          baseline-description: "init"
          baseline-version: 0
          user: ${spring.datasource.username}
          password: ${spring.datasource.password}

    server:
          port: 8050

#### application.yml in discovery-service
    spring:
      config:
        import: optional:configserver:http://localhost:8080  //Common practice
    application:
      name: customer-service // application name

#### Java code
Entities, data models, controller, services, repositories, gloable exception handler, custom exception classes for customer handling
       
     Dependencies
         Config client
         Spring web
         Validation
         Lombok
         Eureca discovery client
         Spring data jpa
         postgreSQL drivers
         Zipkin

---

### Product-service
#### Configurations
#### product-service.yml in configuration-service
    common configuration same as customer config database name "product" url 
    hybernate ddl-auto is set to validate, therefore db.migration (flyway) is used to create table if not already created.

#### application.yml in discovery-service
    spring:
      config:
        import: optional:configserver:http://localhost:8080  //Common practice
    application:
      name: product-service // application name

#### Java code
Entities, data models, controller, services, repositories, gloable exception handler, custom exception classes for customer handling
       
     Dependencies
         Config client
         Spring web
         Validation
         Lombok
         Flyway Migration
         Eureca discovery client
         Spring data JPA
         postgreSQL drivers
         Zipkin

---

### Payment-service
#### Configurations
#### payment-service.yml in configuration-service
    common database configuration same as customer config database name "order" url

    spring:
       kafka:
          producer:
            bootstrap-servers: localhost:9092    // Specifies the Kafka broker address (localhost on port 9092) for the producer. up on docker
            key-serializer: org.apache.kafka.common.serialization.StringSerializer   //Sets the key serializer for the Kafka producer to StringSerializer.
            value-serializer: org.springframework.kafka.support.serializer.JsonSerializer  //Sets the value serializer for the Kafka producer to JsonSerializer, which allows for serializing Java objects to JSON.
            properties:
                spring.json.type.mapping: paymentConfirmation:com.Ecom.Payment.notification.PaymentNotificationRequest  // Maps the JSON type orderConfirmation to the Java class com.Ecom.Order.kafka.OrderConfirmation.
    paypal:
      client-id: AbjzUpp06dy-_V9FgZnZUqVKQdwqKNkVI6satiVDqMgbiHVVFo0N2gw6NI9xtWNvhwRf0r5QGfJrwO8c
      client-secret: EAsRr46qOtOy9hgAI8fOJ2kyKhzsgvU3fqXstSHUuorAgkGgCKWouTx4oyE5Czh9hxodzKf4LPma_CfL      // Paypal Integration
      mode: sandbox  # for testing set 'live' for actual deployment

#### Java code
- Payment
  - Entities, services, contrillers, data models, mappers for creating payment
- config
  - kafkaOrderTopicConfig: set new bean of order topic to communicate with kafka ( send to kafka )
- norification
  - PaymentNotificationReuqest: datamodel for sending data through kafka
  - NotificationProducer: Message sender class of Kafka
##
    @JpaAuditing enabled in main class
    
    Dependencies
         Config client
         Spring web
         Validation
         Lombok
         Spring for Apache Kafka
         Flyway Migration
         Eureca discovery client
         Spring data JPA
         postgreSQL drivers
         Zipkin



---

### Order-service
#### Configurations
#### order-service.yml in configuration-service
    common database configuration same as customer config database name "order" url

    spring:
       kafka:
          producer:   // this is a message producer
            bootstrap-servers: localhost:9092    // Specifies the Kafka broker address (localhost on port 9092) for the producer. up on docker
            key-serializer: org.apache.kafka.common.serialization.StringSerializer   //Sets the key serializer for the Kafka producer to StringSerializer.
            value-serializer: org.springframework.kafka.support.serializer.JsonSerializer  //Sets the value serializer for the Kafka producer to JsonSerializer, which allows for serializing Java objects to JSON.
            properties:
                spring.json.type.mapping: orderConfirmation:com.Ecom.Order.kafka.OrderConfirmation  // Maps the JSON type orderConfirmation to the Java class com.Ecom.Order.kafka.OrderConfirmation.

    application:
       config:   // specify urls which used by OpenFeing clients or RestTemplate
          customer-url: http://localhost:8055/api/v1/customers
          product-url: http://localhost:8055/api/v1/products
          payment-url: http://localhost:8055/api/v1/payments


#### Java code
- Order
  - Entities, services, contrillers, data models, mappers for creating order
- Order line
  - Entities, services, contrillers, data models, mappers for creating order-line
- Payment
  - Payment client: Openfeing postMapping to get payment details
  - Payment request: data model
- Product
  - Product client: RestTemplate for getting product details
- Customer
  - customer client: Openfeing to get data from customer service
- config
  - kafkaOrderTopicConfig: set new bean of order topic to communicate with kafka ( send to kafka )
  - restTemplateConfig: configurations for Rest Template
- Kafka
  - OrderConfirmation: datamodel for sending data through kafka
  - OrderProducer: Message sender class of Kafka
##
    @EnableFeignClients
    @EnableJpaAuditing  
    in main class

    Dependencies
         Config client
         Spring web
         Validation
         Lombok
         OpenFeign
         Spring for Apache Kafka
         Flyway Migration
         Eureca discovery client
         Spring data JPA
         postgreSQL drivers
         Zipkin

---

### Notification-service
#### Configurations
#### notification-service.yml in configuration-service
    spring:
       kafka:
           consumer:            // this is a message consumer
                bootstrap-servers: localhost:9092
                group-id: paymentGroup,orderGroup               //pecifies the consumer group IDs
                auto-offset-reset: earliest                      //Specifies what to do when there is no initial offset in Kafka or if the current offset does not exist anymore. The earliest setting means the consumer will start reading from the earliest available message
                key-deserializer: org.apache.kafka.common.serialization.StringDeserializer               //Specifies the class used to deserialize the key of the Kafka message
                value-deserializer: org.springframework.kafka.support.serializer.JsonDeserializer             //Specifies the class used to deserialize the value of the Kafka message
                properties:
                spring.json.trusted.packages: '*'                      //Specifies the packages trusted for deserialization. Setting this to '*' means all packages are trusted
                spring.json.type.mapping: orderConfirmation:com.Ecom.Notification.kafka.order.OrderConfirmation,paymentConfirmation:com.Ecom.Notification.kafka.payment.PaymentConfirmation
                                                //Specifies custom type mappings for JSON deserialization. Here, orderConfirmation is mapped to com.Ecom.Notification.kafka.order.OrderConfirmation, and paymentConfirmation is mapped to com.Ecom.Notification.kafka.payment.PaymentConfirmation.
      
       mail:             // properties for mailing
          host: localhost
          port: 1025
          username: username
          password: password
          properties:
               mail:
                 smtp:
                   trust: '*'
                 auth: true
                 starttls:
                    enabled: true
                 connectiontimeout: 5000
                 timeout: 3000
                 writetimeout: 5000

    server:
        port: 8054

#### Java code
- email
  - EmailService: mail sender service
  - EmailTemplates: templates for mailing ( choosen from resource files )
- kafka
  - NotificationConsumer: service class that listens to incoming kafka messages and generate email to send with the use of email service
  - Order / Payment files : contains data models to map the incoming kafka messages to be deserialized
- norification
  - PaymentNotificationReuqest: datamodel for sending data through kafka
  - NotificationProducer: Message sender class of Kafka
##
    @EnableAsync in main class
    
    Dependencies
         Config client
         Thymeleaf
         Java Mail Sender
         Spring for Apache Kafka
         Eureca discovery client
         Zipkin


---













     
    




























                   
