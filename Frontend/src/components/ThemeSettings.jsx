import React, { useState } from 'react';
import { useThemeStore } from '../store/themeStore';
import '../styles/ThemeSettings.css';

const ThemeSettings = ({ onClose }) => {
  const {
    primaryColor,
    secondaryColor,
    textColor,
    messageOwnBackground,
    messageOtherBackground,
    chatBackground,
    setColor,
    switchTheme,
    availableThemes,
    resetTheme,
  } = useThemeStore();

  const [customColors, setCustomColors] = useState({
    primaryColor,
    secondaryColor,
    textColor,
    messageOwnBackground,
    messageOtherBackground,
    chatBackground,
  });

  const colorOptions = [
    { key: 'primaryColor', label: 'Primary Color', description: 'Accent color for buttons and highlights' },
    { key: 'secondaryColor', label: 'Secondary Color', description: 'Secondary accent color' },
    { key: 'textColor', label: 'Text Color', description: 'Main text color' },
    { key: 'messageOwnBackground', label: 'Own Message Background', description: 'Your message bubble color' },
    { key: 'messageOtherBackground', label: 'Other Message Background', description: 'Other user message bubble color' },
    { key: 'chatBackground', label: 'Chat Background', description: 'Chat window background' },
  ];

  const handleColorChange = (key, value) => {
    setCustomColors((prev) => ({
      ...prev,
      [key]: value,
    }));
    setColor(key, value);
  };

  return (
    <div className="theme-modal-overlay" onClick={onClose}>
      <div className="theme-modal" onClick={(e) => e.stopPropagation()}>
        <div className="theme-header">
          <h2>Theme Settings</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="theme-content">
          {/* Preset Themes */}
          <div className="theme-section">
            <h3>Preset Themes</h3>
            <div className="preset-themes">
              {Object.entries(availableThemes).map(([key, theme]) => (
                <button
                  key={key}
                  className="preset-button"
                  onClick={() => switchTheme(key)}
                  title={theme.name}
                >
                  <div className="theme-preview">
                    <div 
                      className="color-swatch"
                      style={{ backgroundColor: theme.primaryColor }}
                    />
                    <div 
                      className="color-swatch"
                      style={{ backgroundColor: theme.secondaryColor }}
                    />
                  </div>
                  <span>{theme.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Color Picker */}
          <div className="theme-section">
            <h3>Custom Colors</h3>
            <div className="color-picker-grid">
              {colorOptions.map(({ key, label, description }) => (
                <div key={key} className="color-picker-item">
                  <div className="color-picker-header">
                    <label htmlFor={key}>{label}</label>
                    <small>{description}</small>
                  </div>
                  <div className="color-input-group">
                    <input
                      type="color"
                      id={key}
                      value={customColors[key]}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                    />
                    <input
                      type="text"
                      value={customColors[key]}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                      placeholder="#000000"
                      maxLength="7"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="theme-section">
            <h3>Preview</h3>
            <div className="preview-container">
              <div className="preview-message own">
                <div className="message-bubble" style={{ backgroundColor: customColors.messageOwnBackground }}>
                  <span style={{ color: 'black' }}>Your message</span>
                </div>
              </div>
              <div className="preview-message other">
                <div className="message-bubble" style={{ backgroundColor: customColors.messageOtherBackground }}>
                  <span style={{ color: customColors.textColor }}>Other message</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="theme-footer">
          <button className="reset-button" onClick={resetTheme}>
            Reset to Default
          </button>
          <button className="close-button-footer" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
