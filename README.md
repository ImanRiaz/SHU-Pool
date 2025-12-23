# SHU-Pool - Modern Carpooling Platform

A full-stack carpooling application built with **Spring Boot** (Backend) and **React + Vite** (Frontend).

## 🚀 Features
- **User Authentication**: JWT-based Login & Registration.
- **Role Management**: Driver & Passenger roles.
- **Rides**: Drivers can offer rides; Passengers can search and book seats.
- **Dashboard**: View active bookings and offered rides.
- **Tech Stack**: Java 17, Spring Boot 3, MongoDB, React 18, TailwindCSS.

## 🛠️ Prerequisites
- **Java 17+** & **Maven**
- **Node.js** & **npm**
- **MongoDB** (Cloud or Local) - *Already configured with provided Atlas URL*

## 📥 Installation & Running

### 1. Backend (Spring Boot)
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Build and Run:
   ```bash
   mvn spring-boot:run
   ```
   *Server will start on `http://localhost:8080`*

### 2. Frontend (React)
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install Dependencies:
   ```bash
   npm install
   ```
3. Run Development Server:
   ```bash
   npm run dev
   ```
   *App will interactively start on `http://localhost:5173`*

## 🔑 Demo Access
- Register a new user as a **Driver** to offer rides.
- Register another user as a **Passenger** to book rides.

## 📁 Project Structure
- `backend/src/main/java`: Spring Boot Source Code.
- `frontend/src`: React Source Code.
