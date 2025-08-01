# ---------- FRONTEND BUILD STAGE ----------
FROM node:18-alpine as frontend

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# ---------- BACKEND BUILD STAGE ----------
FROM node:18-alpine as backend

WORKDIR /app
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy backend and built frontend into final image
COPY backend ./backend
COPY --from=frontend /app/frontend/build ./backend/public

# ---------- FINAL STAGE ----------
WORKDIR /app/backend
EXPOSE 5000

# Set environment variables if needed
ENV NODE_ENV production

CMD [ "npm", "start" ]
