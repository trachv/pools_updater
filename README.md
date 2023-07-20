## Pools updater

## Local setup

1. Clone repo
2. Run `npm install` to install dependencies
3. Copy the `.env.example` file over to your own `.env` file and update the variables

## Options to run app

1. Run app directly with command `npm start`.
   In this option you need:

- postgres server with all permissions for the selected db user
- run command to apply all migrations `npx prisma migrate dev`

2. Run app and new postgres server with docker-compose with command `docker-compose up -d`
   In this case 2 containers will be launched:

- service application
- postgresql server
