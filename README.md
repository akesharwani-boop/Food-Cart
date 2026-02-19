# 🍽️ Food Cart – Full Stack E-Commerce Application

A modern full-stack food ordering application built using **Next.js (App Router)**, **TypeScript**, **Redux Toolkit**, and **React Query**.  
The project includes authentication, role-based access (Admin/User), cart management, and a fully functional Admin Dashboard with CRUD operations.

---

## 🚀 Features

### 👤 Authentication
- JWT-based authentication
- Access & Refresh token handling
- Automatic token refresh with Axios interceptors
- Role-based routing (Admin / User)

### 🛍️ User Side
- Browse products
- Search functionality (Protected)
- Add to Cart
- Cart quantity management
- Protected Cart access

### 🛠️ Admin Panel
- Dashboard
- Manage Recipes (CRUD)
  - Add Recipe
  - Edit Recipe
  - Delete Recipe
- Optimistic UI Updates
- Pagination support

### ⚡ Advanced Features
- React Query caching
- Optimistic updates
- Token refresh flow
- Global state management with Redux Toolkit
- Responsive design (Mobile + Desktop)
- Modular feature-based folder structure

---

##  Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Redux Toolkit
- React Query
- Formik + Yup
- Lucide Icons

### Backend API
- DummyJSON API (for products & auth)

---

##  Architecture Overview
src/
├── app/
├── features/
│ ├── auth/
│ ├── admin/
│ ├── cart/
├── components/
├── store/
├── lib/


### Key Architectural Decisions:
- Axios instance with request & response interceptors
- Centralized API layer
- Role-based conditional rendering
- Optimistic updates for instant UI feedback
- Query invalidation for data sync

---

## 🔐 Authentication Flow

1. User logs in
2. Access & Refresh tokens stored in Redux
3. Axios interceptor attaches token automatically
4. If access token expires → auto refresh using refresh token
5. If refresh fails → user is logged out

---

## 📊 Admin CRUD Strategy

- React Query `useMutation`
- Optimistic update using `onMutate`
- Rollback on error
- Cache sync using `setQueriesData`

---

## 📱 Responsive Design

- Fully responsive layout
- Desktop navigation
- Mobile hamburger menu
- Adaptive search bar
- Clean UI across all breakpoints

---

## 🎯 Key Learnings

- Real-world token refresh handling
- Optimistic UI patterns
- Managing global state vs server state
- Scalable project architecture
- Debugging network & API errors
- Role-based rendering strategies

---

## 👩‍💻 Author

**Aditi Kesharwani**  
Frontend Developer | React | Next.js | TypeScript  

---

## 📄 License

This project is for educational and portfolio purposes.


This project follows a **feature-based modular architecture**:

