import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { SocketEvent } from '@battleship/shared';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: '0G Battleship Backend' });
});

io.on('connection', (socket) => {
  console.log(`[Socket] Client connected: ${socket.id}`);

  socket.on(SocketEvent.CREATE_MATCH, (payload) => {
    console.log(`[Socket] Create match request from ${socket.id}`, payload);
  });

  socket.on(SocketEvent.JOIN_MATCH, (payload) => {
    console.log(`[Socket] Join match request from ${socket.id}`, payload);
  });

  socket.on('disconnect', () => {
    console.log(`[Socket] Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 0G Battleship server running on port ${PORT}`);
});
