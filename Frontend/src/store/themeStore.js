import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const DEFAULT_THEMES = {
  whatsapp: {
    name: 'WhatsApp',
    primaryColor: '#25D366',
    secondaryColor: '#128C7E',
    backgroundColor: '#FFFFFF',
    sidebarBackground: '#FFFFFF',
    chatBackground: '#ECE5DD',
    textColor: '#111111',
    messageOwnBackground: '#DCF8C6',
    messageOtherBackground: '#FFFFFF',
    inputBackground: '#FFFFFF',
    borderColor: '#E0E0E0',
  },
  dark: {
    name: 'Dark Mode',
    primaryColor: '#00D084',
    secondaryColor: '#075E54',
    backgroundColor: '#0A1419',
    sidebarBackground: '#111B21',
    chatBackground: '#0A1419',
    textColor: '#E9EDEF',
    messageOwnBackground: '#056162',
    messageOtherBackground: '#202C33',
    inputBackground: '#1F2937',
    borderColor: '#374045',
  },
  midnight: {
    name: 'Midnight',
    primaryColor: '#6366F1',
    secondaryColor: '#4F46E5',
    backgroundColor: '#1A1A2E',
    sidebarBackground: '#16213E',
    chatBackground: '#0F3460',
    textColor: '#EAEAEA',
    messageOwnBackground: '#6366F1',
    messageOtherBackground: '#374151',
    inputBackground: '#1F2937',
    borderColor: '#4B5563',
  },
  ocean: {
    name: 'Ocean',
    primaryColor: '#0EA5E9',
    secondaryColor: '#0284C7',
    backgroundColor: '#F0F9FF',
    sidebarBackground: '#FFFFFF',
    chatBackground: '#E0F2FE',
    textColor: '#164E63',
    messageOwnBackground: '#0EA5E9',
    messageOtherBackground: '#F8FAFC',
    inputBackground: '#FFFFFF',
    borderColor: '#BAE6FD',
  },
  sunset: {
    name: 'Sunset',
    primaryColor: '#F97316',
    secondaryColor: '#EA580C',
    backgroundColor: '#FEF3C7',
    sidebarBackground: '#FFFFFF',
    chatBackground: '#FEF3C7',
    textColor: '#92400E',
    messageOwnBackground: '#F97316',
    messageOtherBackground: '#FFFFFF',
    inputBackground: '#FFFFFF',
    borderColor: '#FCD34D',
  },
};

export const useThemeStore = create(
  persist(
    (set, get) => ({
      // Current theme
      theme: DEFAULT_THEMES.whatsapp,
      primaryColor: DEFAULT_THEMES.whatsapp.primaryColor,
      secondaryColor: DEFAULT_THEMES.whatsapp.secondaryColor,
      backgroundColor: DEFAULT_THEMES.whatsapp.backgroundColor,
      sidebarBackground: DEFAULT_THEMES.whatsapp.sidebarBackground,
      chatBackground: DEFAULT_THEMES.whatsapp.chatBackground,
      textColor: DEFAULT_THEMES.whatsapp.textColor,
      messageOwnBackground: DEFAULT_THEMES.whatsapp.messageOwnBackground,
      messageOtherBackground: DEFAULT_THEMES.whatsapp.messageOtherBackground,
      inputBackground: DEFAULT_THEMES.whatsapp.inputBackground,
      borderColor: DEFAULT_THEMES.whatsapp.borderColor,
      availableThemes: DEFAULT_THEMES,

      // Switch to predefined theme
      switchTheme: (themeName) => {
        const newTheme = DEFAULT_THEMES[themeName];
        if (newTheme) {
          set({
            theme: newTheme,
            primaryColor: newTheme.primaryColor,
            secondaryColor: newTheme.secondaryColor,
            backgroundColor: newTheme.backgroundColor,
            sidebarBackground: newTheme.sidebarBackground,
            chatBackground: newTheme.chatBackground,
            textColor: newTheme.textColor,
            messageOwnBackground: newTheme.messageOwnBackground,
            messageOtherBackground: newTheme.messageOtherBackground,
            inputBackground: newTheme.inputBackground,
            borderColor: newTheme.borderColor,
          });
        }
      },

      // Custom color update
      setColor: (colorKey, colorValue) =>
        set((state) => ({
          [colorKey]: colorValue,
          theme: {
            ...state.theme,
            [colorKey]: colorValue,
          },
        })),

      // Reset to default theme
      resetTheme: () => {
        const defaultTheme = DEFAULT_THEMES.whatsapp;
        set({
          theme: defaultTheme,
          primaryColor: defaultTheme.primaryColor,
          secondaryColor: defaultTheme.secondaryColor,
          backgroundColor: defaultTheme.backgroundColor,
          sidebarBackground: defaultTheme.sidebarBackground,
          chatBackground: defaultTheme.chatBackground,
          textColor: defaultTheme.textColor,
          messageOwnBackground: defaultTheme.messageOwnBackground,
          messageOtherBackground: defaultTheme.messageOtherBackground,
          inputBackground: defaultTheme.inputBackground,
          borderColor: defaultTheme.borderColor,
        });
      },
    }),
    {
      name: 'theme-store',
    }
  )
);
