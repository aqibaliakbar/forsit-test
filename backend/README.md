# Forsit E-commerce Backend API

A comprehensive e-commerce dashboard backend API built with Node.js, Express, and MongoDB. This API provides endpoints for managing products, orders, and analytics for an e-commerce dashboard.

## Features

- **Product Management**: CRUD operations for products with inventory tracking
- **Order Management**: Order processing and status tracking
- **Revenue Analytics**: Comprehensive analytics with filtering by date, category, and platform
- **Inventory Management**: Low stock alerts and inventory updates
- **File Upload**: Image upload support for products
- **API Documentation**: Complete Swagger documentation
- **Security**: Rate limiting, CORS, helmet security headers
- **Error Handling**: Comprehensive error handling and validation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Documentation**: Swagger
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer
- **Logging**: Morgan

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js      # MongoDB connection
│   │   └── swagger.js       # Swagger configuration
│   ├── controllers/
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── models/
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   ├── middleware/
│   │   ├── upload.js        # File upload middleware
│   │   └── errorHandler.js  # Error handling
│   ├── utils/
│   │   └── helpers.js       # Utility functions
│   └── server.js            # Main server file
├── uploads/                 # Uploaded files directory
├── env.example              # Environment variables example
└── package.json
```

## Installation

1. **Clone the repository and navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Copy the example environment file and configure it:

   ```bash
   # Copy the example file
   cp env.example .env

   # Edit the .env file with your configuration
   # Make sure to update MONGODB_URI if needed
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Start the server**

   ```bash
   # Development mode with auto-restart
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Products

- `GET /api/products` - Get all products with filtering and pagination
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `PATCH /api/products/:id/inventory` - Update inventory
- `DELETE /api/products/:id` - Delete product (soft delete)
- `GET /api/products/low-stock` - Get low stock products

### Orders

- `GET /api/orders` - Get all orders with filtering
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status
- `GET /api/orders/analytics/revenue` - Get revenue analytics

### Other

- `GET /health` - Health check endpoint
- `GET /api-docs` - Swagger API documentation

## API Documentation

Once the server is running, visit `http://localhost:5000/api-docs` to view the complete Swagger API documentation.

## Environment Variables

| Variable      | Description               | Default                                    |
| ------------- | ------------------------- | ------------------------------------------ |
| `PORT`        | Server port               | 5000                                       |
| `NODE_ENV`    | Environment mode          | development                                |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/forsit-ecommerce |
| `CORS_ORIGIN` | Allowed CORS origin       | http://localhost:5173                      |

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## Error Handling

The API includes comprehensive error handling:

- Validation errors for invalid input
- 404 errors for not found resources
- 500 errors for server issues
- Rate limiting for API protection
- Detailed error messages in development mode

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing configuration
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Mongoose schema validation
- **File Upload Security**: File type and size restrictions

## Contributing

1. Follow the existing code structure
2. Add proper JSDoc comments
3. Include Swagger documentation for new endpoints
4. Test all endpoints before submitting
5. Follow RESTful API conventions

## License

ISC
