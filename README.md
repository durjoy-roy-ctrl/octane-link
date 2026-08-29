# OctaneLink

A fuel buy/sell marketplace platform — connecting fuel sellers with retail
and wholesale buyers, built as a course project for **CSE2200**.

OctaneLink lets retail customers browse and buy fuel through a simple
cart & checkout flow, while wholesale buyers can request bulk quotes
with credit terms and receive auto-generated invoices.

---

## ✨ Features

- **Authentication** — role-based signup (Retail / Wholesale / Delivery
  Agent), login, and password recovery
- **Product Catalog & Inventory** — browse petrol, diesel, mobil, and
  engine oil by brand, grade, and vehicle type, with live stock levels
- **Order Management**
  - Retail: cart-based checkout
  - Wholesale: bulk quote request with credit terms (Net 7/15/30 days)
- **Payments & Invoicing**
  - Retail: bKash, Nagad, Card, Cash on Delivery
  - Wholesale: auto-generated invoice with due date
- **Delivery System**
  - Retail: live bike courier tracking
  - Wholesale: scheduled tanker/truck delivery with route preview
- **Admin Dashboard** — manage stations, inventory, fleet, and users
- **Analytics** — demand trends and station performance charts
- **Notifications** — order updates and low-stock alerts

---

## 🛠 Tech Stack

**Frontend**
- React (Vite)
- React Router

**Backend**
- Node.js + Express
- MongoDB (Mongoose)
- JWT authentication
- bcrypt for password hashing

---

## 🚀 Getting Started

This project has two parts — a **frontend** and a **backend** — that
need to run at the same time in two separate terminals.

### 1. Backend setup

```bash
cd Octane-Link-Backend
npm install
cp .env.example .env
```

Open `.env` and fill in your own values:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=any_long_random_string
```

Then start the server:
```bash
npm run dev
```
You should see:
```
MongoDB connected successfully
Server running on http://localhost:5000
```

### 2. Frontend setup

In a **new terminal**:
```bash
cd Octane-Link
npm install
npm run dev
```
Open the link shown in the terminal (usually `http://localhost:5173`).

---

## 📁 Project Structure

```
octane-link/
├── Octane-Link/              → React frontend
│   └── src/
│       ├── components/       → Navbar, Footer, etc.
│       ├── Pages/            → one file per page
│       └── App.jsx           → routes + shared state
│
└── Octane-Link-Backend/      → Node/Express backend
    ├── config/                → database connection
    ├── controllers/           → route logic (signup, login, etc.)
    ├── models/                → MongoDB schemas
    └── routes/                → API endpoints
```

---

## 👥 Team

| Member | Responsibilities |
|---|---|
| **Rafi** | Authentication, Delivery System |
| **Amdad** | Product Catalog, Analytics, Admin Dashboard, Notifications |
| **Durjoy** | Order Management, Payments & Invoicing |

---

## 📌 Status

This is an active course project (CSE2200). Authentication (signup/login)
is connected to a real MongoDB backend. Other features are currently
frontend demos and will be connected to the backend in later checkpoints.
