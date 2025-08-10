
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* yarn.lock* ./

RUN npm install --frozen-lockfile || yarn install --frozen-lockfile

COPY . .

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host"]
