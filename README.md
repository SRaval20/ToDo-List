# Todo App

This is a Todo App with a **Next.js frontend**, **Express.js backend**, **Prisma ORM**, and **MySQL** database.

## Getting Started

### Prerequisites
1. **Install Node.js**: [Node.js Guide](https://nodejs.org/)
2. **Install Express.js**: [Express.js Guide](https://expressjs.com)
3. **Install Next.js**: [Next.js Guide](https://nextjs.org)
4. **Install MySQL**: [MySQL Guide](https://dev.mysql.com/downloads/)

---

## Setup Steps

### 1. Clone the Repository
Download the project files from [GitHub Repository](https://github.com/SRaval20/ToDo-List.git) and extract them. Navigate to the project directory:

```bash
cd ToDo-List
```


2. Backend Setup
Navigate to the backend directory:
cd backend
Install dependencies:
npm install
Configure the .env file:
Create a .env file in the backend directory:
DATABASE_URL="mysql://<username>:<password>@localhost:3306/<database-name>"
Replace <username>, <password>, and <database-name> with your MySQL credentials and the database name.
Initialize the database with Prisma:
npx prisma migrate dev
Start the backend server:
npm start
3. Frontend Setup
Navigate to the frontend directory:
cd ../frontend/my-app
Install dependencies:
npm install
Start the development server:
npm run dev
4. MySQL Setup
Create a new database in MySQL:
CREATE DATABASE task_management;
Update the backend .env file with the database name task_management.
Running the Application

Backend: Ensure the backend server is running on http://localhost:3001.
Frontend: Open the frontend at http://localhost:3000.
Database: The application should now connect to the MySQL database.
Development Commands

Backend
Run server in development mode:
npm run dev
Apply new Prisma migrations:
npx prisma migrate dev
Frontend
Run frontend tests:
npm test
Build production-ready frontend:
npm run build
Project Structure

frontend/my-app: Next.js frontend application.
backend: Express.js backend with Prisma ORM.
prisma: Database schema and migrations.
mysql: MySQL database integration.
Notes

Ensure both frontend and backend are running simultaneously for the application to work.
Check the .env file for any additional configuration.