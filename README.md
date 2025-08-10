# AIF Task Management 🎯

**Task Management** is the process of planning, organizing, tracking, and completing tasks efficiently to achieve specific goals.

---

## 🛠 Tech Stack

### Task website

- **React (Vite)**: A fast, modern build tool combined with React for fast development and HMR (Hot Module Replacement).
- **TailwindCSS**: Utility-first CSS framework for designing consistent, responsive UI.
- **shadcn/ui**: A pre-built component library based on TailwindCSS and Radix UI primitives for rapid UI development.

## 📁 Project Structure

```bash
task-aif/
├── src/
│   ├── assets/               # Assets files such as images
│   ├── components/           # Resuable components
│   ├── constatns/            # Resuable constants
│   ├── hooks/                # Custom hooks
│   ├── models/               # models for DTO
│   ├── lib/                  # config lib and usable functions
│   ├── services/             # Service for connect to API
│   ├── App.tsx/              # App.ts
├── main.tsx                  # root file
├── vite.config.ts            # Vite configuration file
├── .gitignore
└── README.md                  # Project documentation

---

## 🚀 Getting Started

### Step 1: Clone the repository

```bash
git clone https://github.com/saiyasone/task-aif.git
cd task-aif
```

### Step 2: Install dependencies

```bash
npm install
```

## 🔧 Common Scripts

| Command                   | Description                                       |
| ------------------------- | ------------------------------------------------- |
| `npm run dev`             | Run the frontend in development mode              |
| `npm run build`           | Build the frontend project                        |  
| `npm run preview`         | Preview website after build                       |
| `npm run ui:add`          | Add ui from shadcn ui                             |

## 📄 License

This project is licensed under the **MIT License**. You are free to use, modify, and distribute with proper attribution.