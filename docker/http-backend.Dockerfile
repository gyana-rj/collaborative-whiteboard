FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY ./pnpm-lock.yaml ./pnpm-lock.yaml

COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml

COPY ./package.json ./package.json

COPY ./turbo.json ./turbo.json

COPY ./apps/http-backend ./apps/http-backend

COPY ./packages ./packages

RUN pnpm install --filter http-backend...

RUN pnpm --filter http-backend build

EXPOSE 3001

ENV PORT=3001

CMD [ "pnpm", "run", "start:http-backend" ]
