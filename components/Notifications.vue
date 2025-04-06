<template>
    <div class="notifications">
        <div
            v-for="notification in notifications"
            :key="notification.id"
            class="notification"
            :class="notification.type"
            @click="removeNotification(notification.id)"
        >
            <div class="notification-content">
                <span class="notification-message">{{ notification.message }}</span>
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