# Forsit E-commerce Dashboard - Frontend

A modern, responsive Vue.js e-commerce application with both customer-facing shopping features and comprehensive admin dashboard for inventory management, analytics, and order processing.

## 🚀 Features

### Customer-Facing Features

- **Landing Page**: Hero section with featured products and shopping experience
- **Product Catalog**: Interactive product grid with detailed product modals
- **Shopping Cart**: Full cart functionality with quantity management
- **Checkout Process**: Complete checkout flow with order summary
- **Responsive Design**: Mobile-first approach optimized for all devices

### Admin Dashboard Features

- **Dashboard Overview**: Real-time metrics, charts, and recent activity monitoring
- **Revenue Analysis**: Interactive charts with filtering by time periods and categories
- **Inventory Management**: Advanced product listing with filtering and stock management
- **Product Management**: Complete product creation/editing with image upload
- **Order Management**: Order tracking, status updates, and order analytics
- **Low Stock Alerts**: Automated notifications for inventory management

### Technical Features

- **Vue 3 Composition API**: Modern Vue.js with script setup syntax
- **Pinia State Management**: Centralized state management for products, orders, and cart
- **Vue Router**: Client-side routing with lazy loading
- **Chart.js Integration**: Interactive charts for analytics and reporting
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Component Architecture**: Feature-based component organization for maintainability
- **Axios**: HTTP client with interceptors and error handling

## 📦 Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Styling**: Tailwind CSS
- **Charts**: Chart.js + Vue-ChartJS
- **HTTP Client**: Axios
- **Icons**: Heroicons
- **Date Utilities**: date-fns
- **Code Quality**: ESLint + Prettier

## 🛠️ Installation

### Prerequisites

- Node.js 16+
- npm or yarn
- Backend API running on port 5000

### Setup Steps

1. **Clone and navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   ```bash
   # Copy environment example
   cp env.example .env

   # Edit .env file with your configuration
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── assets/                    # Static assets and global styles
│   ├── main.css              # Tailwind imports and custom styles
│   └── logo.svg              # Application logo
├── components/               # Reusable Vue components (organized by feature)
│   ├── checkout/            # Checkout process components
│   │   ├── CheckoutForm.vue
│   │   └── OrderSummary.vue
│   ├── dashboard/           # Dashboard overview components
│   │   ├── DashboardCharts.vue
│   │   ├── DashboardRecentActivity.vue
│   │   └── DashboardStatsCards.vue
│   ├── inventory/           # Inventory management components
│   │   ├── InventoryFilters.vue
│   │   ├── InventoryStatsCards.vue
│   │   └── ProductsTable.vue
│   ├── landing-page/        # Public-facing landing page components
│   │   ├── HeroSection.vue
│   │   ├── ProductGrid.vue
│   │   └── ProductDetailsModal.vue
│   ├── layout/              # Layout and navigation components
│   │   ├── AppHeader.vue           # Admin dashboard header
│   │   ├── AppSidebar.vue          # Admin dashboard sidebar
│   │   ├── DashboardLayout.vue     # Admin layout wrapper
│   │   ├── NotificationsDropdown.vue
│   │   ├── PublicFooter.vue        # Public site footer
│   │   ├── PublicLayout.vue        # Public site layout wrapper
│   │   ├── PublicNavigation.vue    # Public site navigation
│   │   └── ShoppingCartSidebar.vue # Shopping cart component
│   ├── orders/              # Order management components
│   │   ├── OrderModals.vue
│   │   ├── OrdersStatsCards.vue
│   │   └── OrdersTable.vue
│   ├── products/            # Product management components
│   │   ├── ProductFormFields.vue
│   │   └── ProductFormSidebar.vue
│   ├── revenue/             # Revenue analytics components
│   │   ├── RevenueChartsAndTable.vue
│   │   ├── RevenueFilters.vue
│   │   └── RevenueStatsCards.vue
│   └── other/               # Utility components
│       └── Toast.vue        # Toast notification component
├── composables/             # Vue composables for shared logic
├── router/                  # Vue Router configuration
│   └── index.js            # Route definitions
├── services/               # API services and utilities
│   └── api.js              # Axios configuration and API endpoints
├── stores/                 # Pinia stores
│   ├── products.js         # Product state management
│   ├── orders.js           # Order state management
│   └── counter.js          # Example counter store
├── views/                  # Page components
│   ├── CheckoutView.vue              # Checkout page
│   ├── DashboardView.vue             # Main admin dashboard
│   ├── InventoryManagementView.vue   # Inventory management page
│   ├── LandingPageView.vue           # Public landing page
│   ├── NotFoundView.vue              # 404 error page
│   ├── OrdersView.vue                # Order management page
│   ├── ProductFormView.vue           # Product creation/editing page
│   └── RevenueAnalysisView.vue       # Revenue analytics page
├── App.vue                 # Root component with layout logic
└── main.js                 # Application entry point
```

