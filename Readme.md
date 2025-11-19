# ✈️ Flight Delay Predictor AI

A modern web application that uses machine learning to predict flight delays based on historical data and key flight parameters.

🔗 **Live Demo**: [https://flight-predictor-bice.vercel.app/](https://flight-predictor-bice.vercel.app/)

![Flight Delay Predictor](https://img.shields.io/badge/Status-Live-success)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-green)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

This application predicts whether a flight will be delayed based on key parameters such as day of the week, airports, and departure delays. The ML model is trained on historical flight data and provides real-time predictions through a beautiful, responsive web interface [web:171][web:175].

### Why This Project?

- **Real-world Application**: Flight delays cost airlines billions annually and affect millions of passengers
- **Machine Learning Integration**: Demonstrates end-to-end ML deployment from training to production
- **Modern Tech Stack**: Built with cutting-edge technologies (React, FastAPI, Docker, Cloud Deployment)
- **User-Friendly**: Clean, intuitive interface accessible to non-technical users

## ✨ Features

- 🤖 **AI-Powered Predictions**: Machine learning model using Logistic Regression
- 🎨 **Beautiful UI**: Modern, responsive design with gradient themes and smooth animations
- ⚡ **Real-time Results**: Instant predictions via FastAPI backend
- 📱 **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- 🌐 **Cloud Deployed**: Frontend on Vercel, Backend on Render
- 🔒 **CORS Enabled**: Secure cross-origin resource sharing
- 📊 **Interactive Form**: User-friendly dropdowns for airports and flight details

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **UI Components**: Shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel
- **State Management**: React Hooks (useState)

### Backend
- **Framework**: FastAPI (Python)
- **ML Library**: scikit-learn
- **Model**: Logistic Regression
- **Data Processing**: pandas, numpy
- **Serialization**: joblib
- **Deployment**: Render (Docker container)

### DevOps
- **Containerization**: Docker
- **Version Control**: Git/GitHub
- **CI/CD**: Render auto-deploy from GitHub

## 🏗 Architecture

