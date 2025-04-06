<template>
    <div class="fixed top-4 right-4 z-50 space-y-4">
        <div
            v-for="notification in notifications"
            :key="notification.id"
            class="card bg-base-100 shadow-xl w-96 cursor-pointer"
            :class="{
                'bg-success text-success-content': notification.type === 'success',
                'bg-error text-error-content': notification.type === 'error',
                'bg-info text-info-content': notification.type === 'info',
                'bg-warning text-warning-content': notification.type === 'warning'
            }"
            @click="removeNotification(notification.id)"
        >
            <div class="card-body">
                <h3 class="card-title">{{ notification.title }}</h3>
                <p>{{ notification.message }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNotifications } from '~/composables/useNotifications'

const { notifications, removeNotification } = useNotifications()
</script>

<style scoped>
.notifications {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.notification {
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
}

.notification:hover {
    transform: translateX(-0.5rem);
}

.notification.success {
    border-left: 4px solid #10b981;
}

.notification.error {
    border-left: 4px solid #ef4444;
}

.notification.info {
    border-left: 4px solid #3b82f6;
}

.notification.warning {
    border-left: 4px solid #f59e0b;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.notification-message {
    font-size: 0.875rem;
    line-height: 1.25rem;
}
</style> 