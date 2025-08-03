// Telegram WebApp utilities and integration helpers
export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: TelegramUser;
    start_param?: string;
    auth_date?: number;
    hash?: string;
  };
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
    secondary_bg_color?: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  isClosingConfirmationEnabled: boolean;
  
  // Methods
  ready(): void;
  expand(): void;
  close(): void;
  setHeaderColor(color: string): void;
  setBackgroundColor(color: string): void;
  enableClosingConfirmation(): void;
  disableClosingConfirmation(): void;
  openLink(url: string, options?: { try_instant_view?: boolean }): void;
  openTelegramLink(url: string): void;
  openInvoice(url: string, callback?: (status: string) => void): void;
  showPopup(params: {
    title?: string;
    message: string;
    buttons?: Array<{
      id?: string;
      type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
      text: string;
    }>;
  }, callback?: (buttonId: string) => void): void;
  showAlert(message: string, callback?: () => void): void;
  showConfirm(message: string, callback?: (confirmed: boolean) => void): void;
  showScanQrPopup(params: {
    text?: string;
  }, callback?: (text: string) => boolean): void;
  closeScanQrPopup(): void;
  sendData(data: string): void;
  requestContact(callback?: (shared: boolean) => void): void;
  requestLocation(callback?: (shared: boolean) => void): void;
  
  // Events
  onEvent(eventType: string, eventHandler: () => void): void;
  offEvent(eventType: string, eventHandler: () => void): void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

// Telegram WebApp initialization helper
export function initTelegramWebApp(): TelegramWebApp | null {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    const webApp = window.Telegram.WebApp;
    
    // Initialize WebApp
    webApp.ready();
    
    // Configure app appearance
    webApp.setHeaderColor('#1A1A1A'); // Rich black
    webApp.setBackgroundColor('#1A1A1A');
    webApp.expand();
    webApp.enableClosingConfirmation();
    
    return webApp;
  }
  
  return null;
}

// User authentication helper
export function getTelegramUser(): TelegramUser | null {
  const webApp = window.Telegram?.WebApp;
  return webApp?.initDataUnsafe?.user || null;
}

// Payment helper
export async function createTelegramInvoice(params: {
  title: string;
  description: string;
  payload: string;
  currency: string;
  prices: Array<{ label: string; amount: number }>;
}): Promise<string> {
  // This would typically call your backend to create an invoice
  // For now, return a mock invoice URL
  const response = await fetch('/api/create-invoice', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Telegram-Init-Data': window.Telegram?.WebApp?.initData || '',
    },
    body: JSON.stringify(params),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create invoice');
  }
  
  const data = await response.json();
  return data.invoiceLink;
}

// Utility functions
export function formatRussianCurrency(amount: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount / 100); // Convert from kopecks
}

export function formatRussianDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatTimeAgo(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'только что';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} мин назад`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ч назад`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} дн назад`;
  }
  
  return formatRussianDate(dateObj);
}

// Haptic feedback
export function triggerHapticFeedback(type: 'impact' | 'notification' | 'selection' = 'impact'): void {
  const webApp = window.Telegram?.WebApp;
  if (webApp && 'HapticFeedback' in webApp) {
    try {
      switch (type) {
        case 'impact':
          (webApp as any).HapticFeedback.impactOccurred('medium');
          break;
        case 'notification':
          (webApp as any).HapticFeedback.notificationOccurred('success');
          break;
        case 'selection':
          (webApp as any).HapticFeedback.selectionChanged();
          break;
      }
    } catch (error) {
      console.log('Haptic feedback not supported');
    }
  }
}

// Theme integration
export function getTelegramTheme(): 'light' | 'dark' {
  return window.Telegram?.WebApp?.colorScheme || 'dark';
}

// Safe area helpers for better mobile experience
export function getTelegramViewportHeight(): number {
  return window.Telegram?.WebApp?.viewportHeight || window.innerHeight;
}

export function getTelegramStableHeight(): number {
  return window.Telegram?.WebApp?.viewportStableHeight || window.innerHeight;
}

// Main button helpers (for primary actions)
export interface MainButtonParams {
  text: string;
  color?: string;
  textColor?: string;
  isActive?: boolean;
  isVisible?: boolean;
}

export function showMainButton(params: MainButtonParams, onClick?: () => void): void {
  const webApp = window.Telegram?.WebApp;
  if (webApp && 'MainButton' in webApp) {
    const mainButton = (webApp as any).MainButton;
    
    mainButton.setText(params.text);
    
    if (params.color) {
      mainButton.setParams({ color: params.color });
    }
    
    if (params.textColor) {
      mainButton.setParams({ text_color: params.textColor });
    }
    
    if (params.isActive !== undefined) {
      if (params.isActive) {
        mainButton.enable();
      } else {
        mainButton.disable();
      }
    }
    
    if (onClick) {
      mainButton.onClick(onClick);
    }
    
    if (params.isVisible !== false) {
      mainButton.show();
    }
  }
}

export function hideMainButton(): void {
  const webApp = window.Telegram?.WebApp;
  if (webApp && 'MainButton' in webApp) {
    (webApp as any).MainButton.hide();
  }
}

// Analytics and tracking
export function trackTelegramEvent(eventName: string, params?: Record<string, any>): void {
  console.log(`[Telegram Analytics] ${eventName}`, params);
  
  // Here you could integrate with analytics services
  // For example, send to your backend or third-party analytics
  
  const webApp = window.Telegram?.WebApp;
  if (webApp) {
    // You could send analytics data through the WebApp
    try {
      webApp.sendData(JSON.stringify({
        type: 'analytics',
        event: eventName,
        params,
        timestamp: Date.now(),
        user_id: webApp.initDataUnsafe?.user?.id,
      }));
    } catch (error) {
      console.log('Failed to send analytics data');
    }
  }
}

// Export everything for easy importing
export default {
  initTelegramWebApp,
  getTelegramUser,
  createTelegramInvoice,
  formatRussianCurrency,
  formatRussianDate,
  formatTimeAgo,
  triggerHapticFeedback,
  getTelegramTheme,
  getTelegramViewportHeight,
  getTelegramStableHeight,
  showMainButton,
  hideMainButton,
  trackTelegramEvent,
};
