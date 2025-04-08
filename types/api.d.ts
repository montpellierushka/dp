import type { AxiosInstance } from 'axios'

declare module '#app' {
    interface NuxtApp {
        $api: {
            favoriteApi: {
                getFavorites: () => Promise<{ data: any }>;
                addRecipe: (id: number) => Promise<any>;
                removeRecipe: (id: number) => Promise<any>;
            };
        } & AxiosInstance;
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $api: NuxtApp['$api'];
    }
} 