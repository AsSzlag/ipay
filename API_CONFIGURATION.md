# API Configuration Guide

## 🚀 Axios Setup

This project uses **Axios** for all API communications with advanced features like:

- Request/Response interceptors
- Automatic authentication token handling
- Global error handling
- Environment-based configuration
- Request logging in development mode

## 📋 Environment Variables

The API configuration uses Vite's environment variables. All variables must be prefixed with `VITE_` to be exposed to the client.

### Setup Instructions

1. **Copy the example file:**

   ```bash
   cp .env.example .env
   ```

2. **Update the values in `.env`:**

   ```env
   # API Configuration
   VITE_API_BASE_URL=http://localhost:3000/api
   VITE_API_TIMEOUT=10000

   # Add your Firebase config if needed
   VITE_FIREBASE_API_KEY=your_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_domain_here
   # ... etc
   ```

### Available Environment Files

- `.env` - Local development (not committed to Git)
- `.env.example` - Template with all variables (committed to Git)
- `.env.production` - Production configuration (not committed to Git)

## 🔧 Usage Examples

### Basic API Calls

```typescript
import { apiService } from '@/services';

// GET request
const response = await apiService.get('/clients');

// POST request
const newClient = await apiService.post('/clients', {
  name: 'John Doe',
  email: 'john@example.com',
});

// PUT request
const updated = await apiService.put('/clients/123', {
  name: 'Jane Doe',
});

// DELETE request
await apiService.delete('/clients/123');
```

### Using Service Methods

```typescript
import { clientService, paymentService } from '@/services';

// Get all clients
const clients = await clientService.getClients();

// Get client by ID
const client = await clientService.getClientById('123');

// Create new client
const newClient = await clientService.createClient({
  name: 'John Doe',
  email: 'john@example.com',
  type: 'individual',
});

// Get payments
const payments = await paymentService.getPayments();
```

### Authentication

The API service automatically handles authentication tokens:

```typescript
import { apiService } from '@/services';

// Set token (usually after login)
apiService.setAuthToken('your-jwt-token');

// Clear token (on logout)
apiService.clearAuthToken();

// All subsequent requests will include the token automatically
const data = await apiService.get('/protected-endpoint');
```

## 🛡️ Error Handling

The API service includes global error handling:

- **401 Unauthorized** - Automatically clears token and redirects to login
- **403 Forbidden** - Logs permission error
- **404 Not Found** - Logs missing resource
- **500 Server Error** - Logs server error
- **Network errors** - Handles connection failures

### Custom Error Handling

```typescript
try {
  const data = await apiService.get('/endpoint');
} catch (error) {
  // Handle specific errors
  if (error.message.includes('Network')) {
    console.error('Connection problem');
  }
}
```

## 🔍 Development Features

### Request Logging

In development mode, all API requests and responses are logged to the console:

- 🚀 Outgoing requests
- ✅ Successful responses
- ❌ Error responses

### Debugging

Access the raw Axios instance for advanced configurations:

```typescript
import { apiService } from '@/services';

const axiosInstance = apiService.getAxiosInstance();
// Use axiosInstance directly for custom requests
```

## 📝 Type Safety

All API methods are fully typed with TypeScript:

```typescript
import type { Client, Payment, ApiResponse } from '@/types';

// Type-safe API calls
const response: ApiResponse<Client> =
  await apiService.get<Client>('/clients/123');
const client: Client = response.data;
```

## 🚀 Production Build

When building for production:

1. Update `.env.production` with your production API URL
2. Build the project: `npm run build`
3. Vite will automatically use `.env.production` variables

```bash
# .env.production
VITE_API_BASE_URL=https://api.yourproduction.com/api
VITE_API_TIMEOUT=15000
```

## 🔒 Security Notes

- ✅ `.env` files are added to `.gitignore` to prevent committing secrets
- ✅ Only `VITE_` prefixed variables are exposed to the client
- ✅ Never commit sensitive API keys or tokens to Git
- ✅ Use `.env.example` to document required variables without exposing secrets
