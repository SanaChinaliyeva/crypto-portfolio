# Crypto Portfolio Tracker

A modern cryptocurrency portfolio tracking application built with Next.js and NestJS.

## Features

- Track your cryptocurrency holdings
- Real-time price updates from CoinGecko API
- Portfolio visualization with Chart.js
- Total value calculation
- Profit/Loss tracking
- PostgreSQL database for data persistence

## Tech Stack

### Frontend
- Next.js
- Chart.js
- TailwindCSS
- TypeScript

### Backend
- NestJS
- PostgreSQL
- TypeORM
- CoinGecko API

## Project Structure

```
apps/
  ├── web/          # Next.js frontend application
  └── api/          # NestJS backend application
packages/
  └── shared/       # Shared types and utilities
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Fill in the required environment variables

3. Start development servers:
   ```bash
   npm run dev
   ```

## Development

- Frontend: http://localhost:3000
- Backend: http://localhost:3001