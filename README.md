# ChatHub 💬

ChatHub is a real-time chat application built over a focused **2-week sprint**. The project was designed as a deep-dive hands-on learning experience to master real-time bidirectional communication, modern authentication, and to explore the workflows of building an entire user interface using generative AI coding models.

## 🚀 Overview & The 2-Week Journey

This project was built from scratch in exactly two weeks. The primary goal was to step out of the comfort zone and explore unfamiliar architectures—specifically learning how persistent bidirectional connections handle state updates compared to traditional REST APIs. 

* **Week 1: Architecture & Real-Time Exploration** Spent time deeply understanding full-duplex communication protocols. Configured the backend server, established robust WebSocket handshakes, and mapped out how active connections are tracked, stored, and managed when user events trigger.
* **Week 2: Secure Authentication & AI-Driven Frontend** Implemented secure token-based authentication flows. The entire frontend user interface was rapidly scaffolded, styled, and optimized by leveraging **AI Codex / LLM pairing**, allowing for rapid prototyping of UI components while focusing core engineering efforts on state synchronization and security.

---

## 🛠️ Tech Stack

### Backend
* **Node.js & Express**: Fast, unopinionated minimalist web framework for the API routing layer.
* **WebSockets (WS / Socket.io)**: Used to handle persistent, low-latency, real-time communication channel for instant message delivery.
* **JSON Web Tokens (JWT)**: Secure, stateless user authentication and session management.

### Frontend
* **HTML5 / CSS3 / JavaScript** *(or specify React/Next.js if applicable)*: The entire frontend presentation layer and UI components were built entirely using **AI Codex**, prompting clean layouts and fast UI iterations.

---

## ✨ Key Functionalities

* **Real-Time Bi-directional Messaging**: Instant message delivery and receipt utilizing WebSockets instead of resource-heavy HTTP polling.
* **Secure JWT Authentication**: 
    * Protected API endpoints and WebSocket connection upgrades.
    * Stateless user sessions token-stored securely on the client side.
* **AI-Scaffolded User Interface**: High-fidelity UI layouts constructed entirely via AI generation, demonstrating rapid prototyping capabilities.
* **Connection State Management**: Handles real-time active user states, connection drops, and reconnects gracefully.

---

## 🧠 What I Explored & Learned

Building ChatHub provided several technical breakthroughs and deep-dives into modern web architecture:

1.  **The WebSocket Handshake**: Learned how an HTTP connection upgrades to a persistent TCP protocol and how to handle authorization headers during that critical upgrade phase.
2.  **State Sync vs. REST**: Navigating the paradigm shift from standard "Request-Response" cycles to an event-driven lifecycle where the server can push updates to the client autonomously.
3.  **Prompt Engineering for UI**: Discovering how to effectively guide AI code generation tools to produce accessible, responsive, and predictable UI code blocks without manual boilerplate writing.

---
