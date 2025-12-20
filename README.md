# 🌌 Soul Sync  

![Hackathon](https://img.shields.io/badge/Hackathon-COSMO%20HACK%201-purple)

### *Where your feelings find a voice*

Soul Sync is an **AI-powered emotional wellness companion** built during **COSMO 1 HACK 1 (AI/ML Track)**.  
It helps users express emotions safely, track emotional state changes over time, and gently encourages real human support when emotional distress is detected.

> ⚠️ Soul Sync is **not a medical or therapeutic service**.  
> It provides **supportive, non-clinical guidance only**.

---

##  Problem Statement

**Tracking Emotional State Changes Using AI-Assistant Dialogue Analysis**

Many individuals—especially students—struggle to express emotions due to stigma or lack of safe spaces. Soul Sync addresses this by providing a private, judgment-free AI companion that listens, summarizes emotions, and highlights patterns without storing sensitive raw data.

---



##  Key Features

- 💬 Safe AI-powered emotional conversations  
- 📊 Emotional trend tracking using summaries  
- 🚨 Hybrid distress detection (rules + AI scoring)  
- 🔐 Privacy-first design (no raw chat storage)  
- 👥 Trusted-contact alert system (demo mode)  
- 📈 User dashboard for insights & mood trends  

---

##  Tech Stack

### 🔹 Frontend
- React.js  
- HTML5  
- CSS3  
- JavaScript (ES6+)  
- Tailwind CSS  

### 🔹 Backend & API
- Node.js  
- Express.js  

### 🔹 AI / ML
- Google **Gemini API** (conversation & summarization)
- Hybrid distress detection:
  - Rule-based keyword logic  
  - AI emotional scoring (0–100)

### 🔹 Database & Auth
- Firebase Firestore (NoSQL)
- Firebase Authentication (Google OAuth)

### 🔹 Privacy & Security
- Summary-based memory (no raw emotional chats stored)
- User-controlled data deletion
- Demo-only alert system
- No medical advice or diagnosis

---

## Project Structure
```bash
AI-ML-cosmo/
├── Client/           # React app
│   ├── src/
│   │   ├── components/ (Nav, Hero, Button, etc.)
│   │   ├── Pages/Chat.jsx
│   │   ├── Light.jsx, Cursor.jsx, App.jsx
│   └── package.json
├── Server/           # Express + Gemini
│   ├── index.js
│   └── package.json
├── LICENSE
└── README.md

```
---

## Prerequisites
- Node.js 18+ (recommended)
- Google Generative AI API key with access to the gemini-2.5-flash model

## Setup
### 1) Backend (Server)
1. `cd Server`
2. `npm install`
3. Create a `.env` file:
	```
	KEY=your_google_api_key
	PORT=8000            # optional; defaults to 8000
	```
4. Start the server:
	- `npm run start` (uses nodemon; install it if missing: `npm install -g nodemon`), or
	- `node index.js`

### 2) Frontend (Client)
1. `cd Client`
2. `npm install`
3. `npm run dev`
4. Open the Vite dev URL (defaults to http://localhost:5173).

## Configuration Notes
- The chat page posts to `http://localhost:8000/ask`. If you change the backend port or host, update the axios URL in `Client/src/Pages/Chat.jsx`.
- Ensure the backend is running before opening the chat UI.

## API
- `POST /ask`
  - Body: `{ "question": "How can I stay calm before an exam?" }`
  - Success response: `{ "_status": true, "finalData": "...model reply..." }`
  - Crisis phrases (e.g., "suicide", "self harm") return hotline guidance instead of calling the model.

## Development
- Lint frontend: `cd Client && npm run lint`
- Build frontend: `cd Client && npm run build`

## Safety Disclaimer
This app is a supportive companion, not a therapist or medical professional. It does not provide diagnoses or emergency services. For urgent needs, contact local emergency numbers or crisis lines immediately.

---
## 📸 Demo & Screenshots
- ##### 🖼️ Application Screenshots
![Login Screen](README/Application%20Screenshots.jpg)

- #####	 AI Chat Interface
![Login Screen](README/AI%20Chat%20Interface.jpg)

---
## 👥 Contributors (Cosmic Hackers Team)

<table>
  <tr>
	 <td align="center">
    <a href="https://github.com/ienvyJK">
      <img src="https://avatars.githubusercontent.com/u/232658414?v=4" width="100"><br>
      <b>Joyjit Karmakar</b></a><br>
      Team Leader
    </td>
    <td align="center">
      <a href="https://github.com/Swarajroy2006">
        <img src="https://avatars.githubusercontent.com/u/97305683?v=4" width="100"><br>
        <b>Swaraj Roy</b>
      </a><br>
      Team Member
    </td>
    <td align="center">
      <a href="https://github.com/Saptanshu05-07/">
        <img src="https://avatars.githubusercontent.com/u/216073437?v=4" width="100"><br>
        <b>Saptanshu Roy</b>
      </a><br>
      Team Member
    <td align="center">
      <a href="https://github.com/anik2OO5">
      <img src="https://avatars.githubusercontent.com/u/179361788?v=4" width="100"><br>
      <b>Anik Bhaumik</b> </a><br>
      Team Member
    </td>
  </tr>
</table>

---

## 📂 Installation & Setup

```bash
git clone https://github.com/your-repo/soul-sync.git
cd soul-sync
npm install
npm start
```

---
## 📄 License

- This project is licensed under the MIT License.

- ![License](https://img.shields.io/badge/License-MIT-success)

---
## ❤️ Final Note

>  Soul Sync focuses on emotional awareness, privacy, and ethical AI, encouraging users to seek real human connection when it matters most.