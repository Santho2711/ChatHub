import React, { useState } from 'react';
import '../styles/EmojiPicker.css';

const EMOJIS = {
  'Smileys': ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇'],
  'Hearts': ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '💕', '💞', '💓'],
  'Hand Gestures': ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🫰', '🤟', '🤘'],
  'Thumbs': ['👍', '👎', '👊', '👏', '🙌', '👐', '🤲', '🤝', '🤜', '🤛'],
  'Activity': ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🥏', '🎳', '🏓', '🏸', '🏒', '🏑'],
  'Food': ['🍕', '🍔', '🍟', '🌭', '🍿', '🍗', '🍖', '🌮', '🌯', '🥙', '🧆', '🌲', '🍜'],
  'Nature': ['🌍', '🌎', '🌏', '⛅', '🌤️', '🌥️', '☁️', '🌦️', '🌧️', '⛈️', '🌩️', '🌨️', '❄️'],
  'Objects': ['⌚', '📱', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️', '🗜️', '💽', '💾', '💿'],
};

const EmojiPicker = ({ onEmojiSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('Smileys');

  const categories = Object.keys(EMOJIS);

  return (
    <div className="emoji-picker">
      <div className="emoji-categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
            title={category}
          >
            {category.charAt(0)}
          </button>
        ))}
      </div>

      <div className="emoji-grid">
        {EMOJIS[selectedCategory].map((emoji) => (
          <button
            key={emoji}
            className="emoji-button"
            onClick={() => onEmojiSelect(emoji)}
            title={emoji}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;
