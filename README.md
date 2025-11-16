🌐 Dynamic Name Form
A Fastify-powered full-stack app with a dynamic frontend form


📝 About the Project

Dynamic Name Form is a lightweight full-stack JavaScript project that lets users submit names through a web form.
The backend (Fastify) stores submitted names in memory and exposes API endpoints to fetch and update the list. The frontend dynamically updates using Fetch API.

This project demonstrates:

A clean Fastify REST API

Serving a static frontend from Fastify

Form submission using Fetch API

Dynamic DOM rendering

Lightweight full-stack architecture (HTML + CSS + JS + Fastify)

Perfect for learning backend + frontend integration.

✨ Features

🧩 Fastify API with GET & POST routes

🔄 Dynamic frontend list updates

⚡ Fetch API for sending/receiving data

🎨 Clean & modern UI

📦 Simple folder structure

🌍 Runs locally or on Replit

📁 Folder Structure
project/
│
├── server.js                # Fastify server + API routes
├── package.json             # Project metadata & dependencies
├── .replit                  # Run config (for Replit)
│
└── public/
      ├── index.html         # Frontend UI
      ├── index.css          # Styling
      └── index.js           # Fetch API + DOM logic

🚀 Live Demo (optional)

You can host this on:

Replit

Render

Vercel (Node Server)

Railway

If you deploy it and want me to add your live link, tell me!

⚙️ Installation
1️⃣ Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

2️⃣ Install dependencies
npm install

3️⃣ Start the server
npm start

4️⃣ Open the app

Visit:

http://localhost:3000


🎉 That’s it!

🔌 API Documentation
GET /names

Fetch all submitted names.

Response Example:

["divyansh", "kinjal", "john"]

POST /names

Submit a name.

Request Body:

{
  "name": "divyansh"
}


Response:

{
  "success": true,
  "message": "Name added"
}

🛠 Tech Stack
Component	Technology
Backend	Fastify (Node.js)
Frontend	HTML, CSS, JavaScript
API	      Fetch API
Hosting	Replit / Localhost
