## Manual Installation
 - Intall node.js locally in your machine
 - clone the repo
    - `git clone https://github.com/gyana-rj/collaborative-whiteboard.git`
    - cd collaborative-whiteboard
 - pnpm install
 - Start the db locally
    - `docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres`
    - Go to neon.tech or supabase and get ypurself a new DB
 - Create and upadte your .env file with the db credentials
 - npx prisma migrate dev
 - npx prisma generate 
 - pnpm run build
 - pnpm run start

## Docker Installation
 - Install docker locally on your machine 
 - Create a network `docker network create user_project`
 - Start postgres ` docker run --network user_project --name postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres`
 - Run migration locally (to create table in the new database)
    - `npx prisma migrate dev --name init`
 - Build the image `docker build -t user-project:v1.1 .`
 - Start the application container `docker run -e DATABASE_URL=postgresql://postgres:mysecretpassword@postgres:5432/postgres --network user_project -p 3000:3000 user-project:v1.1`


## Docker compose Installtion
 - Install docker and docker compose 
 - Run `docker-compose up --build`