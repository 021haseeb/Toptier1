# Bug Fixes TODO

## Priority 1: Critical Bugs
- [x] Fix PropertyContext.jsx - Add try/catch for localStorage (crashes in incognito mode)
- [x] Fix api.js - Replace window.location.href with React Router navigation
- [x] Fix Login.jsx - Remove process.env from state initialization  
- [x] Fix PropertyController.jsx - Handle text search index gracefully

## Priority 2: Minor Issues  
- [x] Fix useScrollAnimation.js - Optimize useEffect dependencies

## Testing
- [ ] Test in browser
- [ ] Test incognito mode
