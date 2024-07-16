import WebApp from '@twa-dev/sdk'

// Определим тип, соответствующий реальной структуре WebApp
type TelegramWebApp = typeof WebApp;

// Используем утилитный тип Pick для выбора только нужных нам свойств
export type TWA = Pick<TelegramWebApp,
    'initDataUnsafe' |
    'initData' |
    'version' |
    'platform' |
    'colorScheme' |
    'themeParams' |
    'isExpanded' |
    'viewportHeight' |
    'viewportStableHeight' |
    'isClosingConfirmationEnabled' |
    'headerColor' |
    'backgroundColor' |
    'BackButton' |
    'MainButton' |
    'HapticFeedback' |
    'close' |
    'expand' |
    'readTextFromClipboard' |
    'ready' |
    'sendData' |
    'switchInlineQuery' |
    'openLink' |
    'openTelegramLink' |
    'openInvoice' |
    'showPopup' |
    'showAlert' |
    'showConfirm' |
    'enableClosingConfirmation' |
    'disableClosingConfirmation'
>;

// Используем преобразование типа с проверкой
export const twa: TWA | null = WebApp && 'initDataUnsafe' in WebApp ? WebApp as TWA : null;

if (!twa) {
    console.warn('TWA is not available. Some features may not work correctly.');
}

export default twa