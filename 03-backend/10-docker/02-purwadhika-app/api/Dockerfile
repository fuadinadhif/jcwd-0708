FROM node:lts-jod

WORKDIR /src

COPY package*.json .
RUN npm install

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "dev"]