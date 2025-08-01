import express from "express";
import routes from "./routes";
import { handleStreaming } from "./speechHandler";

const app = express();
const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// WebSocket server for real-time audio streams
import WebSocket, { Server } from "ws";
const wss = new Server({ server, path: "/ws" });
wss.on("connection", ws => {
  handleStreaming(ws);
});

app.use(express.json());
app.use("/api", routes);
