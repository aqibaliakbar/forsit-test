export function useToast() {
  const showToast = (toast) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: toast }))
  }

  const showSuccess = (title, message = '', duration = 3000) => {
    showToast({ type: 'success', title, message, duration })
  }

  const showError = (title, message = '', duration = 5000) => {
    showToast({ type: 'error', title, message, duration })
  }

  const showWarning = (title, message = '', duration = 4000) => {
    showToast({ type: 'warning', title, message, duration })
  }

  const showInfo = (title, message = '', duration = 3000) => {
    showToast({ type: 'info', title, message, duration })
  }

  return {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }
}
