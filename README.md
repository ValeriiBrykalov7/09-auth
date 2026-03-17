# 📝 NoteHub

Modern full-stack-ready notes management application with authentication, built using Next.js and optimized for performance, scalability, and user experience.

## 🚀 Live Demo
🔗 https://09-auth-smoky-theta.vercel.app

## 📦 GitHub Repository
🔗 https://github.com/ValeriiBrykalov7/09-auth

---

## ✨ Features

- 🔐 User authentication (login / logout)
- 📝 Full CRUD operations for notes
- 🔎 Search with debouncing
- 📂 Filtering and sorting notes
- ⚡ Data caching and synchronization
- 🧭 Advanced routing (dynamic, parallel, catch-all)
- 🧠 Global state management
- ✅ Form validation
- 🌐 SEO optimization (Open Graph & meta tags)

---

## 🛠 Tech Stack

**Frontend:**
- Next.js (App Router)
- React
- TypeScript

**State & Data:**
- Zustand (global state)
- TanStack Query (server state & caching)
- Axios (API requests)

**Forms & Validation:**
- Formik
- Yup

**UX & Performance:**
- use-debounce
- Optimized rendering & caching

---

## 🧱 Architecture Highlights

- ⚙️ Implemented scalable routing using Next.js App Router  
- 🔄 Separated client state (Zustand) and server state (TanStack Query)  
- 📡 Efficient API integration with caching and background updates  
- ⚡ Debounced search to reduce unnecessary requests  
- 🔐 Protected routes based on authentication state  

---

## 🧑‍💻 My Role

- Designed and developed the application from scratch  
- Built authentication flow and protected pages  
- Implemented API integration and caching logic  
- Optimized performance and UX  
- Structured scalable and maintainable architecture  

---

## 🧠 Challenges & Solutions

**Problem:** Too many API calls during search  
**Solution:** Implemented debouncing to reduce requests and improve performance  

**Problem:** Managing both server and client state  
**Solution:** Used TanStack Query for server state and Zustand for global UI state  
