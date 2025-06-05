# User Management UI

A modern Vue 3 + TypeScript frontend application for managing user data. This application interfaces with the User API to display random users and create new users with a 50% simulated failure rate for testing error handling.

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

## API Integration

The application integrates with the following API endpoints:

```
GET /user   - Fetch a random user
POST /user  - Create a new user (50% failure rate)
GET /id     - Get a UUID (for future use)
```

## Project Setup

1. Install dependencies:
```sh
npm install
```

2. Configure environment (create `.env` file):
```env
VITE_API_BASE_URL=http://localhost:3000
```

3. Start development server:
```sh
npm run dev
```

4. Build for production:
```sh
npm run build
```

### Type-Check, Compile and Minify for Production
```sh
npm run build
```

### Lint with ESLint
```sh
npm run lint
```

### Format with Prettier
```sh
npm run format
```

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
