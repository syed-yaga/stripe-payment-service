# Stripe Payment API System

A production-ready Payment Microservice built with Node.js, TypeScript, PostgreSQL, and Stripe.

Includes secure payments, webhooks, refunds, analytics, and CI/CD.

##  Features

-  **JWT Authentication** (Secure APIs)
-  **Stripe Payment Integration**
-  **Webhook Handling (Event-driven architecture)**
-  **Refund System**
-  **Idempotency (Prevents duplicate payments)**
-  **Transaction History API**
-  **Analytics Dashboard API**
-  **Dockerized (App + PostgreSQL)**
-  **CI/CD with GitHub Actions**
-  **Unit & API Testing with Jest**


##  Tech Stack

- **Backend:** Node.js, Express, TypeScript  
- **Database:** PostgreSQL + Prisma ORM  
- **Payments:** Stripe API  
- **Authentication:** JWT  
- **Testing:** Jest + Supertest  
- **DevOps:** Docker, Docker Compose, GitHub Actions

## Architecture

Client → API → Stripe → Webhook → Database

- Payments are created via API
- Stripe processes transactions
- Webhooks update payment status in DB


##  Project Structure
```

│
├── .github/
│ └── workflows/
│ └── ci.yml
│
├── prisma/
│ └── schema.prisma
│
├── src/
│ ├── config/
│ │ ├── prisma.ts 
│ │ └── stripe.ts 
│ │
│ ├── controller/
│ │ ├── analytics.controller.ts
│ │ ├── history.controller.ts
│ │ ├── payment.controller.ts
│ │ ├── refund.controller.ts
│ │ └── user.controller.ts
│ │
│ │
│ ├── middleware/
│ │ └── auth.middleware.ts 
│ │
│ │
│ ├── routes/
│ │ ├── payment.route.ts
│ │ └── refund.route.ts
│ │
│ ├── services/
│ │ ├── analytics.service.ts
│ │ ├── history.service.ts
│ │ ├── payment.service.ts
│ │ └── refund.service.ts
│ │
│ ├── test/
│ │ └── app.test.ts 
│ │
│ │
│ ├── webhooks/
│ │ └── stripe.webhook.ts
| |
│ └── server.ts 
│ 
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── jest.config.js
├── package.json
├── package-lock.json
├── tsconfig.json

```

## Getting Started

 ### Clone the Repository
```
git clone https://github.com/your-username/stripe-payment-service.git
```
 ### Setup Environment 
```
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/stripe_payment_db
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
JWT_SECRET=your_jwt_secret
```
### Run with Docker
```
docker-compose up --build
```
### Run Prisma Migrations
```
docker-compose exec app npx prisma migrate deploy
```
### Run Locally (Optional)
```
npm install
npm run dev
```
### API Documentation (Swagger)
Interactive API documentation is available via Swagger UI.

*Access Swagger Docs*

After running the server, open:
```
http://localhost:5000/api-docs
```
### Authentication
Some endpoints require JWT authentication.

 1. Create a user via:
```
POST /api/payments/create-user
```
2. Copy the returned token
3. Click Authorize in Swagger UI
4. Enter token in this format:
```
   YOUR_JWT_TOKEN
```

## API Endpoints

| Method | Endpoint | Description |
|------|------|------|
| POST | /api/payments/create-user | Create user & get token |
| POST | /api/payments/create-payment | Create payment intent |
| POST | /api/payments/refund | Process refund |
| GET | /api/payments/history | Get transaction history |
| GET | /api/payments/analytics | Get payment analytics |
| POST | /webhook | Stripe webhook handler |

## Running Tests
```
npm test
```

## Docker Commands
```
docker-compose up --build
docker-compose down
```

## CI/CD
- Install dependencies
- Generate Prisma client
- Run migrations
- Run tests
- Build project

## Key Concepts Implemented
- Payment lifecycle management  
- Event-driven architecture (webhooks)  
- Idempotent APIs (safe retries)  
- Secure authentication (JWT)  
- Database consistency with Prisma  
- Containerized microservices

## Future Improvements
- Subscription billing system  
- Role-based access control  
- Payment retries & failure recovery  
- API rate limiting  
- Cloud deployment (AWS / Render / Railway)

## Author

**Syed Saqib**
- Email: smsaquib04@gmail.com
- LinkedIn: https://linkedin.com/in/syed-saquib-ab0669271



