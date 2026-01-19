# NoteVault

NoteVault is a cross-platform mobile application built with **React Native (Expo)** and **Node.js (TypeScript)**. It helps users **store notes** and **manage to-do lists** efficiently. The app provides a smooth, intuitive interface for note-taking and task management, synced with a backend API.

---

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [React Native App Setup](#react-native-app-setup)
- [Running the App](#running-the-app)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- 🔐 User authentication (signup/login)
- 📝 Create, update, delete notes
- ✅ Add, update, delete to-do items
- ✔️ Mark to-dos as completed
- 🗂️ Sort and organize notes and tasks
- 🌓 Light & Dark mode support
- 📱 Responsive UI for different screen sizes
- 🔄 Real-time sync with backend API

---

## 📁 Project Structure

```
NoteVault/
│
├── backend/                    # Node.js backend
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   ├── models/             # Database models
│   │   ├── routes/             # API routes
│   │   ├── middleware/         # Auth & validation middleware
│   │   ├── utils/              # Helper functions
│   │   └── app.ts              # Express app setup
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── react-native-app/           # React Native (Expo) frontend
    ├── app/                    # App screens & navigation
    ├── components/             # Reusable UI components
    ├── context/                # React Context for state
    ├── api/                    # API service functions
    ├── assets/                 # Images, fonts, etc.
    ├── package.json
    └── tsconfig.json
```

---

## 🛠️ Technologies Used

### Frontend (React Native)

- **React Native** with **Expo**
- **TypeScript**
- **React Navigation** (for routing)
- **React Context API** (state management)
- **Axios** (HTTP client)
- **NativeWind** / **Tailwind CSS** (styling)
- **Expo Vector Icons**

### Backend (Node.js)

- **Node.js** with **Express**
- **TypeScript**
- **MongoDB** with **Mongoose** (database)
- **JWT** (authentication)
- **bcrypt** (password hashing)
- **dotenv** (environment configuration)
- **express-validator** (input validation)

---

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Expo CLI (`npm install -g expo-cli`)

### Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   JWT_EXPIRES_IN=7d
   SMTP_HOST=your_smyp_host
   SMTP_USER=your_smtp_user
   DEV_EMAIL=your_dev_email
   SMTP_PASS=your_smtp_password
   SMTP_PORT=587
   SMTP_SECURE=false
   ```

4. Start the backend server:

   ```bash
   npm run dev
   ```

   The server should now be running on `http://localhost:5000`

### React Native App Setup

1. Navigate to the React Native app folder:

   ```bash
   cd react-native-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Update a `lib/api.tsx` file in the `react-native-app` directory:

   ```env
   baseURL=http://localhost:5000/api
   ```

4. Start the Expo development server:

   ```bash
   npm start
   ```

5. Use **Expo Go** app on your mobile device to scan the QR code, or run on an emulator:
   - **iOS Simulator**: Press `i`
   - **Android Emulator**: Press `a`

---

## 🚀 Running the App

1. **Start the Backend Server:**

   ```bash
   cd backend
   npm run dev
   ```

2. **Start the React Native App:**

   ```bash
   cd react-native-app
   npm start
   ```

3. **Open the app:**
   - Scan the QR code with **Expo Go** on your mobile device
   - Or run on an **iOS Simulator** or **Android Emulator**

4. You can now create notes and manage to-do lists in real-time! 🎉

---

## 🌐 API Endpoints

### Authentication

| Method | Endpoint       | Description                     |
| ------ | -------------- | ------------------------------- |
| POST   | `/auth/signup` | Register a new user             |
| POST   | `/auth/login`  | Login user and return JWT token |

### Notes

| Method | Endpoint        | Description            |
| ------ | --------------- | ---------------------- |
| POST   | `/notes/create` | Create a new note      |
| GET    | `/notes/get`    | Get all notes for user |
| PATCH  | `/notes/update` | Update a note by ID    |
| DELETE | `/notes/delete` | Delete a note by ID    |

### Todos

| Method | Endpoint       | Description            |
| ------ | -------------- | ---------------------- |
| POST   | `/todo/create` | Create a new todo      |
| GET    | `/todo/get`    | Get all todos for user |
| PATCH  | `/todo/update` | Update a todo by ID    |
| DELETE | `/todo/delete` | Delete a todo by ID    |

---

## 🔑 Environment Variables

### Backend (`.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
SMTP_HOST=your_smyp_host
SMTP_USER=your_smtp_user
DEV_EMAIL=your_dev_email
SMTP_PASS=your_smtp_password
SMTP_PORT=587
SMTP_SECURE=false
```

> **Note:** For production, update `lib/api.tsx` to your deployed backend URL.

---

## 📜 Scripts

### Backend Scripts

```bash
npm run dev      # Start development server with nodemon
npm run build    # Compile TypeScript to JavaScript
npm start        # Run compiled JavaScript (production)
npm run lint     # Run ESLint
```

### React Native App Scripts

```bash
npm start        # Start Expo development server
npm run android  # Run on Android emulator/device
npm run ios      # Run on iOS simulator
npm run web      # Run on web browser
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a new branch:**
   ```bash
   git checkout -b feature/YourFeature
   ```
3. **Make your changes**
4. **Commit your changes:**
   ```bash
   git commit -m 'Add some feature'
   ```
5. **Push to the branch:**
   ```bash
   git push origin feature/YourFeature
   ```
6. **Open a Pull Request**

---

## 📄 License

This project is licensed under the **PixelMint Limited Use License (2026)**.

You may use this software for **personal and non-commercial purposes only**.  
Any **commercial use, resale, or monetization is strictly prohibited**.

See the [LICENSE](LICENSE) file for full terms.

---

## 📧 Contact

For questions or feedback, feel free to reach out:

- **Email:** crichit45@gmail.com
- **GitHub:** [MoinMN](https://github.com/MoinMN)

---

**NoteVault** – Keep your notes and to-dos organized, always. ✨
