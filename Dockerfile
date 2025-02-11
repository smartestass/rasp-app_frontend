# Этап сборки
FROM node:20 as build-stage

ARG PROJ_DIR=/front

# Создаём директорию
WORKDIR ${PROJ_DIR}

# Копируем package.json и package-lock.json перед установкой зависимостей
COPY package.json package-lock.json ${PROJ_DIR}/

# Обновляем npm перед установкой зависимостей
RUN npm install -g npm

# Устанавливаем зависимости
RUN npm install

# Копируем остальной код после установки зависимостей
COPY . ${PROJ_DIR}/

# Собираем проект
RUN npm run build

# Запускаем сервер
CMD ["npx", "serve", "dist"]