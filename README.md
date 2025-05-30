# Forsit E-commerce Platform

A full-stack e-commerce platform featuring a modern Vue.js frontend and robust Node.js backend API. The platform includes both a customer-facing shopping interface and a comprehensive admin dashboard for managing products, orders, and analytics.

## 🚀 Project Overview

This project consists of two main components:

- **Frontend**: Vue.js 3 application with customer shopping interface and admin dashboard
- **Backend**: Node.js/Express.js REST API with MongoDB for data persistence

### Key Features

🛒 **Customer Experience**

- Modern product catalog with search and filtering
- Interactive shopping cart and checkout process
- Responsive design for all devices
- Product detail modals with image galleries

📊 **Admin Dashboard**

- Comprehensive analytics and revenue charts
- Product and inventory management
- Order tracking and status updates
- Low stock alerts and notifications

🔧 **Technical Features**

- REST API with Swagger documentation
- MongoDB database with Mongoose ODM
- JWT authentication (coming soon)
- File upload for product images
- Real-time data updates
- Responsive Tailwind CSS design

## 🏗️ Architecture

```
Forsit E-commerce Platform
├── Frontend (Vue.js 3)
│   ├── Customer Shopping Interface
│   ├── Admin Dashboard
│   └── Shared Components
└── Backend (Node.js/Express)
    ├── REST API Endpoints
    ├── MongoDB Database
    └── File Upload Service
```

## 🛠️ Tech Stack

### Frontend

- **Framework**: Vue.js 3 with Composition API
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Charts**: Chart.js with Vue-ChartJS
- **HTTP Client**: Axios

### Backend

- **Runtime**: Node.js (≥18.0.0)
- **Framework**: Express.js 5.x
- **Database**: MongoDB with Mongoose
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18.0.0 or higher)
- npm (version 8.0.0 or higher)
- MongoDB (local installation or cloud instance)

### 1. Clone the Repository

```bash
git clone https://github.com/aqibaliakbar/forsit-test.git
cd forsit-test
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp env.example .env

# Update .env with your MongoDB URI and other settings
# MONGODB_URI=mongodb://localhost:27017/forsit-ecommerce
# PORT=5000
# CORS_ORIGIN=http://localhost:5173

# Start the backend server
npm run dev
```

The backend API will be available at `http://localhost:5000`
API documentation: `http://localhost:5000/api-docs`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp env.example .env

# Update .env with your API URL
# VITE_API_URL=http://localhost:5000/api

# Start the frontend development server
npm run dev
```

The frontend application will be available at `http://localhost:5173`

## 📁 Project Structure

```
forsit-test/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── config/         # Database and app configuration
│   │   ├── controllers/    # Business logic
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   └── server.js       # Main server file
│   ├── uploads/            # File upload directory
│   ├── package.json
│   ├── env.example
│   └── README.md
├── frontend/               # Vue.js 3 application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Vue components (organized by feature)
│   │   ├── views/         # Page components
│   │   ├── stores/        # Pinia state management
│   │   ├── router/        # Vue Router setup
│   │   ├── services/      # API services
│   │   └── composables/   # Reusable composition functions
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── env.example
│   └── README.md
└── README.md              # This file
```

## 🔌 API Endpoints

### Products

- `GET /api/products` - List products with filtering and pagination
- `POST /api/products` - Create a new product
- `GET /api/products/:id` - Get product details
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/products/:id/upload` - Upload product image

### Orders

- `GET /api/orders` - List orders with filtering
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status
- `GET /api/orders/analytics/revenue` - Get revenue analytics
- `GET /api/orders/analytics/stats` - Get order statistics

### Documentation

- `GET /api-docs` - Swagger API documentation

## 🌐 Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/forsit-ecommerce
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Development Scripts

### Backend

```bash
npm start      # Start production server
npm run dev    # Start development server with hot reload
```

### Frontend

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
npm run lint    # Run ESLint
npm run format  # Format code with Prettier
```

## 🚀 Deployment

### Backend Deployment

The backend is configured for easy deployment with:

- **Railway**: Includes `railway.json` and `Procfile`
- **Heroku**: Uses `Procfile` for deployment
- **Vercel/Netlify**: Serverless deployment ready

### Frontend Deployment

- **Vercel**: Automatic deployment from GitHub
- **Netlify**: Static site deployment
- **AWS S3**: Static hosting with CloudFront CDN

### Production Checklist

- [ ] Set `NODE_ENV=production` for backend
- [ ] Configure production MongoDB URI
- [ ] Set correct `VITE_API_URL` for frontend
- [ ] Configure CORS for production domains
- [ ] Set up error monitoring and logging
- [ ] Configure CDN for static assets
- [ ] Set up SSL certificates

## 🛡️ Security Features

- **Helmet**: Security headers for Express.js
- **CORS**: Cross-origin resource sharing configuration
- **Rate Limiting**: API request rate limiting
- **Input Validation**: Request validation and sanitization
- **File Upload Security**: Secure file upload with type restrictions

## 📖 Documentation

- [Backend API Documentation](./backend/README.md)
- [Frontend Application Documentation](./frontend/README.md)
- [API Documentation (Swagger)](http://localhost:5000/api-docs) - Available when backend is running

## 🧪 Testing

Currently, the project includes:

- ESLint for code quality
- Prettier for code formatting
- Component structure for easy testing addition

**Coming Soon**: Jest unit tests and Cypress e2e tests

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code structure and patterns
- Add JSDoc comments for complex functions
- Ensure responsive design compatibility
- Test on multiple browsers and devices
- Update documentation for new features

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Ensure MongoDB is running locally or check cloud connection
   - Verify `MONGODB_URI` in backend `.env` file

2. **CORS Errors**

   - Check `CORS_ORIGIN` in backend `.env`
   - Verify `VITE_API_URL` in frontend `.env`

3. **Port Conflicts**

   - Backend default: `localhost:5000`
   - Frontend default: `localhost:5173`
   - Update PORT in `.env` files if needed

4. **File Upload Issues**
   - Ensure `uploads/` directory exists in backend
   - Check file permissions

### Getting Help

- Check individual README files in `/backend` and `/frontend` directories
- Review API documentation at `http://localhost:5000/api-docs`
- Open an issue in the GitHub repository

## 📝 License

This project is licensed under the ISC License.

## 👥 Team

- **Backend Development**: Node.js/Express.js REST API
- **Frontend Development**: Vue.js 3 with modern tooling
- **Database Design**: MongoDB with Mongoose ODM

## 📞 Support

For support, please:

1. Check the documentation in individual component READMEs
2. Review the troubleshooting section above
3. Open an issue in the GitHub repository
4. Contact: your-email@example.com

---

**Built with ❤️ using modern web technologies**

Vue.js 3 • Node.js • Express.js • MongoDB • Tailwind CSS • Vite
