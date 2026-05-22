// Message Status Constants
export const MESSAGE_STATUS = {
  SENDING: 'sending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
  FAILED: 'failed',
};

// User Status Constants
export const USER_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  AWAY: 'away',
  DO_NOT_DISTURB: 'do_not_disturb',
};

// Chat Type Constants
export const CHAT_TYPE = {
  INDIVIDUAL: 'individual',
  GROUP: 'group',
};

// Notification Types
export const NOTIFICATION_TYPE = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

// Animation Durations (ms)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 250,
  SLOW: 350,
  VERY_SLOW: 500,
};

// Debounce/Throttle Delays (ms)
export const DEBOUNCE_DELAY = {
  SEARCH: 300,
  RESIZE: 500,
  SAVE: 800,
  API_CALL: 1000,
};

// Validation Rules
export const VALIDATION = {
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 20,
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_GROUP_NAME_LENGTH: 3,
  MAX_GROUP_NAME_LENGTH: 100,
  MIN_BIO_LENGTH: 0,
  MAX_BIO_LENGTH: 500,
  MAX_MESSAGE_LENGTH: 4096,
  MAX_FILE_SIZE: 5242880, // 5MB
  MAX_IMAGE_SIZE: 10485760, // 10MB
  MAX_GROUP_MEMBERS: 500,
};

// API Endpoints (if needed)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REGISTER: '/api/auth/register',
    REFRESH: '/api/auth/refresh',
  },
  USERS: {
    GET_PROFILE: '/api/users/profile',
    UPDATE_PROFILE: '/api/users/profile',
    GET_USER: '/api/users/:id',
    SEARCH: '/api/users/search',
  },
  MESSAGES: {
    GET_MESSAGES: '/api/messages',
    SEND_MESSAGE: '/api/messages',
    DELETE_MESSAGE: '/api/messages/:id',
    UPDATE_MESSAGE: '/api/messages/:id',
  },
  CHATS: {
    GET_CHATS: '/api/chats',
    GET_CHAT: '/api/chats/:id',
    CREATE_CHAT: '/api/chats',
    DELETE_CHAT: '/api/chats/:id',
  },
  GROUPS: {
    CREATE_GROUP: '/api/groups',
    GET_GROUP: '/api/groups/:id',
    UPDATE_GROUP: '/api/groups/:id',
    DELETE_GROUP: '/api/groups/:id',
    ADD_MEMBER: '/api/groups/:id/members',
    REMOVE_MEMBER: '/api/groups/:id/members/:memberId',
  },
};

// Storage Keys
export const STORAGE_KEYS = {
  USER: 'user',
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  THEME: 'theme',
  PREFERENCES: 'preferences',
  RECENT_CHATS: 'recentChats',
  CACHE: 'cache',
};

// Theme Colors (Default)
export const DEFAULT_COLORS = {
  PRIMARY: '#25D366',
  SECONDARY: '#128C7E',
  SUCCESS: '#31A24C',
  WARNING: '#FFA500',
  ERROR: '#E74C3C',
  INFO: '#3498DB',
  LIGHT: '#ECF0F1',
  DARK: '#2C3E50',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
};

// Font Sizes
export const FONT_SIZES = {
  XS: '12px',
  SM: '13px',
  BASE: '14px',
  LG: '16px',
  XL: '18px',
  '2XL': '20px',
  '3XL': '24px',
  '4XL': '28px',
};

// Spacing
export const SPACING = {
  XS: '4px',
  SM: '8px',
  MD: '12px',
  LG: '16px',
  XL: '20px',
  '2XL': '24px',
  '3XL': '32px',
  '4XL': '40px',
};

// Border Radius
export const BORDER_RADIUS = {
  NONE: '0',
  SM: '4px',
  MD: '8px',
  LG: '12px',
  FULL: '9999px',
};

// Shadow
export const SHADOW = {
  NONE: 'none',
  SM: '0 1px 3px rgba(0, 0, 0, 0.1)',
  MD: '0 4px 6px rgba(0, 0, 0, 0.1)',
  LG: '0 10px 25px rgba(0, 0, 0, 0.1)',
  XL: '0 20px 40px rgba(0, 0, 0, 0.2)',
};

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  LAPTOP: 1024,
  DESKTOP: 1280,
  TV: 1920,
};

// Regular Expressions
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
  URL: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PASSWORD: 'Password must be at least 8 characters.',
  PASSWORDS_DO_NOT_MATCH: 'Passwords do not match.',
  USERNAME_TAKEN: 'Username is already taken.',
  USER_NOT_FOUND: 'User not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  MESSAGE_SEND_FAILED: 'Failed to send message. Please try again.',
  FILE_TOO_LARGE: 'File is too large. Maximum size is 5MB.',
  INVALID_FILE_TYPE: 'Invalid file type.',
  GROUP_NAME_REQUIRED: 'Group name is required.',
  INVALID_GROUP_NAME: 'Group name must be between 3 and 100 characters.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Logged in successfully.',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  MESSAGE_SENT: 'Message sent successfully.',
  GROUP_CREATED: 'Group created successfully.',
  THEME_SAVED: 'Theme saved successfully.',
  COPIED_TO_CLIPBOARD: 'Copied to clipboard.',
};

// Log Levels
export const LOG_LEVEL = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
};

// Environment
export const ENV = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  STAGING: 'staging',
};

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_DARK_MODE: true,
  ENABLE_EMOJI_PICKER: true,
  ENABLE_GROUP_CHAT: true,
  ENABLE_VIDEO_CALL: false,
  ENABLE_VOICE_CALL: false,
  ENABLE_FILE_SHARING: false,
  ENABLE_MESSAGE_SEARCH: true,
  ENABLE_MESSAGE_REACTIONS: false,
};

// Default Values
export const DEFAULT_VALUES = {
  PAGE_SIZE: 20,
  MESSAGE_HISTORY_LIMIT: 100,
  TYPING_TIMEOUT: 3000,
  AUTO_SAVE_INTERVAL: 30000,
  SESSION_TIMEOUT: 900000, // 15 minutes
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

// Emoji Categories
export const EMOJI_CATEGORIES = [
  'Smileys',
  'Hearts',
  'Hand Gestures',
  'Thumbs',
  'Activity',
  'Food',
  'Nature',
  'Objects',
];

// Typing Indicator Messages
export const TYPING_MESSAGES = {
  ONE_USER: '{name} is typing...',
  TWO_USERS: '{name1} and {name2} are typing...',
  MULTIPLE_USERS: 'Multiple users are typing...',
};

// Date Format
export const DATE_FORMATS = {
  SHORT: 'MM/DD/YYYY',
  LONG: 'MMMM DD, YYYY',
  FULL: 'dddd, MMMM DD, YYYY',
  TIME_SHORT: 'HH:mm',
  TIME_LONG: 'HH:mm:ss',
  DATE_TIME: 'MM/DD/YYYY HH:mm',
};

// Local Storage Expiration (ms)
export const STORAGE_EXPIRATION = {
  SESSION: 3600000, // 1 hour
  SHORT: 86400000, // 1 day
  MEDIUM: 604800000, // 7 days
  LONG: 2592000000, // 30 days
};
