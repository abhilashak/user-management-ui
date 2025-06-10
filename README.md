# User Management UI

A modern Vue 3 + TypeScript frontend application for managing user data. This application interfaces with the User API to display random users and create new users with a 50% simulated failure rate for testing error handling.

<img width="1431" alt="user-management-homepage-1" src="https://github.com/user-attachments/assets/2218ecf9-e305-49a7-b6dd-6f2210603c71" />

<img width="1437" alt="user-management-homepage-2" src="https://github.com/user-attachments/assets/34889ec9-e968-4a32-aa37-aaa146eab26a" />


## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js and npm**:
   - Required version: Node.js 18+ and npm 9+
   - Installation guides:
     - All platforms: [Download from official site](https://nodejs.org/)
     - macOS: `brew install node`
     - Windows: Use the official installer
     - Linux: Use package manager or [Node Version Manager](https://github.com/nvm-sh/nvm)

2. **Backend API**:
   - The User API service should be running (see user_api/README.md)
   - Default URL: http://localhost:3000

## Features

### 1. Random User Display
- Fetches and displays random user details
- Shows user's name, biography, and metadata
- Provides a refresh button to fetch another random user
- Handles loading states and API failures gracefully

### 2. User Creation
- Form to create new users with name and biography
- Implements the 50% random failure simulation from the API
- Shows success and error messages
- Clears form on successful submission
- Automatically refreshes the random user display after creation

### 3. Error Handling
- Graceful handling of API failures
- Clear error messages for users
- Loading states during API calls
- Retry mechanisms for failed operations

## Tech Stack

- Vue 3 - Progressive JavaScript Framework
- TypeScript - For type safety
- Vite - Next Generation Frontend Tooling
- Vue Router - Official router for Vue.js
- Modern CSS - Using latest CSS features for styling

## Setup

⚠️ **Important**: Please check all [Prerequisites](#prerequisites) are installed before proceeding. The application requires:
- Node.js 18+ and npm 9+
- Backend API service running

1. **Install Node.js** (if not already installed):
   ```bash
   # Verify Node.js and npm installation:
   node -v  # Should be 18+
   npm -v   # Should be 9+
   ```

2. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd user-management-ui
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Configure environment**:
   ```bash
   # Copy example env file
   cp .env.example .env

   # Edit .env file to match your backend URL
   # Default configuration:
   VITE_API_BASE_URL=http://localhost:3000
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```

   The application will be available at http://localhost:5173

6. **Build for production** (optional):
   ```bash
   npm run build
   ```

## Development Commands

```bash
# Type-check and compile for production
npm run build

# Lint files
npm run lint

# Format with Prettier
npm run format
```

## Troubleshooting

Common issues and solutions:

1. **API Connection Issues**:
   - Ensure the backend API is running
   - Check VITE_API_BASE_URL in .env
   - Verify no CORS issues in browser console

2. **Node.js/npm Issues**:
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules: `rm -rf node_modules`
   - Reinstall dependencies: `npm install`

3. **Build Failures**:
   - Check Node.js version compatibility
   - Clear Vite cache: `rm -rf node_modules/.vite`
   - Update dependencies: `npm update`

## Development

### Directory Structure
```
src/
├── assets/        # Static assets
├── components/    # Vue components
├── services/      # API services
├── types/         # TypeScript interfaces
└── views/         # Page components
```

### Key Components

- `UserList.vue` - Main component for displaying user information
- `UserService.ts` - Service layer for API communication
- `User.ts` - TypeScript interfaces for user data

## Error Handling Strategy

The application implements a robust error handling strategy:

1. API Level
   - Timeout handling
   - Network error detection
   - Response validation

2. UI Level
   - Loading states
   - Error messages
   - Retry mechanisms
   - Graceful degradation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
