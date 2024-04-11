# Next.js application with Neon Postgres and Auth0 authentication

This is a Next.js application that uses Neon Postgres as the database and Auth0 for user authentication. It allows users to log in, save their favorite quote, and view or delete it later.

## Prerequisites

To run this project, you will need:

- A [Neon](https://neon.tech) account and a project with a Postgres database
- An [Auth0](https://auth0.com/) account and an application set up for authentication
- Node.js and npm installed on your machine

## Set up locally

1. Clone this repository.

```bash
git clone https://github.com/yourusername/guide-neon-next-auth0
```

2. Navigate to the project directory and install the dependencies.

```bash
cd guide-neon-next-auth0
npm install
```

3. Create a `.env.local` file in the root of the project and add the following environment variables:

```bash
DATABASE_URL=your_neon_database_url
AUTH0_SECRET=your_auth0_secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your_auth0_domain
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
```

Replace the placeholders with your actual Neon database URL and Auth0 configuration values.

4. Run the database migrations using Drizzle.

```bash
npx drizzle-kit push:pg
```

5. Start the development server.

```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:3000`. You should see the application running.

## Usage

- Click on the "Log in" button to authenticate with Auth0.
- Once logged in, you can enter your favorite quote in the text field and click "Save Message" to store it in the database.
- The saved quote will be displayed on the page. You can delete it by clicking the "Delete Quote" button.