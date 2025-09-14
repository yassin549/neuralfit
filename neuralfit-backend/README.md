# NeuralFit - Backend

This is the backend for the NeuralFit project, a starter scaffold built with Next.js. It includes a comprehensive set of features to kickstart a modern web application.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [Supabase](https://supabase.com/) (Postgres)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **AI**: Proxy to a [Hugging Face](https://huggingface.co/) inference endpoint
- **Video**: [Daily.co](https://www.daily.co/) for video room creation

## Prerequisites

Before you begin, ensure you have the following installed and set up:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- A [Supabase](https://supabase.com/) project
- A [Google Cloud](https://console.cloud.google.com/) project for OAuth credentials
- A [Daily.co](https://www.daily.co/) account and API key
- A [Hugging Face](https://huggingface.co/) account and API key

## Getting Started

Follow these steps to get the development server running locally.

### 1. Install Dependencies

Clone the repository and navigate into the `neuralfit-backend` directory. Then, install the project dependencies using pnpm:

```bash
pnpm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root of the `neuralfit-backend` directory by copying the `.env.example` file (if it exists) or creating a new one. Populate it with your credentials.

```env
# App & Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET= # Generate a secret: https://generate-secret.vercel.app/32

# Supabase & Database
SUPABASE_URL= # Your Supabase project URL
SUPABASE_ANON_KEY= # Your Supabase anon key
SUPABASE_SERVICE_ROLE_KEY= # Your Supabase service role key
DATABASE_URL= # Your Supabase DIRECT DATABASE URL (for migrations)

# Google Auth Provider
GOOGLE_CLIENT_ID= # Your Google OAuth client ID
GOOGLE_CLIENT_SECRET= # Your Google OAuth client secret

# Daily.co for Video Rooms
DAILY_API_KEY= # Your Daily.co API key

# Hugging Face for AI Model
HF_API_KEY= # Your Hugging Face API key
HF_MODEL_ENDPOINT= # Your Hugging Face model inference endpoint
```

**Important**: For the `DATABASE_URL`, make sure you use the **direct connection string** from your Supabase dashboard (Settings > Database), as this is required for Prisma migrations.

### 3. Run Database Migrations

Once your `.env` file is configured, run the Prisma migration command to set up your database schema:

```bash
npx prisma migrate dev
```

This will sync your Supabase database with the schema defined in `prisma/schema.prisma`.

### 4. Run the Development Server

Now, you can start the Next.js development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application. The page will auto-update as you edit the files.

## Deployment

This application is ready to be deployed on [Vercel](https://vercel.com/). Ensure you set up all the environment variables from your `.env` file in your Vercel project settings before deploying.
