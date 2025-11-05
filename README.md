# MERN Enquiry CRUD

A simple MERN stack project to manage user enquiries with full **CRUD functionality**. This project demonstrates a practical setup of **MongoDB, Express, React, and Node.js**, integrated with **axios**, **Flowbite-React**, and **Tailwind CSS** for the frontend.

---

## Features

- Add new enquiries (Create)  
- View all enquiries (Read)  
- Update existing enquiries (Update)  
- Delete enquiries (Delete)  
- Responsive frontend with Tailwind CSS and Flowbite  
- Toast notifications for actions  

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Flowbite-React, Axios  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **Environment Variables:** `.env` for backend (DB connection, PORT) and frontend (`VITE_API_URL`)  

---

## Setup Instructions

```bash
1. **Clone the repo**
git clone <your-repo-url>
cd <repo-folder>

2. **Backend Setup**
cd server
npm install
cp .env.example .env   # add your MongoDB URI and PORT
node index.js 

3. **Frontend Setup**
cd ../client
npm install
cp .env.example .env   # set VITE_API_URL to backend URL
npm run dev
