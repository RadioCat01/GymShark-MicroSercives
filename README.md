# Micro service architecture of Computer Hardware E-commerce website

## Micro services -
        Configuration-service      - port 8080
        Discovery-service          - port 8761
        Customer-service           - port 8050
        Product-service            - port 8051
        Order-service              - port 8052
        Payment-service            - port 8053
        Notification-service       - port 8054
        API Gateway                - port 8055

### Configuration Service - 
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

#### this applkication.yml file under configurations defines all common configurations for all others yml files
    
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

##
     
    




























                   
