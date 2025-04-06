declare interface TelegramWebApp {
    initData: string;
    initDataUnsafe: {
        user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            photo_url?: string;
        };
    };
    ready: () => void;
    expand: () => void;
    close: () => void;
    showPopup: (params: {
        title: string;
        message: string;
        buttons: Array<{
            id: string;
            type: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
            text: string;
        }>;
    }) => Promise<string>;
    showAlert: (message: string) => Promise<void>;
    showConfirm: (message: string) => Promise<boolean>;
    showScanQrPopup: (params: {
        text?: string;
    }) => Promise<string>;
    closeScanQrPopup: () => void;
    openLink: (url: string, options?: {
        try_instant_view?: boolean;
    }) => void;
    openTelegramLink: (url: string) => void;
    sendData: (data: string) => void;
    setHeaderColor: (color: string) => void;
    setBackgroundColor: (color: string) => void;
    enableClosingConfirmation: () => void;
    disableClosingConfirmation: () => void;
    onEvent: (eventType: string, eventHandler: Function) => void;
    offEvent: (eventType: string, eventHandler: Function) => void;
    version: string;
    platform: string;
    colorScheme: 'light' | 'dark';
    themeParams: {
        bg_color?: string;
        text_color?: string;
        hint_color?: string;
        link_color?: string;
        button_color?: string;
        button_text_color?: string;
    };
    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;
    headerColor: string;
    backgroundColor: string;
    isClosingConfirmationEnabled: boolean;
}

declare interface Window {
    Telegram: {
        WebApp: TelegramWebApp;
    };
} 