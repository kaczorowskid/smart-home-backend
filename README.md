![logo](https://github.com/user-attachments/assets/cb173f37-f937-4da2-b989-d094c1281e8a)

# Smart Home Backend

Smart Home Backend is a robust and efficient service built with Nest.js. It acts as the core API and logic layer for the Smart Home system, handling authentication, authorization, data management, and integration with MQTT for real-time updates.

## Description

The backend enables secure and seamless management of users, devices, and rooms in the smart home system. It supports a wide range of functionalities, including:

- User authentication and authorization.
- Device management (blinds and thermometers).
- Room management.
- Receiving and storing real-time temperature and humidity data via MQTT.
- Sending email notifications for account activation.

Designed with scalability and security in mind, this service ensures the reliability and robustness needed for modern smart home systems.

## Features

- **User Management**: Add, edit, get, and delete users securely.
- **Authentication & Authorization**: Supports user roles with JWT-based authentication.
- **Device Management**: Handle blinds and thermometers, including creating, updating, getting, and deleting devices.
- **Room Management**: Add, edit, get, and delete rooms.
- **Email Notifications**: Send activation tokens for user account verification.
- **Temperature & Humidity Monitoring**: Receive and manage real-time sensor data via MQTT protocol.
- **Integration with Frontend**: Seamlessly provides API endpoints for frontend integration.
- **Secure Communication**: Includes environment-based configurations for sensitive information.

## Tech Stack

- **Nest.js**: Framework for building scalable backend applications.
- **TypeScript**: Provides type safety and better code maintainability.
- **PostgreSQL**: Relational database for storing users, devices, and room data.
- **Prisma ORM**: Simplifies database operations.
- **MQTT.js**: Manages real-time communication with sensors.
- **jsonwebtoken (JWT)**: Secures user sessions.
- **bcrypt**: Encrypts sensitive user data.
- **nodemailer**: Sends email notifications.
- **Docker**: Simplifies deployment with containerized services.
- **GitHub Actions**: Automates deployment to a VPS.

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v20 or newer)
- **npm** or **yarn** (for managing dependencies)
- **PostgreSQL** database
- **MQTT broker** (e.g., Mosquitto)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kaczorowskid/smart-home-backend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd smart-home-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

## Running the Application

### Development Server

Run the migration:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npx prisma db seed
```

Run the application locally:

```bash
npm run start:dev
# or
yarn start:dev
```

The backend service will be available at `http://localhost:3001` by default.

### Production Server

Build the project for production:

```bash
npm run build
# or
yarn build
```

Run the production build:

```bash
npm run start:prod
# or
yarn start:prod
```

## Docker

1. Build and run the container locally:

   ```bash
   docker compose --env-file .env -f docker-compose.develop.backend.yaml up -d --build
   ```

   The backend service will be available at `http://localhost:3001` by default.

## Environment Variables

Create a `.env` file in the project root and configure the following variables:

```env
DB_USER=<DB_USER_NAME>
DB_PASSWORD=<DB_USER_PASSWORD>
DB_NAME=<DB_NAME>
DATABASE_URL=<DATABASE_URL>

JWT_ACCESS_TOKEN_SECRET=<ACCESS_TOKEN_SECRET>
JWT_REFRESH_TOKEN_SECRET=<REFRESH_TOKEN_SECRET>
JWT_USER_CRETE_SECRET=<USER_CRETE_SECRET>

FRONTEND_URL=<FRONTEND_URL>
BACKEND_IMAGE=<BACKEND_IMAGE_NAME>

EMAIL_SERVICE=<EMAIL_SERVICE>
EMAIL_USERNAME=<EMAIL_USER_NAME>
EMAIL_PASSWORD=<EMAIL_USER_PASSWORD>

CORS_ORIGIN=<FRONTEND_URL>
NODE_ENV=<NODE_ENV>
MQTT_BROKER_URL=<MQTT_BROKER_URL>
```

## MQTT Integration

The backend listens for temperature and humidity data from sensors using MQTT. The data is processed and stored for further analysis.

To configure an MQTT broker (e.g., Mosquitto):

1. Install and start the MQTT broker.
2. Ensure sensors are configured to publish data to the broker's address.
