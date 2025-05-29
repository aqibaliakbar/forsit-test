import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import InventoryManagementView from '@/views/InventoryManagementView.vue'
import ProductFormView from '@/views/ProductFormView.vue'
import OrdersView from '@/views/OrdersView.vue'
import LandingPageView from '@/views/LandingPageView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import RevenueAnalysisView from '@/views/RevenueAnalysisView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPageView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/revenue-analysis',
      name: 'revenue-analysis',
      component: RevenueAnalysisView,
    },
    {
      path: '/products/new',
      name: 'product-create',
      component: ProductFormView,
    },
    {
      path: '/products/:id/edit',
      name: 'product-edit',
      component: ProductFormView,
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: InventoryManagementView,
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrdersView,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
    ? `${to.meta.title} - Forsit E-commerce Dashboard`
    : 'Forsit E-commerce Dashboard'
  next()
})

export default router
