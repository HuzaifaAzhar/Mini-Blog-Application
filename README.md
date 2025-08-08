# 📝 Mini Blog App

A simple **Blog Management Application** built with **NestJS** (backend) and **Vue 3** (frontend), styled using **PrimeVue** and **Tailwind CSS** inspired by Apple Frosted Glass.  
This project implements CRUD functionality with optional search, filtering, sorting, and pagination features.

---

## 🚀 Features

### **Backend (NestJS)**
- Blog post model with fields:
id, title, content, author, createdAt, updatedAt
- RESTful API for blog management (create, read, update, delete)
- Proper **Controller/Service** architecture
- DTOs with **class-validator** for request validation
- Clean, maintainable project structure

### **Frontend (Vue 3)**
- Public view to list and read blog posts
- Admin view to create, edit, and delete posts (no login required)
- Search and filter by author
- Sort by date (ascending/descending)
- Pagination for better UX
- Responsive design for desktop and mobile
- Styled with **PrimeVue** + **Tailwind CSS**

---

## 📂 Project Structure

/backend # NestJS server<br>
/frontend # Vue 3 client

---

## 🛠 Tech Stack

**Backend:**
- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [class-validator](https://github.com/typestack/class-validator)
- [Axios](https://axios-http.com/) for frontend-backend communication

**Frontend:**
- [Vue 3](https://vuejs.org/) (Composition API + `<script setup>`)
- [PrimeVue](https://www.primefaces.org/primevue/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## ⚙️ Setup Instructions
(Make sure to create the .env file as well)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/HuzaifaAzhar/Mini-Blog-Application.git
cd Mini-Blog-Application
```
### 2️⃣ Backend Setup (NestJS)
```bash
cd backend
npm install
```
- Create .env file in the /backend directory:
<br>JWT_SECRET=12345678900987654321
<br>JWT_EXPIRES_IN=1h
<br>PORT=3000
<br>ADMIN_USERNAME=admin
<br>ADMIN_PASSWORD=admin1234
```bash
npm run start:dev
Backend will run at http://localhost:3000
```
### 3️⃣ Frontend Setup (Vue 3)
```bash
cd frontend
npm install
npm run dev
Frontend will run at http://localhost:5173 (Vite default)
```
---
### Use The Login Details in .env to Login to the Admin Panel
---
## 📌 API Endpoints
- Method	Endpoint	Description
- GET	/posts	Get all blog posts
- GET	/posts/:id	Get a single blog post
- POST	/posts	Create a new blog post
- PUT	/posts/:id	Update a blog post
- DELETE	/posts/:id	Delete a blog post
---
## 🌟 Extra Features
- ✅ Search by title/content
- ✅ Filter by author
- ✅ Sort by date (ascending/descending)
- ✅ Pagination
- ✅ Responsive design
---
## 👨‍💻 Author
Developed by **Huzaifa Azhar Tarar**
---
##📸 Screenshots
<img width="1266" height="712" alt="image" src="https://github.com/user-attachments/assets/be0c6533-3002-4c99-882f-5b972605dab4" />
<img width="1280" height="712" alt="image" src="https://github.com/user-attachments/assets/0217999d-d734-4ac8-be10-e4d719e91afa" />
<img width="1267" height="710" alt="image" src="https://github.com/user-attachments/assets/6acebe86-f210-46b3-93e4-86fc8d904648" />
<img width="1262" height="710" alt="image" src="https://github.com/user-attachments/assets/92958eaa-2089-4598-a43c-e1a89b906690" />
<img width="2526" height="1421" alt="image" src="https://github.com/user-attachments/assets/cee2d95b-ca95-423f-91dd-f69c35a93dd8" />
<img width="1267" height="712" alt="image" src="https://github.com/user-attachments/assets/ae5f7a4e-4afd-44c8-916d-ac1b4648bc6d" />
---



