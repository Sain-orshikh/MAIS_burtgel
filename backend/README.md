# MAIS Registration System Backend

## Setup

1. Install dependencies:
   \\\ash
   pnpm install
   \\\

2. Create \.env\ file:
   \\\ash
   cp .env.example .env
   \\\

3. Update environment variables in \.env\

4. Start development server:
   \\\ash
   pnpm dev
   \\\

## Scripts

- \pnpm dev\: Start development server
- \pnpm build\: Build for production
- \pnpm start\: Start production server
- \pnpm lint\: Run linter
- \pnpm format\: Format code

## API Endpoints

### Registration

- POST /api/registration/register
- GET /api/registration/registrations
- GET /api/registration/registrations/:id
- PATCH /api/registration/registrations/:id/status

### Admin

- POST /api/admin/login
- POST /api/admin/register
- GET /api/admin/profile

## Environment Variables

See \.env.example\ for required environment variables.
