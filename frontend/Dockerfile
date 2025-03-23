FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --platform=linux --arch=x64

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]