## 🎨 Design System

### Color Palette

- **Primary**: Blue (#3B82F6)
- **Success**: Green (#22C55E)
- **Warning**: Amber (#F59E0B)
- **Danger**: Red (#EF4444)
- **Dark Theme**: Slate color palette for modern dark UI

### Components

- **Cards**: `.card`, `.card-header`, `.card-body`
- **Buttons**: `.btn-primary`, `.btn-secondary`, `.btn-outline`, etc.
- **Forms**: `.form-input`, `.form-select`, `.form-label`
- **Badges**: `.badge-success`, `.badge-warning`, `.badge-danger`
- **Navigation**: `.nav-link`, `.router-link-active`

## 🔌 API Integration

### Base Configuration

```javascript

// Product Endpoints
- GET    /products          # List products with filtering
- POST   /products          # Create product
- GET    /products/:id      # Get product details
- PUT    /products/:id      # Update product
- PATCH  /products/:id/inventory # Update inventory
- DELETE /products/:id      # Delete product
- GET    /products/low-stock # Get low stock products

// Order Endpoints
- GET    /orders           # List orders with filtering
- POST   /orders           # Create order
- GET    /orders/:id       # Get order details
- PATCH  /orders/:id/status # Update order status
- GET    /orders/analytics/revenue # Revenue analytics
```

### Error Handling

- Automatic error interceptors
- Consistent error formatting
- Loading states management
- Toast notifications for user feedback

## 📊 Features Overview

### Public E-commerce Features

- **Landing Page**: Hero section with featured products and company branding
- **Product Browsing**: Interactive product grid with search and filtering
- **Product Details**: Modal-based product details with image galleries
- **Shopping Cart**: Persistent cart with quantity management and checkout
- **Responsive Design**: Mobile-optimized shopping experience

### Admin Dashboard Features

- **Dashboard Overview**: Revenue metrics, recent orders, and low stock alerts
- **Revenue Analysis**: Time-based filtering, category analysis, and trend charts
- **Inventory Management**: Product listing with advanced filtering and stock management
- **Product Management**: Complete CRUD operations with image upload
- **Order Management**: Order tracking, status updates, and customer information

## 🚀 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

### Code Style

- ESLint configuration for Vue 3
- Prettier for code formatting
- Composition API with script setup
- Component-based architecture with feature organization

### Performance Optimizations

- Lazy loading for routes
- Component-level code splitting
- Optimized bundle size
- Responsive images
- Efficient state management with Pinia

## 🔧 Configuration

### Tailwind CSS

Custom configuration with:

- Extended color palette for dark theme
- Custom font family (Inter)
- Additional utility classes
- Responsive design utilities

### Vite Configuration

- Vue plugin setup
- Path aliases (@/ for src/)
- Development server configuration
- Build optimizations

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Collapsible navigation for mobile
- Responsive data tables
- Touch-friendly interface

## 🔒 Security

- XSS protection through Vue's template system
- Input validation and sanitization
- Secure file upload handling
- CORS configuration for API communication

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Environment Variables

```bash
VITE_API_URL=https://localhost:5000/api
```

### Static Hosting

The built application can be deployed to:

- Netlify
- Vercel
- AWS S3 + CloudFront
- GitHub Pages
- Any static hosting service

## 🏗️ Architecture Decisions

### Component Organization

- **Feature-based structure**: Components organized by feature area (dashboard, inventory, etc.)
- **Layout separation**: Public and admin layouts with shared components
- **Reusable components**: Modular design for maintainability

### State Management

- **Pinia stores**: Separate stores for products, orders, and application state
- **Composables**: Shared logic extracted into reusable composables
- **Local state**: Component-level state for UI-specific data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the component organization patterns
4. Add proper TypeScript-style prop definitions
5. Run tests and linting
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Check the documentation
- Review the API endpoints
- Ensure backend is running on port 5000
- Check browser console for errors

---

Built with ❤️ using Vue.js and modern web technologies.
