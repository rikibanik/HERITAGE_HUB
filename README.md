# HERITAGE HUB

## Overview
HERITAGE HUB is a comprehensive platform designed to manage venues, admins, users, authors, and orders. This README provides an overview of the available endpoints and features of the project.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
    - [Admin Endpoints](#admin-endpoints)
    - [User Endpoints](#user-endpoints)
    - [Author Endpoints](#author-endpoints)
    - [Venue Endpoints](#venue-endpoints)
    - [Order Endpoints](#order-endpoints)
- [Features](#features)

## Installation
To install and run the project locally, follow these steps:

1. Clone the repository:
        ```sh
        git clone https://github.com/banikriki/HERITAGE_HUB.git
        ```
2. Navigate to the project directory:
        ```sh
        cd HERITAGE_HUB
        ```
3. Install the dependencies:
        ```sh
        npm install
        ```
4. Set up the environment variables by creating a `.env` file in the root directory and adding the necessary configurations.

5. Start the server:
        ```sh
        npm start
        ```

## Usage
Once the server is running, you can access the application at `http://localhost:3000`.

## Endpoints

### Admin Endpoints
- **POST /admin/add**: Add a new admin.
- **POST /admin/login**: Login as an admin.

### User Endpoints
- **GET /user**: Get all users.
- **POST /user**: Create a new user.
- **PUT /user/:id**: Update user details.
- **DELETE /user/:id**: Delete a user.

### Author Endpoints
- **GET /author**: Get all authors.
- **POST /author**: Create a new author.
- **PUT /author/:id**: Update author details.
- **DELETE /author/:id**: Delete an author.

### Venue Endpoints
- **GET /venue**: Get all venues.
- **POST /venue**: Create a new venue.
- **PUT /venue/:id**: Update venue details.
- **DELETE /venue/:id**: Delete a venue.

### Order Endpoints
- **GET /order**: Get all orders.
- **POST /order**: Create a new order.
- **PUT /order/:id**: Update order details.
- **DELETE /order/:id**: Delete an order.

## Features
- **Admin Management**: Add, update, and delete admins.
- **User Management**: Add, update, and delete users.
- **Author Management**: Add, update, and delete authors.
- **Venue Management**: Add, update, and delete venues.
- **Order Management**: Add, update, and delete orders.
- **Authentication**: Secure login for admins.
- **CORS Support**: Configurable CORS settings for secure cross-origin requests.

For more detailed information on each endpoint and feature, refer to the respective route files and controllers in the `server` directory.
