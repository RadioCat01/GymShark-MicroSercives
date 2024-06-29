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

    **application.yml** 
    discovery-service.yml
    customer-service.yml
    customer-service.yml
    product-service.yml
    payment-service.yml
    order-service.yml
    gateway-service.yml





























                   
