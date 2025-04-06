import { ref, onMounted } from 'vue';

interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
    favorites?: number[];
}

interface TelegramWebApp {
    initData: string;
    ready: () => void;
    expand: () => void;
    close: () => void;
}

interface TelegramWebAppError extends Error {
    code?: string;
    message: string;
}

export const useTelegram = () => {
    const { $webAppApi } = useNuxtApp();
    const user = ref<TelegramUser | null>(null);
    const isLoading = ref(true);
    const error = ref<string | null>(null);
    const initData = ref<string | null>(null);

    const validateInitData = async () => {
        try {
            isLoading.value = true;
            error.value = null;

            const telegramInitData = window.Telegram?.WebApp?.initData;
            if (!telegramInitData) {
                throw new Error('Данные инициализации не найдены');
            }

            const response = await $webAppApi.validateInitData(telegramInitData);
            if (response.data.success) {
                initData.value = telegramInitData;
                const userResponse = await $webAppApi.getUserInfo();
                user.value = userResponse.data;
            } else {
                throw new Error('Неверные данные инициализации');
            }
        } catch (err: unknown) {
            const telegramError = err as TelegramWebAppError;
            error.value = telegramError.message;
            console.error('Ошибка при валидации данных:', telegramError);
        } finally {
            isLoading.value = false;
        }
    };

    onMounted(() => {
        if (window.Telegram?.WebApp?.initData) {
            validateInitData();
        } else {
            isLoading.value = false;
            error.value = 'Telegram Web App не инициализирован';
        }
    });

    return {
        user,
        isLoading,
        error,
        initData,
        validateInitData,
    };
}; 