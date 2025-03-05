# API Project

## Setup Instructions

To get started with this project, follow the steps below to install dependencies and configure the database.

### 1. Install Dependencies

Ensure that you have [Yarn](https://classic.yarnpkg.com/en/docs/install) installed. Then, run the following command to install the required dependencies:

```bash
yarn install
```

### 2. Configure the Database

Before running the API, you need to configure the database. Follow the instructions below to set up PostgreSQL on your local machine and configure the database connection.

#### 2.1. Install PostgreSQL

If you haven't already installed PostgreSQL, you can download and install it from the official website:

- [Download PostgreSQL](https://www.postgresql.org/download/)

Follow the installation instructions for your operating system.

#### 2.2. Create the Database

After installing PostgreSQL, you need to create the database that the API will connect to. Here's how to do it:

1. Open a terminal or command prompt.
2. Access PostgreSQL by running the following command (replace `postgres` with your PostgreSQL username if different):

   ```bash
   psql -U postgres

### 3. Create the Database

In order for the API to work, you need to create the database that it will connect to. Follow the steps below to create the `Idea` database on your local PostgreSQL server.
```
CREATE DATABASE Idea;
```

## Environment Variables

Environment variables are used to store configuration settings that your application needs to run. These values are stored in the `.env` file in the root directory of your project. Make sure you set the correct environment variables before running the API.

### 1. Create a `.env` File

In the root directory of your project, create a file named `.env`. This file will hold the configuration values required by the application.

### 2. Configure the Environment Variables

The following environment variables are required for the application:

```env
PORT=
DBHOST=
DBPORT=
DBUSERNAME=
DBPASSWORD=
DATABASENAME=
JWT_EXPIRE_TIME=15m
JWT_REFRESH_EXPIRE_TIME=7d
JWT_SECRET_KEY=
ALLOWED_IPS=
```

## Running the API

Once the database is set up and all dependencies are installed, you can run the API locally. Follow the instructions below to start the API server.

### 1. Start the API

To start the API, you need to run the following command from the root directory of your project:

```bash
yarn start
```

## Running Tests with `yarn test`

To ensure the API works as expected, you need to run the test cases. If you're using [Jest](https://jestjs.io/) or other testing libraries, you can run the tests using the `yarn test` command. Follow the instructions below to run tests with `yarn test`.
