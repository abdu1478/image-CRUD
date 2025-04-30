# 📸 Image CRUD App

A full-stack web application that allows users to **Create, Read, Update, and Delete (CRUD)** image entries using:

- **JavaScript (Vanilla + Axios)** for frontend
- **Node.js + Express.js** for backend
- **MongoDB** as the database
- **Tailwind CSS** for styling

---

## 🚀 Features

- View image gallery
- Edit image details
- Delete image
- Responsive UI with Tailwind CSS
- Axios for smooth frontend-backend API communication

---

## 💠 Tech Stack

- **Frontend:** React, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via mongo db compass)

---

## 📁 Project Structure

```
image-crud-app/
│
├── dsplay image/
│
├── data fetcher/
```

---

## 📦 Setup Instructions

### 1. Clone the Repo

```bash
[git clone https://github.com/your-username/image-crud-app.git
cd image-CRUD](https://github.com/abdu1478/image-CRUD.git)
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Set up MongoDB

- Create a `.env` file in the `backend` folder:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 4. Run Backend Server

```bash
npm start
```

### 5. Open `frontend/index.html` in Browser

No frontend build needed — just open the file in a browser or serve it using VS Code Live Server.

---

## 🖼️ Sample API Endpoints

| Method | Route              | Description         |
|--------|--------------------|---------------------|
| GET    | `/api/images`      |Get images using name|
| POST   | `/api/images`      | Upload new image    |
| PUT    | `/api/images/:id`  | Update image        |
| DELETE | `/api/images/:id`  | Delete image        |

---

## ✅ To-Do For Future

- Add authentication
- Drag-and-drop upload support
- Pagination and search

---

## 📄 License

MIT License

---

## ✨ Author

**Abdurahman Seid** – [@abdu1478](https://github.com/abdu1478)

