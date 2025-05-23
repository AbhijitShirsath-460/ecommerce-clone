
# 📦 E-Commerce React App

An attractive, responsive **E-Commerce Frontend** built using **React + Vite**, styled with **Tailwind CSS**, and powered by **Firebase Authentication**. This project allows users to browse products, manage a cart and wishlist, and securely place orders.

## 🚀 Live Demo

👉 [View Live Site](https://my-store-clone.netlify.app)

## ✨ Features

✅ Responsive product grid  
✅ Google Login (via Firebase)  
✅ Cart management with quantity controls  
✅ Wishlist system with local storage  
✅ Protected routes (Checkout, Orders, Wishlist)  
✅ Order history per session  
✅ Category filtering + search + sort  
✅ Animated UI (Framer Motion)  
✅ Toast messages for actions (React Toastify)  
✅ Persistent data via localStorage  
✅ Deployed on Netlify

## 🛠️ Tech Stack

| Frontend     | Backend/Auth  | Styling        | Tools               |
|--------------|---------------|----------------|---------------------|
| React + Vite | Firebase Auth | Tailwind CSS   | React Router DOM    |
| React Icons  | —             | Framer Motion  | React Toastify      |

## 🧑‍💻 Getting Started

### ✅ 1. Clone the repository

```bash
git clone https://github.com/AbhijitShirsath-460/ecommerce-clone.git
```

### ✅ 2. Install dependencies

```bash
npm install
```

### ✅ 3. Add Firebase Config

Create a file: **`src/firebase.js`**

```js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
```

### ✅ 4. Start development

```bash
npm run dev
```

## 🧩 Folder Structure

```
src/
├── components/         # Reusable components (Navbar, ProductCard, etc)
├── context/            # Global contexts (Auth, Cart, Wishlist, Orders)
├── pages/              # Route pages (Home, ProductDetail, Cart, Checkout)
├── services/           # API calls to product endpoint
├── firebase.js         # Firebase Auth configuration
└── App.jsx             # Main app routing
```

## 🔐 Authentication

- Uses Firebase **Google Login** via `signInWithPopup`
- Protected routes (`/checkout`, `/orders`, `/wishlist`)
- Logout resets user session and localStorage
- Avatar and user name shown in navbar

## 🚚 Deployment

This app is deployed on **Netlify** at:

👉 **[https://my-store-clone.netlify.app](https://my-store-clone.netlify.app)**

To deploy:

```bash
npm run build
```

Publish `/dist` to Netlify.

## 🤝 Contributing

Pull requests are welcome! If you'd like to improve features, fix bugs or add enhancements, feel free to fork and submit a PR.

## 🙋 Contact

- GitHub: (https://github.com/AbhijitShirsath-460)
- Live: [https://my-store-clone.netlify.app](https://my-store-clone.netlify.app)
