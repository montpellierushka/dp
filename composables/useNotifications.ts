import { ref } from 'vue'

export interface Notification {
    id: number
    type: 'success' | 'error' | 'info' | 'warning'
    title: string
    message: string
    duration?: number
}

export const useNotifications = () => {
    const notifications = ref<Notification[]>([])

    const addNotification = (notification: Omit<Notification, 'id'>) => {
        const id = Date.now()
        notifications.value.push({ ...notification, id })
        if (notification.duration) {
            setTimeout(() => removeNotification(id), notification.duration)
        }
    }

    const removeNotification = (id: number) => {
        notifications.value = notifications.value.filter(n => n.id !== id)
    }

    const showSuccess = (message: string, title: string = 'Успех') => {
        addNotification({
            type: 'success',
            title,
            message,
            duration: 3000
        })
    }

    const showError = (message: string, title: string = 'Ошибка') => {
        addNotification({
            type: 'error',
            title,
            message,
            duration: 5000
        })
    }

    const showInfo = (message: string, title: string = 'Информация') => {
        addNotification({
            type: 'info',
            title,
            message,
            duration: 3000
        })
    }

    const showWarning = (message: string, title: string = 'Предупреждение') => {
        addNotification({
            type: 'warning',
            title,
            message,
            duration: 4000
        })
    }

    return {
        notifications,
        addNotification,
        removeNotification,
        showSuccess,
        showError,
        showInfo,
        showWarning
    }
} 