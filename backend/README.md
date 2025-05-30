# Forsit E-commerce Backend API

A robust Node.js and Express.js REST API for an e-commerce dashboard application with product management, order processing, and analytics capabilities.

## 🚀 Features

- **Product Management**: CRUD operations for products with image upload
- **Order Processing**: Complete order management system
- **Analytics**: Revenue and sales analytics
- **File Upload**: Image upload with Multer
- **API Documentation**: Swagger/OpenAPI documentation
- **Security**: Helmet, CORS, rate limiting
- **Database**: MongoDB with Mongoose ODM
- **Environment-based Configuration**: Development and production environments

## 🛠️ Tech Stack

- **Runtime**: Node.js (≥18.0.0)
- **Framework**: Express.js 5.x
- **Database**: MongoDB with Mongoose
- **File Upload**: Multer
- **Security**: Helmet, CORS, Rate Limiting
- **Documentation**: Swagger UI
- **Development**: Nodemon for hot reloading
- **Logging**: Morgan

## 📋 Prerequisites

- Node.js (version 18.0.0 or higher)
- npm (version 8.0.0 or higher)
- MongoDB (local or cloud instance)

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/aqibaliakbar/forsit-test.git
   cd forsit-test/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   ```bash
   cp env.example .env
   ```

   Update the `.env` file with your configuration:

   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/forsit-ecommerce

   # CORS Configuration
   CORS_ORIGIN=http://localhost:5173
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🚀 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with hot reloading
- `npm test` - Run tests (placeholder)

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js      # MongoDB connection configuration
│   │   └── swagger.js       # Swagger documentation setup
│   ├── controllers/
│   │   ├── productController.js  # Product business logic
│   │   └── orderController.js    # Order business logic
│   ├── middleware/
│   │   ├── errorHandler.js  # Global error handling
│   │   └── upload.js        # File upload middleware
│   ├── models/
│   │   ├── Product.js       # Product data model
│   │   └── Order.js         # Order data model
│   ├── routes/
│   │   ├── productRoutes.js # Product API endpoints
│   │   └── orderRoutes.js   # Order API endpoints
│   ├── utils/
│   │   └── helpers.js       # Utility functions
│   └── server.js           # Main application entry point
├── uploads/                # File upload directory
├── package.json
├── env.example
└── README.md
```

## 🔌 API Endpoints

### Products API

- `GET /api/products` - Get all products with optional filtering and pagination
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product
- `POST /api/products/:id/upload` - Upload product image

### Orders API

- `GET /api/orders` - Get all orders with optional filtering and pagination
- `GET /api/orders/:id` - Get a specific order
- `POST /api/orders` - Create a new order
- `PUT /api/orders/:id` - Update an order
- `DELETE /api/orders/:id` - Delete an order
- `PUT /api/orders/:id/status` - Update order status

### Analytics API

- `GET /api/orders/analytics/revenue` - Get revenue analytics
- `GET /api/orders/analytics/stats` - Get order statistics

## 📖 API Documentation

Once the server is running, you can access the interactive API documentation at:

- **Swagger UI**: `http://localhost:5000/api-docs`

## 🗄️ Database Schema

### Product Model

```javascript
{
  name: String (required),
  description: String,
  price: Number (required),
  category: String (required),
  stock: Number (default: 0),
  imageUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model

```javascript
{
  orderNumber: String (unique),
  customerName: String (required),
  customerEmail: String (required),
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number,
    price: Number
  }],
  totalAmount: Number (required),
  status: String (enum: pending, processing, shipped, delivered, cancelled),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

- **Helmet**: Security headers protection
- **CORS**: Cross-origin resource sharing configuration
- **Rate Limiting**: Request rate limiting (100 requests per 15 minutes)
- **Input Validation**: Request validation and sanitization
- **Error Handling**: Centralized error handling middleware

## 🌐 Environment Variables

| Variable      | Description               | Default                                    |
| ------------- | ------------------------- | ------------------------------------------ |
| `PORT`        | Server port               | 5000                                       |
| `NODE_ENV`    | Environment mode          | development                                |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/forsit-ecommerce |
| `CORS_ORIGIN` | Frontend URL for CORS     | http://localhost:5173                      |

## 🚀 Deployment

### Using Railway

The project includes `railway.json` and `Procfile` for Railway deployment.

### Using Vercel/Netlify

Update the environment variables in your deployment platform.

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure production MongoDB URI
- [ ] Set proper CORS_ORIGIN
- [ ] Configure file upload storage (cloud storage recommended)
- [ ] Set up monitoring and logging

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Ensure MongoDB is running
   - Check the MONGODB_URI in your .env file
   - Verify network connectivity

2. **Port Already in Use**

   - Change the PORT in your .env file
   - Kill the process using the port: `lsof -ti:5000 | xargs kill -9`

3. **File Upload Issues**
   - Ensure the uploads directory exists
   - Check file permissions
   - Verify multer configuration

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.
