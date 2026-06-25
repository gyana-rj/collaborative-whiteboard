FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY ./pnpm-lock.yaml ./pnpm-lock.yaml

COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml

COPY ./turbo.json ./turbo.json

COPY ./package.json ./package.json

COPY ./apps/ws-backend ./apps/ws-backend

COPY ./packages ./packages

RUN pnpm install --filter ws-backend...

RUN pnpm --filter ws-backend build

EXPOSE 8080

ENV PORT=8080

CMD [ "pnpm", "run", "start:ws-backend" ]