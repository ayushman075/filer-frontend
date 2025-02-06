# Filer Frontend

## Overview
Filer Frontend is a React-based web application built using Vite and TypeScript. It provides an intuitive user interface for authentication, file uploads, and data analytics. The frontend consumes APIs from the Filer Backend and offers an interactive user experience with charts and tables.

## Features
- User authentication (login/signup)
- File upload interface
- Interactive analytics dashboards using Recharts
- Toast notifications with React-Toastify
- UI components using ShadCN
- Responsive design with Tailwind CSS
- Data tables with Ant Design

## Technologies Used
- **React + Vite + TypeScript**: Modern frontend framework
- **React Router**: Client-side routing
- **Recharts**: Data visualization and analytics
- **ShadCN**: UI component library
- **Ant Design**: Advanced table UI
- **Axios**: HTTP client for API calls
- **Tailwind CSS**: Utility-first CSS framework

## Installation
### Prerequisites
Ensure you have:
- Node.js (v16 or later)

### Setup Steps
1. Clone the frontend repository:
   ```sh
   git clone https://github.com/ayushman075/filer-frontend.git
   cd filer-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
   The app runs on `http://localhost:5173`

## Frontend Features
### Authentication & Routing
- `BrowserRouter` for navigation
- Authenticated routes using `AuthProvider`
- Login (`/login`), Signup (`/signup`), Home (`/`), and 404 page

### File Upload
- Uses a file input component to upload files
- Sends data to the backend for processing

### Analytics Dashboard
- **Credit Score Distribution** (Pie Chart)
- **Monthly Applications & Credit Score Trend** (Line Chart)
- **Top Banks by Volume** (Bar Chart)
- **Loan Portfolio Overview** (Pie Chart with Loan Stats)
- Uses `Recharts` for visual analytics

### Data Table
- **Ant Design Table** with sorting, pagination, and search
- Displays user credit details such as name, mobile, PAN, credit score, etc.

## Deployment
The frontend can be deployed on:
- **Vercel**
- **Netlify**
- **Render**
- **AWS Amplify**

## Contact
For any queries or issues, reach out at ayushman8521@gmail.com .
