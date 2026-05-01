# TopTier Real Estate - Bug Fixes & Vercel Deployment Plan

## Bugs Identified

### 1. PropertyDetails.jsx - Invalid motion.img usage
**Location:** client/src/pages/PropertyDetails.jsx (Line ~110)
**Issue:** Using `<motion.img>` directly which is not a valid Framer Motion component. The `motion` namespace doesn't include `img`, `a`, or other HTML elements directly - they should be wrapped in `motion.create` or use regular elements.
**Fix:** Use `<motion.div>` with an `img` tag inside, or use `motion.img` through proper Framer Motion imports.

### 2. Server Database Connection - Hardcoded fallback URL
**Location:** server/config/db.js (Line 6)
**Issue:** Server uses fallback `mongodb://127.0.0.1:27017/toptier` which won't work on any external hosting. Should fail explicitly without MONGODB_URI.
**Fix:** Remove hardcoded fallback and require MONGODB_URI environment variable to be set.

### 3. Missing JWT_SECRET validation
**Location:** server/controllers/authController.js (Line 8), server/middleware/auth.js (Line 14)
**Issue:** `process.env.JWT_SECRET` could be undefined, leading to app crash or security issues.
**Fix:** Add validation to ensure JWT_SECRET is set, or provide a fallback that warns in development only.

### 4. Vite config missing base URL for production
**Location:** client/vite.config.js
**Issue:** No `base` path configured, which may cause issues when deployed to a subdirectory on Vercel.
**Fix:** Add `base: './'` to ensure assets load correctly in all deployment scenarios.

### 5. vercel.json may need improvement for API routing
**Location:** client/vercel.json
**Issue:** Current config rewrites all routes to index.html. For a full-stack app with separate API, this is fine but needs proper CORS configuration.
**Fix:** Already properly configured, but add more explicit headers for API reliability.

### 6. Properties page potential null/undefined errors  
**Location:** client/src/pages/Properties.jsx
**Issue:** `property.images[0]` and other property field accesses could crash if property data is malformed.
**Fix:** Add optional chaining like `property?.images?.[0]` for safer access.

### 7. PropertyDetails - Potential undefined yearBuilt
**Location:** client/src/pages/PropertyDetails.jsx (Line 196)
**Issue:** `property.yearBuilt` might be undefined for some properties.
**Fix:** Add fallback value or conditional rendering.

## Vercel Deploy Ready Changes

### 1. Client Configuration Updates
- Add proper base path in vite.config.js
- Ensure all environment variables are properly prefixed with VITE_
- Add .env.example file

### 2. Environment Variable Setup
- Document required environment variables
- Create .env.example for client and server

### 3. Build Configuration
- Update package.json scripts for Vercel deployment
- Ensure proper build output

---

## Implementation Steps

### Step 1: Fix PropertyDetails.jsx motion.img bug
- Change `<motion.img>` to `<motion.div>` wrapping `<img>`
- Add null safety for image array access

### Step 2: Update vite.config.js for production
- Add base: './' configuration
- Ensure proper build settings

### Step 3: Fix server environment handling
- Remove hardcoded database fallback
- Add JWT_SECRET validation
- Add proper error messages for missing env vars

### Step 4: Add .env.example files
- Create for both client and server
- Document all required variables

### Step 5: Fix potential null reference issues
- Properties.jsx: Add optional chaining for images
- PropertyDetails.jsx: Add fallback for yearBuilt

### Step 6: Test build
- Run client build to verify no errors

---

## Dependent Files to Edit

1. **client/vite.config.js** - Add base configuration
2. **client/src/pages/PropertyDetails.jsx** - Fix motion.img, add null safety
3. **client/src/pages/Properties.jsx** - Add optional chaining
4. **client/.env.example** - Create/Update
5. **server/config/db.js** - Remove hardcoded fallback
6. **server/controllers/authController.js** - Add JWT_SECRET validation
7. **server/package.json** - Add .env example section
