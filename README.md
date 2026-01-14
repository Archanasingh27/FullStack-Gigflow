**GigFlow – Full Stack MERN Application**

GigFlow is a full‑stack MERN application inspired by freelance marketplaces (Fiverr / Upwork). It supports
real‑time notifications, authentication, role‑based access, gig posting, hiring flow, and dashboards.

**🚀 Features**
**🔐 Authentication**
JWT‑based authentication (cookies)
Login / Register
User (Client / Freelancer)

**💼 Gig System**
Browse gigs
Post a gig (client)
View gig details
Hire freelancer
Dashboard for users
Browse gigs
Post a gig (client)
View gig details
Hire freelancer
Dashboard for users


**📝 Bid System**
Freelancers can place bids on gigs
Each bid includes amount, proposal message, and delivery time
Clients can view all bids on their posted gigs
Client can accept a bid and hire the freelancer
Bid acceptance triggers real-time notification to freelancer

**🤝 Hiring Process**
Client reviews all bids on a gig
Client selects the most suitable bid
System creates a hiring record
Gig status changes to Hired / In Progress
Freelancer is assigned to the gig

**🧭 Navigation**
Conditional Navbar rendering
Logout support

**🧱 Tech Stack**
**Frontend**
React (Vite)
React Router DOM
Tailwind CSS
Axios
Context API
Socket.IO Client
react-hot-toast
lucide-react

**Backend**
Node.js
Express.js
MongoDB + Mongoose
JWT Authentication
Cookie‑Parser
CORS, bcryptjs, dotenv


📁 Project Structure
Frontend ( /frontend )
src/
├── components/
│ ├── Navbar.jsx
│ ├── NotificationBell.jsx
│
├── context/
│ └── AuthContext.jsx
│
├── pages/
│ ├── Home/
│ ├── BidModal.jsx
│ ├── GigCard.jsx
│ ├── HeroSection.jsx
| ├── Home.jsx
│ ├── Login.jsx
│ ├── Register.jsx
│ ├── ManageGig.jsx
│ ├── PostGig.jsx
│ ├── Dashboard.jsx
│
├── api.js
├── socket.js
├── index.css
└── App.jsx

Backend ( /backend )
backend/
├── models/
│ ├── User.js
│ ├── Gig.js
│ └── Bid.js
│
├── routes/
│ ├── auth.routes.js
│ ├── gig.routes.js
│ └── bid.routes.js
│
├── controllers/
│ ├── auth.controller.js
│ ├── gig.controller.js
│ └── bid.controller.js
│├── middleware/
│ ├── auth.js
│
├── config/
│ ├── db.js
│ └── token.js
│
├── app.js
└── server.js

---
## ⚙️ Environment Variables
### Backend (`.env`)
PORT=5000 
MONGODB_URI=your_mongodb_url
ACCESS_TOKEN_SECRET=your_secret_key 
CLIENT_URL=http://localhost:5173

---
## ▶️ Running the Project
### Backend
npm install 
npm start
### Frontend
npm install 
npm run dev

---

## 🔐 Authentication Flow
- Login/Register → JWT issued
- JWT stored in HTTP‑only cookie
- Protected routes check auth middleware
- Logout clears cookie
---
## 🧪 Future Enhancements
- Escrow / payment workflow
- Contract lifecycle (Pending → Completed)
- Review & rating system
- Admin panel
---
## 📚 Learning Outcomes
- MERN authentication
- REST API design
- Bid‑based system implementation
- Clean MVC backend structure
- Scalable full‑stack design
---
## 👩💻 Author
**Archana Singh**
Full‑Stack MERN Developer
