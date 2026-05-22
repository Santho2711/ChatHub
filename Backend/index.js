const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const { chats } = require("./mockdata");
const db = require("./config/db");
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const server = http.createServer(app);

db();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_ORIGIN || "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

const protect = require("./middleware/protect");

app.use("/auth", require("./routes/authentication"));
app.use("/api/auth", require("./routes/authentication"));
app.use("/api/users", protect, require("./routes/userRoutes"));
app.use("/api/chats", protect, require("./routes/chatRoutes"));
app.use("/api/messages", protect, require("./routes/messageRoutes"));

app.set("io", null);

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html")),
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});
app.set("io", io);

const verifySocketToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "ChatHubSecret");
  } catch (error) {
    return null;
  }
};

io.on("connection", (socket) => {
  const token = socket.handshake.auth?.token || socket.handshake.query?.token;
  const decoded = verifySocketToken(token);
  if (decoded?.id) {
    socket.userId = decoded.id;
    socket.join(decoded.id);
  }

  socket.on("setup", ({ userId }) => {
    if (userId) {
      socket.join(userId);
    }
  });

  socket.on("join-chat", ({ chatId }) => {
    if (chatId) {
      socket.join(chatId);
    }
  });

  socket.on("leave-chat", ({ chatId }) => {
    if (chatId) {
      socket.leave(chatId);
    }
  });

  socket.on("typing", ({ chatId, senderId, isTyping }) => {
    if (!chatId) return;
    socket.to(chatId).emit("typing", { chatId, senderId, isTyping });
  });

  socket.on("disconnect", () => {});
});

app.get("/users", protect, (req, res) => {
  res.json({ message: chats, user: req.user });
});
app.get("/users/:id", protect, (req, res) => {
  const chat = chats.find((c) => c._id === req.params.id);
  if (!chat) {
    return res.status(404).json({ message: "Chat not found" });
  }
  res.json({ message: chat, user: req.user });
});

server.listen(port, () => {
  console.log(`Server connected on ${port}`);
});
