# 💰 Finance App - Manage Your Finances with Intelligence

This repository contains a **financial management application** where you can add transactions, track your balance, and, by subscribing to a plan, receive AI-powered smart tips to improve your financial health.

🔗 **Access the production project:** [Financial App](https://financial-app-delta.vercel.app/login)

---

## 📌 Features

✅ **Add transactions** (income and expenses) and track your balance in real time.\
✅ **Modern and responsive interface** built with React and Tailwind CSS.\
✅ **Efficient database** using Prisma.\
✅ **Secure authentication** with Clerk.\
✅ **Premium plan** via Stripe to unlock AI-based financial tips.

---

## 🛠️ Technologies Used

- **React** + **TypeScript** - Interactive interface and strong typing.
- **Prisma** - Database management and querying.
- **Tailwind CSS** - Modern and responsive styling.
- **Clerk** - User authentication.
- **Stripe** - Premium payments and subscriptions.

---

## 🚀 How to Run the Project

### **1. Clone the repository**

```bash
git clone https://github.com/leticiamantovani/financial-app.git
cd financial-app
```

### **2. Install dependencies**

```bash
npm install
```

### **3. Configure environment variables**

Create a **.env** file in the root directory and add:

```env
DATABASE_URL=your_database_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret
```

### **4. Run the application**

```bash
npm run dev
```

Access [**http://localhost:3000**](http://localhost:3000) in your browser.

---

## 🛠️ Pending Improvements

- Responsiveness for smaller devices.

---

## 🖼️ Screenshots

**Login and Sign In:**
![alt text](image.png)

**Dashboard:**
![alt text](image-1.png)

**Transactions:**
![alt text](image-2.png)

**Plans:**
![alt text](image-3.png)

---

## 📜 License

This project is licensed under the **MIT** license. Feel free to use and contribute! 😊

