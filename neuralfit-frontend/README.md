# NeuralFit Frontend

This is the frontend for the NeuralFit application, built with Next.js and Tailwind CSS.

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Next, create a `.env.local` file in the root of this project by copying the example file:

```bash
cp .env.example .env.local
```

Now, fill in the required environment variables in your new `.env.local` file. You will need your Supabase URL and Anon Key.

Finally, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Managing Landing Page Content

All the text content for the new landing page is managed in a single JSON file to make updates easy.

To change the copy on the landing page, simply edit the file at:
`data/landing-content.json`

The page will automatically update with your changes.
