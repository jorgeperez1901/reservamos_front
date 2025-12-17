# Reservamos Frontend 🌤️

Frontend desarrollado con **Vue 3** y **Vite**.  
La aplicación consume una API propia que integra datos de **Reservamos** y **OpenWeather** para mostrar información climática de ciudades populares.

---

## 🚀 Tecnologías

- Vue 3 (Composition API + `<script setup>`)
- Vite
- Vue Router
- Pinia
- Axios
- Tailwind CSS

---

## 📋 Requisitos

- **Node.js** 20.19+ o 22+
- **npm**
- **Git**

---

## ⚙️ Instalación y ejecución

Clona el repositorio:

bash
git clone git@github.com:jorgeperez1901/reservamos_front.git
cd reservamos_front

npm install

npm run dev

http://localhost:5173

## 🔐 Autenticación

La aplicación cuenta con:

Signup

Login

Manejo de sesión mediante JWT

El token se guarda en localStorage y se envía automáticamente en cada petición protegida mediante Axios interceptors.

## 🌎 Funcionalidades
1️⃣ Autenticación de usuarios

Registro e inicio de sesión.

Visualización del nombre del usuario autenticado en la barra de navegación.

2️⃣ Lista de ciudades populares

Consumo de la API de Reservamos.

Integración con OpenWeather.

Muestra:

Nombre de la ciudad

Temperatura actual

Condición climática

3️⃣ Detalle del clima por ciudad

Al seleccionar una ciudad:

Pronóstico de los próximos 7 días

Fecha

Temperatura máxima y mínima

Condición climática

## 🔗 Backend

Este frontend consume una API desarrollada en Ruby on Rails, la cual:

Maneja autenticación JWT

Integra Reservamos + OpenWeather

Expone endpoints protegidos

