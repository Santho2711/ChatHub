# Contributing to ChatApp

Thank you for your interest in contributing to ChatApp! This document provides guidelines and instructions for contributing.

## Table of Contents
1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Testing](#testing)
8. [Documentation](#documentation)

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inspiring community for all. Please read and adhere to our Code of Conduct:

- Be respectful of differing opinions and experiences
- Give and gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior
- Harassment of any kind
- Discriminatory language or actions
- Personal attacks
- Publishing private information without consent

## Getting Started

### Prerequisites
- Node.js v14+ and npm v6+
- Git
- A GitHub account
- Text editor or IDE (VS Code recommended)

### Fork and Clone
1. Fork the repository on GitHub
2. Clone your fork locally:
```bash
git clone https://github.com/your-username/whatsapp-web-clone.git
cd whatsapp-web-clone
```

3. Add upstream remote:
```bash
git remote add upstream https://github.com/original/whatsapp-web-clone.git
```

4. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

## Development Workflow

### Creating a Feature Branch
```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/my-new-feature
```

### Branch Naming Convention
- Features: `feature/descriptive-name`
- Bugfixes: `bugfix/issue-description`
- Hotfixes: `hotfix/urgent-fix`
- Documentation: `docs/topic-name`

Example:
```bash
git checkout -b feature/add-emoji-categories
git checkout -b bugfix/fix-message-timestamp
git checkout -b docs/update-readme
```

### Making Changes

1. Make atomic commits (single logical changes)
2. Test your changes frequently
3. Keep your branch up to date:
```bash
git fetch upstream
git rebase upstream/main
```

4. Push to your fork:
```bash
git push origin feature/your-feature-name
```

## Coding Standards

### JavaScript/React Standards

#### Naming Conventions
```javascript
// Variables and functions: camelCase
const userName = 'John';
function handleClick() {}

// Components: PascalCase
function MyComponent() {}

// Constants: UPPER_SNAKE_CASE
const MAX_MESSAGE_LENGTH = 4096;
const DEFAULT_TIMEOUT = 5000;

// Private/internal: prefix with underscore
const _internalHelper = () => {};
```

#### Component Structure
```javascript
// 1. Imports
import React, { useState, useEffect } from 'react';
import { useStore } from '../store/store';
import './Component.css';

// 2. Component
const MyComponent = ({ prop1, prop2 }) => {
  // Hooks first
  const [state, setState] = useState(null);
  const storeValue = useStore((state) => state.value);

  // Effects
  useEffect(() => {
    // setup
    return () => {
      // cleanup
    };
  }, []);

  // Event handlers
  const handleClick = () => {
    // handle click
  };

  // Render
  return (
    <div className="my-component">
      {/* JSX */}
    </div>
  );
};

// 3. Export
export default MyComponent;
```

#### Code Style
```javascript
// ✅ Good
function getUserName(user) {
  return user?.profile?.name || 'Unknown';
}

// ❌ Avoid
function getUserName(user) {
  if (user) {
    if (user.profile) {
      if (user.profile.name) {
        return user.profile.name;
      }
    }
  }
  return 'Unknown';
}
```

#### Comments
```javascript
// Good: Explain WHY, not WHAT
// Cache user data to avoid repeated API calls
const cachedUsers = {};

// Avoid: Stating the obvious
// Set name to John
const name = 'John';
```

### CSS Standards

#### Class Naming (BEM)
```css
/* Block */
.message-list { }

/* Block__Element */
.message-list__item { }

/* Block--Modifier */
.message-list--compact { }
```

#### Organization
```css
/* 1. Layout properties */
.component {
  display: flex;
  position: relative;
  width: 100%;
}

/* 2. Box model */
.component {
  margin: 0;
  padding: 16px;
  border: 1px solid #ccc;
}

/* 3. Typography */
.component {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

/* 4. Visual */
.component {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 5. Animations */
.component {
  transition: all 0.3s ease;
}
```

## Commit Guidelines

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Changes that don't affect code (formatting, etc.)
- `refactor`: Code refactoring without feature changes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or dependency updates

### Examples
```bash
git commit -m "feat(emoji-picker): add new emoji categories"
git commit -m "fix(messages): correct timestamp display format"
git commit -m "docs(readme): update installation instructions"
git commit -m "style(chat): improve message bubble styling"
git commit -m "refactor(store): simplify state management logic"
```

### Commit Best Practices
- Write clear, descriptive messages
- Use imperative mood ("add" not "added")
- Keep commits focused and atomic
- Reference issues when relevant: `fix: issue #123`

## Pull Request Process

### Before Submitting
1. Update your branch with main:
```bash
git fetch upstream
git rebase upstream/main
```

2. Test your changes:
```bash
npm test
npm run build
```

3. Check code quality:
```bash
npm run lint  # if available
```

### Submitting a PR

1. Push to your fork:
```bash
git push origin feature/your-feature-name
```

2. Open a Pull Request on GitHub

3. Fill in the PR template:
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update

## Related Issues
Fixes #(issue number)

## Testing
- [ ] I have tested this on my local machine
- [ ] New feature works as expected
- [ ] No regressions found

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows style guidelines
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No console warnings/errors
```

### PR Expectations
- Descriptive title and description
- Linked to relevant issues
- Tests pass
- No merge conflicts
- Code review approval required

### Responding to Reviews
- Respond to all comments
- Make requested changes
- Push updates to the same branch
- Use conversations to clarify

## Testing

### Manual Testing
```bash
# Start the app
npm start

# Test in different browsers
# Test on mobile devices (responsive design)
# Test keyboard navigation
# Test with different themes
```

### Testing Checklist
- [ ] Feature works as described
- [ ] No breaking changes
- [ ] Responsive design maintained
- [ ] Accessibility maintained
- [ ] Performance acceptable

### Known Issues to Test
- [ ] Message sending and receiving
- [ ] Group creation and management
- [ ] Theme switching
- [ ] Search functionality
- [ ] Mobile responsiveness

## Documentation

### Code Documentation
Add JSDoc comments for complex functions:

```javascript
/**
 * Formats a date to a readable string
 * @param {Date} date - The date to format
 * @param {string} format - The format pattern
 * @returns {string} Formatted date string
 */
function formatDate(date, format = 'YYYY-MM-DD') {
  // implementation
}
```

### README Updates
If adding a new feature, update README.md:
- Add feature to feature list
- Document new dependencies
- Update setup instructions if needed

### Documentation Files
- **README.md** - Main documentation
- **SETUP.md** - Setup instructions
- **ARCHITECTURE.md** - Architecture details
- **CONTRIBUTING.md** - This file

## Common Development Tasks

### Adding a New Component
1. Create component file: `src/components/MyComponent.jsx`
2. Create styles: `src/styles/MyComponent.css`
3. Import and use in parent component
4. Update relevant stores if needed
5. Add to component hierarchy in documentation

### Adding a New Store
1. Create store file: `src/store/myStore.js`
2. Define state shape and actions
3. Export store hook
4. Import and use in components
5. Document store structure

### Adding New Styles
1. Follow BEM naming convention
2. Use CSS variables for colors
3. Mobile-first responsive design
4. Add to appropriate CSS file
5. Test on multiple screen sizes

### Adding Utility Functions
1. Add function to `src/utils/helpers.js`
2. Export function
3. Add JSDoc comments
4. Test thoroughly
5. Update constants if needed

## Questions and Support

### Getting Help
- Check existing issues and discussions
- Review architecture documentation
- Ask in PR comments
- Open a discussion for major changes

### Reporting Bugs
When reporting bugs, include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots/videos if applicable
- Browser and OS information

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project wiki (if applicable)

## Final Notes

- Be patient and respectful
- Help review others' PRs
- Share knowledge and experience
- Celebrate milestones together
- Have fun contributing!

Thank you for making ChatApp better! 🎉
