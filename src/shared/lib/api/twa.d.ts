declare module '@twa-dev/sdk' {
    export interface WebAppUser {
        id: number;
        is_bot?: boolean;
        first_name: string;
        last_name?: string;
        username?: string;
        language_code?: string;
        is_premium?: boolean;
    }

    export interface WebAppInitData {
        query_id: string;
        user?: WebAppUser;
        receiver?: WebAppUser;
        chat?: WebAppChat;
        start_param?: string;
        can_send_after?: number;
        auth_date: number;
        hash: string;
    }

    export interface WebAppChat {
        id: number;
        type: string;
        title: string;
        username?: string;
        photo_url?: string;
    }

    export interface ThemeParams {
        bg_color: string;
        text_color: string;
        hint_color: string;
        link_color: string;
        button_color: string;
        button_text_color: string;
        secondary_bg_color: string;
        header_bg_color: string;
        accent_text_color: string;
        section_bg_color: string;
        section_header_text_color: string;
        subtitle_text_color: string;
        destructive_text_color: string;
    }

    export type HapticFeedbackImpactStyle = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft';
    export type HapticFeedbackNotificationType = 'error' | 'success' | 'warning';

    export interface HapticFeedback {
        impactOccurred: (style: HapticFeedbackImpactStyle) => HapticFeedback;
        notificationOccurred: (type: HapticFeedbackNotificationType) => HapticFeedback;
        selectionChanged: () => HapticFeedback;
    }

    export interface BackButton {
        isVisible: boolean;
        onClick: (callback: () => void) => void;
        offClick: (callback: () => void) => void;
        show: () => void;
        hide: () => void;
    }

    export interface MainButton {
        text: string;
        color: string;
        textColor: string;
        isVisible: boolean;
        isProgressVisible: boolean;
        isActive: boolean;
        setText: (text: string) => void;
        onClick: (callback: () => void) => void;
        offClick: (callback: () => void) => void;
        show: () => void;
        hide: () => void;
        enable: () => void;
        disable: () => void;
        showProgress: (leaveActive?: boolean) => void;
        hideProgress: () => void;
        setParams: (params: {
            text?: string;
            color?: string;
            text_color?: string;
            is_active?: boolean;
            is_visible?: boolean;
        }) => void;
    }

    export interface SettingsButton {
        isVisible: boolean;
        onClick: (callback: () => void) => SettingsButton;
        offClick: (callback: () => void) => SettingsButton;
        show: () => SettingsButton;
        hide: () => SettingsButton;
    }

    export interface CloudStorage {
        getItem: (key: string) => Promise<string | null>;
        setItem: (key: string, value: string) => Promise<void>;
        removeItem: (key: string) => Promise<void>;
        getKeys: () => Promise<string[]>;
        removeItems: (keys: string[]) => Promise<void>;
        getItems: (keys: string[]) => Promise<(string | null)[]>;
    }

    export type PopupButton = {
        id?: string;
        type: 'default' | 'destructive';
        text: string;
    };

    export interface PopupParams {
        title?: string;
        message: string;
        buttons?: PopupButton[];
    }

    export interface WebApp {
        initDataUnsafe: WebAppInitData;
        initData: string;
        version: string;
        platform: string;
        colorScheme: string;
        themeParams: ThemeParams;
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        isClosingConfirmationEnabled: boolean;
        headerColor: string;
        backgroundColor: string;
        BackButton: BackButton;
        MainButton: MainButton;
        HapticFeedback: HapticFeedback;
        SettingsButton: SettingsButton;
        CloudStorage: CloudStorage;
        close: () => void;
        expand: () => void;
        readTextFromClipboard: (callback?: (text: string) => void) => void;
        ready: () => void;
        sendData: (data: unknown) => void;
        switchInlineQuery: (query: string, choose_chat_types?: string[]) => void;
        openLink: (url: string, options?: { try_instant_view?: boolean }) => void;
        openTelegramLink: (url: string) => void;
        openInvoice: (url: string) => Promise<boolean>;
        showPopup: (params: PopupParams, callback?: (id?: string) => unknown) => void;
        showAlert: (message: string, callback?: () => void) => void;
        showConfirm: (message: string, callback?: (isConfirmed: boolean) => void) => void;
        enableClosingConfirmation: () => void;
        disableClosingConfirmation: () => void;
        onEvent: (eventName: string, eventHandler: (...args: any[]) => unknown) => void;
        offEvent: (eventName: string, eventHandler: (...args: any[]) => unknown) => void;
        requestWriteAccess: (callback?: (result: boolean) => void) => Promise<boolean>;
        requestContact: (callback?: (result: boolean) => void) => Promise<boolean>;
        showScanQrPopup: (params: { text?: string }, callback?: (text: string) => void) => void;
        closeScanQrPopup: () => void;
        setHeaderColor: (color: string) => void;
        setBackgroundColor: (color: string) => void;
        isVersionAtLeast: (version: string) => boolean;
    }

    const WebApp: WebApp;
    export default WebApp;
}