import { ref } from 'vue';

interface ApiResponse<T> {
    data: T;
    message?: string;
}

interface ApiParams {
    [key: string]: string | number | boolean | undefined;
}

export const useApi = () => {
    const loading = ref(false);
    const error = ref('');

    const get = async <T>(url: string, params?: ApiParams): Promise<T> => {
        loading.value = true;
        error.value = '';
        try {
            const response = await $fetch<ApiResponse<T>>(url, {
                params
            });
            return response.data;
        } catch (e) {
            error.value = 'Ошибка при загрузке данных';
            console.error('Error fetching data:', e);
            throw e;
        } finally {
            loading.value = false;
        }
    };

    const post = async <T>(url: string, data?: Record<string, any>): Promise<T> => {
        loading.value = true;
        error.value = '';
        try {
            const response = await $fetch<ApiResponse<T>>(url, {
                method: 'POST',
                body: data
            });
            return response.data;
        } catch (e) {
            error.value = 'Ошибка при отправке данных';
            console.error('Error posting data:', e);
            throw e;
        } finally {
            loading.value = false;
        }
    };

    const put = async <T>(url: string, data?: Record<string, any>): Promise<T> => {
        loading.value = true;
        error.value = '';
        try {
            const response = await $fetch<ApiResponse<T>>(url, {
                method: 'PUT',
                body: data
            });
            return response.data;
        } catch (e) {
            error.value = 'Ошибка при обновлении данных';
            console.error('Error updating data:', e);
            throw e;
        } finally {
            loading.value = false;
        }
    };

    const del = async <T>(url: string): Promise<T> => {
        loading.value = true;
        error.value = '';
        try {
            const response = await $fetch<ApiResponse<T>>(url, {
                method: 'DELETE'
            });
            return response.data;
        } catch (e) {
            error.value = 'Ошибка при удалении данных';
            console.error('Error deleting data:', e);
            throw e;
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        error,
        get,
        post,
        put,
        del
    };
}; 