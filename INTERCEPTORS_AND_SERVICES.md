# Interceptory i Serwisy Modułowe

## 🔐 Zaawansowane Interceptory Axios

### Request Interceptor

**Automatyczne dodawanie JWT tokena:**

```typescript
// Interceptor automatycznie pobiera token z Redux store
const token = store.getState().auth.accessToken;
config.headers.Authorization = `Bearer ${token}`;
```

**Funkcje:**

- ✅ Automatyczne dodawanie tokena do nagłówka `Authorization`
- ✅ Logowanie requestów w trybie development
- ✅ Pobieranie tokena z Redux store (nie localStorage)

### Response Interceptor

**Obsługa 401 Unauthorized z Refresh Token:**

```typescript
if (status === 401 && !request._retry) {
  // 1. Spróbuj odświeżyć token
  const newToken = await refreshToken();

  // 2. Jeśli sukces - powtórz request
  // 3. Jeśli niepowodzenie - wyloguj użytkownika
}
```

**Kolejkowanie requestów:**

- Gdy trwa odświeżanie tokena, kolejne requesty są kolejkowane
- Po otrzymaniu nowego tokena, wszystkie kolejkowane requesty są wykonywane
- Unika wielokrotnego wywoływania refresh endpoint

**Obsługa błędów:**

| Status      | Akcja                                        |
| ----------- | -------------------------------------------- |
| **401**     | Próba refresh token → wylogowanie jeśli fail |
| **403**     | Toast: "Brak uprawnień"                      |
| **404**     | Toast: "Nie znaleziono zasobu"               |
| **500**     | Log pełnych szczegółów + Toast               |
| **Inne**    | Toast z komunikatem z API                    |
| **Network** | Toast: "Błąd połączenia"                     |

**Szczegółowe logowanie 500:**

```typescript
console.error('❌ Server Error (500):', {
  url: error.config?.url,
  method: error.config?.method,
  data: error.config?.data,
  response: error.response.data,
  stack: error.stack,
});
```

## 🏗️ Redux Store

### Auth Slice

**Stan:**

```typescript
interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
```

**Akcje:**

- `setUser(user)` - Ustawia dane użytkownika
- `setTokens({ accessToken, refreshToken })` - Ustawia tokeny
- `setLoading(bool)` - Zmienia stan ładowania
- `setError(message)` - Ustawia błąd
- `logout()` - Wylogowanie (czyści store i localStorage)
- `clearError()` - Usuwa błąd

**Użycie:**

```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';

const dispatch = useAppDispatch();
const { user, isAuthenticated } = useAppSelector(state => state.auth);

// Wylogowanie
dispatch(logout());
```

## 📦 Serwisy Modułowe

### 1. authService

**Login:**

```typescript
import { authService } from '@/services';

const authData = await authService.login({
  email: 'user@example.com',
  password: 'password123',
});
// Automatycznie zapisuje tokeny i użytkownika w Redux
```

**Dostępne metody:**

- `login(credentials)` - Logowanie
- `register(data)` - Rejestracja
- `logout()` - Wylogowanie
- `refreshToken(token)` - Odświeżanie tokena
- `resetPassword(data)` - Reset hasła
- `changePassword(data)` - Zmiana hasła
- `verifyEmail(token)` - Weryfikacja email
- `getCurrentUser()` - Pobierz profil
- `isAuthenticated()` - Sprawdź czy zalogowany
- `getAccessToken()` - Pobierz token

### 2. applicationService (Wnioski)

**Tworzenie wniosku:**

```typescript
import { applicationService } from '@/services';

const application = await applicationService.createApplication({
  type: 'individual',
  data: {
    firstName: 'Jan',
    lastName: 'Kowalski',
    email: 'jan@example.com',
    phone: '+48500000000',
    // ... więcej danych
  },
});
```

**Dostępne metody:**

- `getApplications(filters?, page, pageSize)` - Lista wniosków z filtrami
- `getApplicationById(id)` - Szczegóły wniosku
- `getMyApplications(page, pageSize)` - Moje wnioski
- `createApplication(data)` - Nowy wniosek
- `updateApplication(id, data)` - Aktualizacja (tylko draft)
- `submitApplication(id)` - Złożenie wniosku
- `updateStatus(id, status, reason?)` - Zmiana statusu (admin)
- `deleteApplication(id)` - Usunięcie (tylko draft)
- `cancelApplication(id)` - Anulowanie
- `getStatistics()` - Statystyki wniosków
- `exportApplications(filters?)` - Export do CSV

**Filtrowanie:**

```typescript
const applications = await applicationService.getApplications(
  {
    status: ['submitted', 'in_review'],
    type: 'business',
    dateFrom: new Date('2024-01-01'),
    dateTo: new Date('2024-12-31'),
    search: 'Kowalski',
  },
  1,
  20
);
```

**Statusy wniosków:**

