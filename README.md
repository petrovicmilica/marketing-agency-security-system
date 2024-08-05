# Marketing agency security system 
## Overview

The Marketing Agency Management System is a comprehensive platform designed to manage records of clients and employees within a marketing agency. The system includes services for user management, event monitoring, and certificate management (PKI). It provides distinct roles and permissions for different types of users: clients, employees, administrators, and unauthenticated users.

The primary purpose of the application is to maintain records of employees, current and previous clients, and to log security-related events within the system. This centralized approach ensures efficient management and security of data, enhancing the overall operation of the marketing agency.

## Features

Some of the main features this project includes are: 
- **User registration and authentication**
  - Password management (passwordless login, salted password hashing mechanism)
  - Refresh and access tokens
  - Two-factor authentication (implementation of Time-based One Time Password)
  - CAPTCHA test (implementation of Google reCAPTCHA)
- **Access control via RBAC model**
- **HTTPS communication**
- **Single Sign-On (Google SSO)**
- **Encryption of sensitive data in accordance with GDPR guidelines**
- **Certificate management via PKI services**


## Technologies 

- Back-end: Java + Spring Boot
- Front-end: Angular (HTML, CSS, TypeScript)
- Database: Relational database (PostgreSQL)

## Getting started

To set up the project locally, please follow these steps:
1. Clone the repository
2. Set up the backend using Java and Spring Boot
3. Set up the frontend using Angular
4. Configure the database using pgAdmin

To start the front-end part of the application, use the following command:

```bash
ng serve --ssl
```

## Contributors 

[Milica Petrović](https://github.com/petrovicmilica)

[Ana Radovanović](https://github.com/anciii13)

[Kristina Zelić](https://github.com/zelick)
