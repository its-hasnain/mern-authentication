
# Mern-Test

Set up a project having APIs & frontend separately.

On the front end, there should be a sign-in & sign-up page.

After sign-up, the system should send a welcome email to the user and a randomly generated password to log in to the system later. You can use any preferred method for sending emails.

On successful login, there should be a simple dashboard showing the number of registered cars in your system.

Make a CRUD for categories e.g. Bus, Sedan, SUV, Hatchback, etc.

Make a CRUD for Cars where the user can select one of the categories from the dropdown & can have other fields like color, model, make, registration-no, etc.

Must use data tables for sorting & pagination.

Your system should be protected XSS & should have implemented JWT.

Each create & update module must have both front-end & back-end data validation.

## Prerequisites

- Node.js
- MongoDB
- React js

## Getting Started

These instructions will guide you on how to get a copy of the project up and running on your local machine.

### For database 

1. install mongodb

2. install mongodb compass to see the collections

3. For this project i created a cluster with access from anywhere you can find connection string in connection.js file

### Backend Setup

1. Clone the repository:

2. cd backend

3. npm start

4. For mailing i have used nodemailer with Stm-server ethereal service to provide the host for nodemailer

### frontend Setup

1. Clone the repository:

2. cd frontend

3. npm start

4. Uses Reat paginate for pagination
