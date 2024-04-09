FROM node:18

WORKDIR /app

COPY . .

RUN yarn 

RUN npx prisma generate

CMD ["npm","run", "start:migrate:prod"]