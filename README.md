
# Todolist Back-End

This is the back-end codebase of the Todolist app. If you would like to view or run the front-end, look [here](https://github.com/amanryder/todolist-fe).

## Tech Stack
[NodeJs](https://nodejs.org/en) - 
[ExpressJs](https://expressjs.com/) - 
[Postgres](https://www.postgresql.org/) - 
[Prisma](https://www.google.com/search?channel=fs&client=ubuntu&q=prisma) - 
[Docker](https://www.docker.com/)


## How To run

### Use the docker images
Use the docker-compose file below to directly run the latest images for the front-end and back-end from my [Dockerhub](https://hub.docker.com/u/amanryder) repo.

Create and paste the following code into a `docker-compose.yml` file and from within the same directory, run `docker compose up`

```bash
services:
  todolist-fe:
    image: amanryder/todolist-fe
    container_name: todolist-fe
    depends_on:
      - todolist-be
    ports:
      - 4172:4172
    restart: unless-stopped
  todolist-be:
    image: amanryder/todolist-be
    container_name: todolist-be
    environment:
      - PORT=3000
      - AUTH_AUDIENCE=todolist api
      - ISSUER_BASE_URL=https://dev-l1hhkali.us.auth0.com/
      - TOKEN_SIGNING_ALG=RS256
      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/todolist?schema=public
    depends_on:
      - postgres
    ports:
      - 3000:3000
    restart: unless-stopped
  postgres:
    image: postgres
    container_name: postgres
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    ports:
      - "5432:5432"
    restart: unless-stopped
  pg-admin:
    image: dpage/pgadmin4:6
    container_name: pg-admin
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@email.com
      - PGADMIN_DEFAULT_PASSWORD=admin
      - PGADMIN_LISTEN_PORT=5050
    depends_on:
      - postgres
    ports:
      - "5050:5050"
    restart: unless-stopped
```


