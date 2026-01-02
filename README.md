# 🛡️ Ultimate Node Auth

A robust, production-ready Authentication built with **Node.js**, **Express**, and **Sequelize (MySQL)**. 
This project provides a secure foundation for user management, featuring Local Strategy (Email/Password), Social Login (Google & Facebook), and JWT-based authorization.


## 🛠️ Tech Stack

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MySQL & Sequelize
- **Auth:** Passport.js (Local, JWT, Google, Facebook)
- **Tools:** Postman (for testing), Dotenv (environment variables) , Bcryptjs (hash passwords) ,XAMPP (set up a local SQL database)




## ✨ Features

- **📚 MVC Architecture:** Clean separation of concerns (Models, Views, Controllers).
- **🔐 JWT Authentication:** Secure, stateless authentication using JSON Web Tokens.
- **🌍 Social OAuth:**
  - **Google Login:** Seamless integration with Google OAuth2.
  - **Facebook Login:** Easy integration with Facebook Strategy.
- **👤 User Management:**
  - Registration with hashed passwords (bcryptjs).
  - Account linking (Smartly handles users logging in with same email via different providers).
- **🗄️ MySQL Database:** Structured data management using **Sequelize ORM**.

---


## 📡 API Endpoints

🟢 Public Routes

| Method |       Route            | Description   |
| ------ | ---------------------  | ------------- |
| POST   | /api/user/register     | Register a new user (Email/Password) |
| POST   | /api/user/login        | Login and receive JWT  |
| GET    | /api/user/google       | Initiate Google Login   |
| GET    | /api/user/facebook     | Initiate Facebook Login   |

🔒 Protected Routes

| Method |       Route            | Description   |
| ------ | ---------------------  | ------------- |
| GET   | /api/user/profile       | Get current user profile details |



## 🗄 Running Locally

- **Prerequisites**
    - [Node.js](https://nodejs.org/en/download)
    - [XAMPP ](https://www.apachefriends.org/download.html)

- **1-Clone the Repository and Install Dependencies**

```bash
git clone https://github.com/AhmedSedkyy/ultimate-node-auth

cd ultimate-node-auth

npm install

```

- **2-Create a .env file**

```bash

PORT=3000

DB_HOST=your_mysql_host
DB_USER=your_mysql_username
DB_PASS=your_mysql_password
DB_NAME=your_mysql_database_name

JWT_SECRET=your_secret_key

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

```

- **3-Run the Server**

```bash

npm start

```



## 👤 Author

**[Ahmed Sedky]**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ahmedsedkyy/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AhmedSedkyy)
