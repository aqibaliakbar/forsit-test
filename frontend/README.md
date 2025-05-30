# Forsit E-commerce Frontend

A modern, responsive Vue.js 3 application for an e-commerce dashboard with comprehensive product management, order tracking, analytics, and a customer-facing landing page.

## 🚀 Features

### Dashboard Features

- **Product Management**: Complete CRUD operations for products with image upload
- **Inventory Management**: Stock tracking, low stock alerts, and filtering
- **Order Management**: Order processing, status updates, and customer information
- **Analytics Dashboard**: Revenue charts, sales statistics, and performance metrics
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Customer Features

- **Landing Page**: Product catalog with search and filtering
- **Shopping Cart**: Add to cart functionality with quantity management
- **Product Details**: Modal-based product information and images
- **Checkout Process**: Complete order form with customer information

### Technical Features

- **Modern UI**: Beautiful interface with Tailwind CSS and Heroicons
- **State Management**: Pinia for efficient state management
- **Routing**: Vue Router with navigation guards
- **Charts**: Interactive charts with Chart.js and Vue-ChartJS
- **API Integration**: Axios-based API communication
- **Loading States**: Skeleton components for better UX
- **Toast Notifications**: User feedback system
- **Error Handling**: Comprehensive error boundaries

## 🛠️ Tech Stack

- **Framework**: Vue.js 3 with Composition API
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with custom components
- **Icons**: Heroicons Vue
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **HTTP Client**: Axios
- **Charts**: Chart.js with Vue-ChartJS
- **Date Handling**: date-fns
- **Code Quality**: ESLint + Prettier
- **Development**: Vite DevTools

## 📋 Prerequisites

- Node.js (version 16.0.0 or higher)
- npm (version 7.0.0 or higher)
- Backend API server running (see backend README)

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/aqibaliakbar/forsit-test.git
   cd forsit-test/frontend
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
   # API Configuration
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 🚀 Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier

## 📁 Project Structure

```
frontend/
├── public/
│   ├── icons/               # App icons and favicons
│   ├── forsit-logo.svg     # Brand logo
│   └── site.webmanifest    # PWA manifest
├── src/
│   ├── assets/
│   │   └── main.css        # Global styles and Tailwind imports
│   ├── components/
│   │   ├── checkout/       # Checkout process components
│   │   ├── dashboard/      # Dashboard overview components
│   │   ├── inventory/      # Product inventory management
│   │   ├── landing-page/   # Customer-facing components
│   │   ├── layout/         # Layout and navigation components
│   │   ├── orders/         # Order management components
│   │   ├── products/       # Product management components
│   │   ├── revenue/        # Analytics and revenue components
│   │   ├── skeleton/       # Loading skeleton components
│   │   └── other/          # Shared components (Toast, etc.)
│   ├── composables/
│   │   └── useToast.js     # Toast notification composable
│   ├── router/
│   │   └── index.js        # Vue Router configuration
│   ├── services/
│   │   └── api.js          # Axios API service layer
│   ├── stores/
│   │   ├── products.js     # Product state management
│   │   ├── orders.js       # Order state management
│   │   └── cart.js         # Shopping cart state
│   ├── views/
│   │   ├── DashboardView.vue
│   │   ├── InventoryManagementView.vue
│   │   ├── OrdersView.vue
│   │   ├── ProductFormView.vue
│   │   ├── RevenueAnalysisView.vue
│   │   ├── LandingPageView.vue
│   │   └── NotFoundView.vue
│   ├── App.vue             # Root component
│   └── main.js             # Application entry point
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
├── package.json
└── README.md
```

## 🎨 UI Components

### Layout Components

- **DashboardLayout**: Admin dashboard layout with sidebar navigation
- **PublicLayout**: Customer-facing layout with header and footer
- **AppHeader**: Navigation header with user actions
- **AppSidebar**: Dashboard navigation sidebar
- **PublicNavigation**: Customer site navigation

### Feature Components

- **ProductGrid**: Product catalog display
- **ProductsTable**: Admin product management table
- **OrdersTable**: Order management and tracking
- **DashboardCharts**: Analytics and revenue charts
- **CheckoutForm**: Complete checkout process
- **ShoppingCartSidebar**: Shopping cart management

### UI Elements

- **SkeletonCard**: Loading placeholders
- **Toast**: Notification system
- **Modal**: Product details and confirmations

## 🔌 API Integration

The frontend communicates with the backend API through:

### Products API

- Get product catalog with search and filters
- Product CRUD operations (admin)
- Image upload functionality

### Orders API

- Order creation and management
- Status tracking and updates
- Analytics and reporting

### Services Layer

```javascript
// Example API service usage
import { productService } from '@/services/api'

// Get products with filters
const products = await productService.getProducts({
  category: 'electronics',
  search: 'laptop',
  page: 1,
  limit: 10,
})
```

## 🛒 State Management

Using Pinia for state management:

### Product Store

- Product catalog management
- Search and filtering state
- Product form state

### Order Store

- Order management
- Status updates
- Analytics data

### Cart Store

- Shopping cart items
- Quantity management
- Checkout state

## 🎨 Styling and Design

### Tailwind CSS Configuration

- Custom color palette
- Typography scaling
- Component utilities
- Responsive breakpoints

### Design System

- Consistent spacing and typography
- Modern card-based layouts
- Interactive hover states
- Loading and error states

## 📱 Responsive Design

The application is fully responsive with:

- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interactions
- Collapsible navigation

## 🔧 Configuration

### Environment Variables

| Variable       | Description          | Default                   |
| -------------- | -------------------- | ------------------------- |
| `VITE_API_URL` | Backend API base URL | http://localhost:5000/api |

### Tailwind CSS

Custom configuration includes:

- Brand color palette
- Custom spacing scale
- Typography settings
- Component variants

### Vite Configuration

- Vue.js plugin setup
- Path aliases (@/ for src/)
- Development server settings
- Build optimizations

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables

### Manual Deployment

```bash
# Build for production
npm run build

# The dist/ folder contains the built application
# Upload to your preferred hosting service
```

### Production Checklist

- [ ] Set correct `VITE_API_URL` for production backend
- [ ] Configure domain and SSL certificate
- [ ] Set up error monitoring
- [ ] Configure CDN for static assets
- [ ] Test all functionality in production environment

## 🧪 Development Guidelines

### Code Style

- Use Vue 3 Composition API
- Follow Vue.js official style guide
- Use TypeScript-style JSDoc comments
- Implement proper error handling

### Component Structure

```vue
<template>
  <!-- Component template -->
</template>

<script setup>
// Composition API setup
</script>

<style scoped>
/* Component-specific styles */
</style>
```

### State Management

- Use Pinia stores for global state
- Keep component state local when possible
- Implement proper error handling in stores

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Error**

   - Check if backend server is running
   - Verify `VITE_API_URL` in .env file
   - Check browser console for CORS errors

2. **Build Errors**

   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for TypeScript errors in IDE
   - Verify all imports are correct

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check for conflicting CSS classes
   - Verify responsive breakpoints

### Development Tools

- Vue DevTools browser extension
- Vite DevTools for performance monitoring
- Browser developer tools for debugging

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Follow the coding standards and guidelines
4. Add tests for new functionality
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

### Development Standards

- Write descriptive commit messages
- Add JSDoc comments for complex functions
- Ensure responsive design compatibility
- Test on multiple browsers

## 📝 License

This project is licensed under the ISC License.

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

## 🔗 Related Links

- [Vue.js Documentation](https://vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Backend API Documentation](../backend/README.md)
