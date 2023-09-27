# Используем официальный образ Node.js
FROM node:16.17.0

# Создаем и устанавливаем директорию приложения
WORKDIR /app

# Копируем зависимости и файлы приложения
COPY package*.json .
RUN npm install
COPY . .

# Открываем порт для Nest.js приложения
EXPOSE 3001

# Запускаем приложение
CMD npm run start
