# Этап сборки
FROM node:20-alpine AS builder

# Устанавливаем системные зависимости
RUN apk add --no-cache python3 make g++

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Этап продакшн
FROM node:20-alpine AS runner

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только необходимые файлы из этапа сборки
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/package.json /app/package.json

# Устанавливаем только production зависимости
RUN npm install --production --legacy-peer-deps

# Открываем порт
EXPOSE 3000

# Устанавливаем переменные окружения
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Запускаем приложение
CMD ["node", ".output/server/index.mjs"] 