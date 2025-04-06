import { ref } from 'vue';

interface ApiInstance {
    get: (endpoint: string, config?: { params?: any }) => Promise<any>;
    post: (endpoint: string, data?: any, config?: { params?: any }) => Promise<any>;
    put: (endpoint: string, data?: any, config?: { params?: any }) => Promise<any>;
    delete: (endpoint: string, config?: { params?: any }) => Promise<any>;
}

interface NuxtAppWithApi {
    $api: ApiInstance;
}

export const useApi = () => {
    const config = useRuntimeConfig();
    const { $api } = useNuxtApp() as unknown as NuxtAppWithApi;
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const makeRequest = async <T>(
        method: 'get' | 'post' | 'put' | 'delete',
        endpoint: string,
        data?: any,
        params?: any
    ): Promise<T> => {
        try {
            isLoading.value = true;
            error.value = null;

            let response;
            if (method === 'get') {
                response = await $api[method](endpoint, { params });
            } else if (method === 'delete') {
                response = await $api[method](endpoint);
            } else {
                response = await $api[method](endpoint, data);
            }
            return response.data;
        } catch (err: any) {
            error.value = err.response?.data?.message || err.message;
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    return {
        isLoading,
        error,
        get: <T>(endpoint: string, params?: any) => 
            makeRequest<T>('get', endpoint, undefined, params),
        post: <T>(endpoint: string, data?: any) => 
            makeRequest<T>('post', endpoint, data),
        put: <T>(endpoint: string, data?: any) => 
            makeRequest<T>('put', endpoint, data),
        delete: <T>(endpoint: string) => 
            makeRequest<T>('delete', endpoint),
    };
}; 