- `draft` - Szkic
- `submitted` - Złożony
- `in_review` - W trakcie weryfikacji
- `approved` - Zatwierdzony
- `rejected` - Odrzucony
- `completed` - Zakończony
- `cancelled` - Anulowany

### 3. clientService

Zarządzanie klientami (bez zmian, istniejący serwis).

### 4. paymentService

Zarządzanie płatnościami (bez zmian, istniejący serwis).

## 🔔 Toast Notifications

**Konfiguracja:**

```typescript
<ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  theme="colored"
/>
```

**Użycie:**

```typescript
import { toast } from 'react-toastify';

toast.success('Operacja zakończona sukcesem!');
toast.error('Wystąpił błąd');
toast.warning('Uwaga!');
toast.info('Informacja');
```

**Automatyczne toasty:**

- ❌ Wszystkie błędy API automatycznie wyświetlają toast
- ✅ Nie musisz ręcznie obsługiwać wyświetlania błędów

## 📝 Typy TypeScript

### Auth Types (`src/types/auth.types.ts`)

- `LoginCredentials`
- `RegisterData`
- `AuthTokens`
- `AuthUser`
- `AuthResponse`
- `RefreshTokenResponse`
- `ResetPasswordData`
- `ChangePasswordData`
- `AuthState`

### Application Types (`src/types/application.types.ts`)

- `ApplicationStatus`
- `ApplicationType`
- `ApplicationData`
- `Application`
- `ApplicationFilters`
- `CreateApplicationDto`
- `UpdateApplicationDto`

## 🚀 Przykłady Użycia

### Logowanie z obsługą błędów

```typescript
import { authService } from '@/services';
import { toast } from 'react-toastify';

const handleLogin = async (email: string, password: string) => {
  try {
    await authService.login({ email, password });
    toast.success('Zalogowano pomyślnie!');
    navigate('/dashboard');
  } catch (error) {
    // Toast z błędem jest wyświetlony automatycznie przez interceptor
    console.error('Login failed:', error);
  }
};
```

### Tworzenie wniosku

```typescript
import { applicationService } from '@/services';
import { toast } from 'react-toastify';

const handleSubmit = async (formData: ApplicationData) => {
  try {
    const application = await applicationService.createApplication({
      type: 'individual',
      data: formData,
    });

    toast.success('Wniosek został utworzony!');
    navigate(`/applications/${application.id}`);
  } catch (error) {
    // Błąd obsłużony automatycznie
    console.error('Failed to create application:', error);
  }
};
```

### Komponent z autoryzacją

```typescript
import { useAppSelector } from '@/store/hooks';
import { Navigate } from 'react-router-dom';

function ProtectedPage() {
  const { isAuthenticated, user } = useAppSelector(state => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <h1>Witaj, {user?.firstName}!</h1>
    </div>
  );
}
```

### Automatyczne refresh token

```typescript
// Nie musisz niczego robić!
// Interceptor automatycznie:
// 1. Wykrywa 401
// 2. Próbuje odświeżyć token
// 3. Powtarza nieudany request
// 4. Jeśli refresh fail → wylogowuje

const data = await apiService.get('/protected-endpoint');
// Działa automatycznie, nawet jeśli token wygasł!
```

## 🔒 Bezpieczeństwo

✅ **Tokeny w Redux store** - nie w localStorage (XSS protection)  
✅ **Refresh token flow** - automatyczne odnawianie sesji  
✅ **Request queuing** - unika race conditions podczas refresh  
✅ **Automatic logout** - wylogowanie gdy refresh token wygasł  
✅ **Type safety** - pełne typowanie TypeScript  
✅ **Error handling** - centralna obsługa błędów

## 📊 Struktura Plików

```
src/
├── store/
│   ├── index.ts              # Redux store config
│   ├── hooks.ts              # Typed hooks
│   └── slices/
│       └── authSlice.ts      # Auth state management
├── services/
│   ├── api.ts                # Axios config + interceptors
│   ├── authService.ts        # Authentication API
│   ├── applicationService.ts # Applications API
│   ├── clientService.ts      # Clients API
│   ├── paymentService.ts     # Payments API
│   └── index.ts              # Export all services
└── types/
    ├── index.ts              # Common types
    ├── auth.types.ts         # Auth types
    └── application.types.ts  # Application types
```

## 🎯 Best Practices

1. **Zawsze używaj serwisów** - nie wywołuj axios bezpośrednio
2. **Używaj typed hooks** - `useAppDispatch`, `useAppSelector`
3. **Nie przechowuj tokenów w localStorage** - używaj Redux
4. **Pozwól interceptorom obsługiwać błędy** - nie duplikuj logiki
5. **Używaj toast tylko dla sukcesów** - błędy są automatyczne
6. **Definiuj typy w `types/`** - nie inline w komponentach

Wszystko gotowe! System jest w pełni funkcjonalny i production-ready! 🚀
