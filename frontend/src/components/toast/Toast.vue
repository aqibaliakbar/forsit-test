<template>
  <Teleport to="body">
    <div
      class="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] space-y-2 w-full max-w-md px-4"
    >
      <Transition
        v-for="toast in toasts"
        :key="toast.id"
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="toast"
          class="w-full bg-slate-800 border-2 shadow-2xl rounded-lg pointer-events-auto overflow-hidden backdrop-blur-sm"
          :class="getToastStyle(toast.type)"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <component
                  :is="getIcon(toast.type)"
                  class="h-6 w-6"
                  :class="getIconColor(toast.type)"
                />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-white">{{ toast.title }}</p>
                <p v-if="toast.message" class="mt-1 text-sm text-slate-300">{{ toast.message }}</p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  @click="removeToast(toast.id)"
                  class="bg-transparent rounded-md inline-flex text-slate-400 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          <!-- Progress bar -->
          <div v-if="toast.duration" class="h-1 bg-slate-700">
            <div
              class="h-full transition-all ease-linear"
              :class="getProgressColor(toast.type)"
              :style="{ width: `${toast.progress}%` }"
            ></div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

defineOptions({
  name: 'ToastNotification',
})

const toasts = ref([])
let toastId = 0

const getIcon = (type) => {
  const icons = {
    success: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    error: XCircleIcon,
    info: InformationCircleIcon,
  }
  return icons[type] || InformationCircleIcon
}

const getIconColor = (type) => {
  const colors = {
    success: 'text-green-400',
    warning: 'text-amber-400',
    error: 'text-red-400',
    info: 'text-blue-400',
  }
  return colors[type] || 'text-blue-400'
}

const getProgressColor = (type) => {
  const colors = {
    success: 'bg-green-400',
    warning: 'bg-amber-400',
    error: 'bg-red-400',
    info: 'bg-blue-400',
  }
  return colors[type] || 'bg-blue-400'
}

const getToastStyle = (type) => {
  const styles = {
    success: 'border-green-400',
    warning: 'border-amber-400',
    error: 'border-red-400',
    info: 'border-blue-400',
  }
  return styles[type] || 'border-blue-400'
}

const addToast = (toast) => {
  const id = ++toastId
  const duration = toast.duration || 4000

  const newToast = {
    id,
    type: toast.type || 'info',
    title: toast.title,
    message: toast.message,
    duration,
    progress: 100,
  }

  toasts.value.push(newToast)

  // Auto remove after duration
  if (duration > 0) {
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, duration - elapsed)
      newToast.progress = (remaining / duration) * 100

      if (remaining <= 0) {
        clearInterval(interval)
        removeToast(id)
      }
    }, 50)
  }

  return id
}

const removeToast = (id) => {
  const index = toasts.value.findIndex((toast) => toast.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

const clearAll = () => {
  toasts.value = []
}

// Global toast methods
const showSuccess = (title, message, duration) => {
  return addToast({ type: 'success', title, message, duration })
}

const showError = (title, message, duration) => {
  return addToast({ type: 'error', title, message, duration })
}

const showWarning = (title, message, duration) => {
  return addToast({ type: 'warning', title, message, duration })
}

const showInfo = (title, message, duration) => {
  return addToast({ type: 'info', title, message, duration })
}

// Expose methods
defineExpose({
  addToast,
  removeToast,
  clearAll,
  showSuccess,
  showError,
  showWarning,
  showInfo,
})

onMounted(() => {
  window.addEventListener('show-toast', (event) => {
    addToast(event.detail)
  })
})

onUnmounted(() => {
  window.removeEventListener('show-toast', () => {})
})
</script>
