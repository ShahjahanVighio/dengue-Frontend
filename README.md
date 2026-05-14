[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live-brightgreen?style=for-the-badge&logo=vercel)](https://dengue-frontend-vert.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

DengueAlert PK is an AI-powered diagnostic web application designed to help users assess their risk of Dengue fever. The application provides a seamless, high-performance user experience by leveraging a dedicated Machine Learning backend.

## 🚀 Technical Stack
* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **UI/UX:** [Tailwind CSS](https://tailwindcss.com/) for responsive styling.
* **State Management:** React Functional Components & Hooks (useState, useEffect).
* **Icons:** Lucide-react / FontAwesome for intuitive navigation.
* **Deployment:** Optimized and hosted via **Vercel**.

## ✨ Key Features
* **Step-by-Step Assessment:** Interactive symptom checker UI.
* **Real-time Prediction:** Instant feedback powered by a Scikit-learn model backend.
* **Mobile First:** Fully responsive design for healthcare accessibility on any device.
* **Error Resilience:** Built-in handling for network timeouts and API downtime.

## 🔌 System Architecture
The frontend acts as a client-side interface that consumes a Python-based REST API.

1.  **Input:** User selects binary indicators for fever, headache, joint pain, and bleeding.
2.  **Processing:** Data is formatted into a JSON payload.
3.  **Request:** A `POST` request is dispatched to the Railway-hosted backend.
4.  **Display:** The AI's prediction is parsed and presented with health recommendations.

## 📁 Project Structure
```text
├── app/
│   ├── globals.css      # Tailwind & Global Styles
│   ├── layout.tsx       # Metadata & Root Layout
│   └── page.tsx         # Main Logic & API Fetching
├── public/              # Static Assets (Images/Icons)
├── components/          # Reusable UI Components
└── tailwind.config.ts   # UI Theme Configuration
🛠️ Installation & Setup
To run this project locally, follow these steps:

Clone the repository:

Bash
git clone [https://github.com/ShahjahanVighio/dengue-Frontend.git](https://github.com/ShahjahanVighio/dengue-Frontend.git)
Install dependencies:

Bash
npm install
# or
pnpm install
Run the development server:

Bash
npm run dev
Open http://localhost:3000 in your browser.

🏆 Academic Recognition
This project was developed at Salim Habib University as part of a Semester Project. It highlights the integration of Modern Web Development with Data Science to address public health challenges.

Developer: Shahjahan Vighio

Achievement: 1st Position - All Pakistan FGEI Software Development Competition.

© 2026 Shahjahan Vighio. Distributed under the MIT License.
