# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a dark theme with bright turquoise accents, parallax roadmap, multi-language support (EN/RU/UA), and contact form integrated with n8n webhook for Telegram notifications.

## Features

- **Hero Section**: Animated introduction with photo, name, and greeting
- **Roadmap**: Parallax timeline from present to past showcasing career milestones
- **Skills**: Grid display of technical skills
- **Experience**: Detailed work experience sections
- **Certificates**: Links to certifications
- **Personal**: Interests and location
- **Contact**: Form that sends messages via n8n to Telegram
- **Multi-language**: Switch between English, Russian, and Ukrainian

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (animations & parallax)
- React Hook Form
- Axios

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Configuration

- Update `/data/*.json` files with your information
- Replace placeholder image in `/public/images/`
- Set up n8n webhook URL in `/src/app/api/contact/route.ts`
- Customize colors in `tailwind.config.js`

## Deployment

Deploy to Vercel, Netlify, or your own server. Ensure n8n is running and webhook URL is configured.

## n8n Integration

1. Install n8n on your server
2. Create a workflow: Webhook → Telegram
3. Update the webhook URL in the contact API route

## License

MIT
