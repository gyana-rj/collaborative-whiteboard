FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY ./pnpm-lock.yaml ./pnpm-lock.yaml

COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml

COPY ./turbo.json ./turbo.json

COPY ./package.json ./package.json

COPY ./apps/collaborative-board-frontend ./apps/collaborative-board-frontend

COPY ./packages ./packages

# This skips the network request to Vercels server
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm install --filter collaborative-board-frontend...

RUN pnpm --filter collaborative-backend-frontend build

EXPOSE 3000

ENV PORT=3000

CMD [ "pnpm", "run", "start:frontend" ]

