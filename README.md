
# 🚀 Campus Utility Hub (MERN Stack)

A full-stack web application designed to simplify campus life by enabling students to share resources, report lost items, and borrow/lend utilities efficiently.

---

## 🌟 Features

### 📚 Resource Sharing
- Upload and access academic materials (notes, assignments, PDFs)
- Secure file upload using Multer
- Only the owner can delete their uploaded resources

---

### 🔍 Lost & Found System
- Report lost items with details (title, description, location, contact, image)
- Mark items as found (only by the owner)
- Delete items (owner-only access)

---

### 📦 Borrow & Lend System
- Add items for lending (books, lab tools, etc.)
- Request items from other users
- Owner can approve requests
- Status tracking: `available → requested → borrowed`

---

### 🔐 Authentication & Authorization
- User login & registration (JWT-based authentication)
- Context API for global state management
- Protected routes
- Role-based access control (owner-only actions)

---

### 🎨 UI Features
- Responsive design using Bootstrap
- Clean card-based layout
- Navbar with dynamic user greeting
- Footer with links
- Compact login/register forms

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Bootstrap
- Axios
- Context API

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (file upload)

---

## 📂 Project Structure

```

campus-utility-hub/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   └── App.jsx
│
└── README.md

````

---

## ⚙️ Installation & Setup

### 🔹 Clone the repository
```bash
git clone https://github.com/your-username/campus-utility-hub.git
cd campus-utility-hub
````

---

### 🔹 Backend Setup

```bash
cd backend
npm install
npm run server
```

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 💼 Resume Description

> Developed a full-stack Campus Utility Hub using the MERN stack, implementing resource sharing, lost & found tracking, and borrow/lend workflows with JWT-based authentication and role-based access control.

---

## 👨‍💻 Author

**Loralin Sahoo**

* GitHub: [https://github.com/loralin27](https://github.com/loralin27)
* LinkedIn: [https://www.linkedin.com/in/loralin-sahoo-325609293/](https://www.linkedin.com/in/loralin-sahoo-325609293/)

---

## ⭐ If you like this project, give it a star!

```

---

