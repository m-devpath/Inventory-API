# Inventory Management API

A REST API for managing products and categories, with user authentication.
Built with Node.js, Express, PostgreSQL, and Prisma.

## Features
- User registration & login (JWT authentication)
- Full CRUD for products and categories
- Each user owns their own products and categories (multi-tenant pattern)
- Products can be linked to categories via foreign key

## Tech Stack
- Node.js / Express
- PostgreSQL / Prisma ORM
- JWT for authentication
- bcryptjs for password hashing

## Getting Started

### Prerequisites
- Node.js installed
- PostgreSQL installed and running

### Installation
1. Clone the repo
   \`\`\`
   git clone https://github.com/m-devpath/Inventory-API
   cd Inventory-API
   \`\`\`
2. Install dependencies
   \`\`\`
   npm install
   \`\`\`
3. Create a `.env` file (see `.env.example` for required variables)
4. Run migrations
   \`\`\`
   npx prisma migrate dev
   \`\`\`
5. Start the server
   \`\`\`
   npm run dev
   \`\`\`

## API Endpoints

### Auth
| Method | Endpoint           | Auth Required | Description          |
|--------|---------------------|---------------|-----------------------|
| POST   | /api/auth/register  | No            | Register a new user   |
| POST   | /api/auth/login     | No            | Log in                |

### Products
| Method | Endpoint              | Auth Required | Description           |
|--------|------------------------|---------------|-------------------------|
| POST   | /api/products          | Yes           | Create a product       |
| GET    | /api/products          | Yes           | Get your products      |
| GET    | /api/products/:id      | Yes           | Get one product        |
| PUT    | /api/products/:id      | Yes           | Update a product       |
| DELETE | /api/products/:id      | Yes           | Delete a product       |

### Categories
| Method | Endpoint                | Auth Required | Description            |
|--------|---------------------------|---------------|---------------------------|
| POST   | /api/categories          | Yes           | Create a category       |
| GET    | /api/categories          | Yes           | Get your categories     |
| GET    | /api/categories/:id      | Yes           | Get one category        |
| PUT    | /api/categories/:id      | Yes           | Update a category       |
| DELETE | /api/categories/:id      | Yes           | Delete a category       |
