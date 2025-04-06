import { ref } from 'vue'

interface Notification {
    id: number
    type: 'success' | 'error' | 'info' | 'warning'
    message: string
    duration?: number
}

export const useNotifications = () => {
    const notifications = ref<Notification[]>([])
    let nextId = 1

    const addNotification = (type: Notification['type'], message: string, duration = 3000) => {
        const id = nextId++
        const notification: Notification = {
            id,
            type,
            message,
            duration
        }
        notifications.value.push(notification)

        if (duration > 0) {
            setTimeout(() => {
                removeNotification(id)
            }, duration)
        }
    }

    const removeNotification = (id: number) => {
        notifications.value = notifications.value.filter(n => n.id !== id)
    }

    const success = (message: string, duration?: number) => {
        addNotification('success', message, duration)
    }

    const error = (message: string, duration?: number) => {
        addNotification('error', message, duration)
    }

    const info = (message: string, duration?: number) => {
        addNotification('info', message, duration)
    }

    const warning = (message: string, duration?: number) => {
        addNotification('warning', message, duration)
    }

    return {
        notifications,
        success,
        error,
        info,
        warning,
        removeNotification
    }
} 