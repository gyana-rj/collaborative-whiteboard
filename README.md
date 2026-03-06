# CNVS - Real-Time Collaborative Whiteboard

CNVS is a full-stack, real-time collaborative whiteboard application. It allows multiple users to join dedicated rooms, draw simultaneously, and see each other's updates instantly. 

Built with a modern, scalable monorepo architecture using Turborepo, this project features a Next.js frontend, an Express REST API, a dedicated WebSocket server, and a Postgres database to persist drawings.

## ✨ Features

* **Real-Time Collaboration:** Instantly see drawings from other users in the same room using WebSockets.
* **Persistent Rooms:** All shapes and drawings are saved to a database, allowing users to leave and return without losing their work.
* **Rich Drawing Tools:** * ✏️ Freehand Pencil
  * 🧽 Eraser
  * ⬛ Rectangles
  * ⭕ Circles
  * ➡️ Directional Arrows
  * 📝 Text Tool
* **User Authentication:** Secure Sign-up/Sign-in flow using JWT.
* **Scalable Monorepo:** Clean separation of concerns between frontend, HTTP APIs, WebSocket servers, and database schemas.

## 🛠️ Tech Stack

* **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, HTML5 Canvas API.
* **Backend (HTTP):** Node.js, Express.js, JWT Authentication.
* **Backend (WebSockets):** Node.js, `ws` library for real-time bidirectional communication.
* **Database:** PostgreSQL, Prisma ORM.
* **Architecture:** Turborepo (Monorepo), PNPM Workspaces.

## 📂 Project Structure

This project is organized as a Turborepo monorepo:

```text
├── apps
│   ├── collaborative-board-frontend # The Next.js web application
│   ├── http-backend                 # Express API for Auth and Room data
│   └── ws-backend                   # WebSocket server for real-time syncing
├── packages
│   ├── backend-common               # Shared configurations and utilities
│   ├── common                       # Shared TypeScript interfaces (Zod schemas)
│   ├── db                           # Prisma schema and database client
│   └── ui                           # Shared React UI components