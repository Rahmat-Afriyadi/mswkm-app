# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build


EXPOSE 3002
CMD ["npm", "start"]
