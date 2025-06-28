# 📝 Blogify

**A Full-Stack Blog Website built with Node.js, Express, MongoDB, and EJS**

Blogify is a dynamic blog platform where users can register, log in, create, and manage blog posts. It uses server-side rendering with EJS and secure authentication powered by JSON Web Tokens (JWT).

---

## 🚀 Features

- 🧑‍💻 User Registration & Login (JWT Authentication)
- ✍️ Create, Read, Update, Delete (CRUD) blog posts
- 🗂 Server-Side Rendering using EJS templates
- 🔐 Route protection for authenticated users
- 🌐 SEO-friendly URLs and clean UI
- 💾 MongoDB for persistent blog and user data

---

## 🛠 Tech Stack

| Layer          | Technology             |
|----------------|------------------------|
| Backend        | Node.js, Express.js    |
| Database       | MongoDB (Mongoose)     |
| Templating     | EJS (Server-Side Rendering) |
| Authentication | JWT, bcrypt            |
| Styling        | CSS                    |

---

## 📁 Folder Structure

Blogify/
│
├── models/          # Contains Mongoose schemas for Blog and User
├── routes/          # All Express.js route handlers (auth, blog, etc.)
├── views/           # EJS templates for server-side rendering
├── public/          # Static files like CSS, JS, images
├── middleware/      # Custom middleware functions (e.g., JWT auth)
├── controllers/     # (Optional) Business logic separated from routes
├── index.js           # Entry point for the Node.js application
└── package.json     # NPM metadata and dependency list

---

## 🧑‍💻 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ankitsgit/Blogify.git
cd Blogify
