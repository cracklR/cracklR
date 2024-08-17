# CracklR

Coming soon - the work has just begun!

## Database setup

1. Start the postgres instance by running `docker-compose up -d`
2. Copy the .env.example file and rename it to .env (can keep the exact same values for dev environment)
3. Run `npx prisma generate` to generate the Prisma Client
4. Run `npx prisma db push` to generate the database tables
5. Done!
