# Struktura Layout Aplikacji

## 📐 Architektura

Aplikacja używa layoutu z trzema głównymi sekcjami:

```
┌─────────────────────────────────────┐
│           Header (Fixed)            │
├──────────┬──────────────────────────┤
│          │                          │
│ Sidebar  │       Content            │
│ (240px)  │       (Outlet)           │
│          │                          │
│          │                          │
└──────────┴──────────────────────────┘
```

## 🧩 Komponenty

### 1. **MainLayout** (`src/layouts/MainLayout.tsx`)
Główny komponent layoutu, który:
- Zarządza stanem sidebara (otwarty/zamknięty)
- Renderuje Header, Sidebar i Content
- Używa `<Outlet />` do wstrzykiwania widoków stron

### 2. **Header** (`src/components/Header.tsx`)
- Pozycja: `fixed` - zawsze widoczny na górze
- Zawiera:
  - Przycisk menu (hamburger) do toggleowania sidebara
  - Logo aplikacji "iPay"
  - ThemeSwitcher (przełącznik motywu)
- Z-index wyższy niż drawer

### 3. **Sidebar** (`src/components/Sidebar.tsx`)
- **Mobile** (< 768px): Temporary drawer (overlay)
- **Desktop** (≥ 768px): Permanent drawer (zawsze widoczny)
- Szerokość: 240px
- Menu nawigacyjne z ikonami:
  - Strona główna
  - Klient indywidualny
  - Klient biznesowy
  - Płatności
  - Klienci
  - Faktury
  - Analityka
  - Ustawienia

### 4. **Content Area**
- Elastyczna szerokość
- Padding: 24px
- Renderuje aktualnie wybraną stronę przez `<Outlet />`

## 📱 Responsywność

### Mobile (xs - sm)
- Sidebar: Temporary drawer (overlay)
- Otwiera się po kliknięciu przycisku menu
- Zamyka się automatycznie po wyborze opcji
- Content zajmuje pełną szerokość

### Desktop (md+)
- Sidebar: Permanent drawer (zawsze widoczny)
- Content: `calc(100% - 240px)` szerokości

## 🎨 Styling

Layout używa Material-UI theme system:
- `bgcolor: 'background.default'` - tło główne
- `bgcolor: 'background.paper'` - tło komponentów
- `borderColor: 'divider'` - kolory obramowań
- Automatyczne dostosowanie do light/dark mode

## 🔄 Routing

Wszystkie strony są renderowane wewnątrz MainLayout:

```tsx
<Route path="/" element={<MainLayout />}>
  <Route index element={<LandingPage />} />
  <Route path="individual" element={<IndividualClient />} />
  <Route path="business" element={<BusinessClient />} />
  <Route path="payments" element={<Payments />} />
  <Route path="clients" element={<Clients />} />
  <Route path="invoices" element={<Invoices />} />
  <Route path="analytics" element={<Analytics />} />
  <Route path="settings" element={<Settings />} />
  <Route path="*" element={<NotFound />} />
</Route>
```

## 🎯 Stan Aplikacji

### Sidebar State
- Zarządzany przez `useState` w MainLayout
- Funkcja `handleDrawerToggle()` przełącza widoczność
- Mobile: overlay (zamyka się po kliknięciu)
- Desktop: zawsze otwarty (ignoruje state)

## 📝 Dodawanie Nowych Stron

1. **Utwórz komponent strony** w `src/pages/`:
```tsx
// src/pages/NewPage.tsx
import { Box, Typography } from '@mui/material';

export default function NewPage() {
  return (
    <Box>
      <Typography variant="h4">Nowa Strona</Typography>
    </Box>
  );
}
```

2. **Dodaj route** w `App.tsx`:
```tsx
import NewPage from './pages/NewPage'

<Route path="new-page" element={<NewPage />} />
```

3. **Dodaj pozycję w menu** w `Sidebar.tsx`:
```tsx
const menuItems: MenuItem[] = [
  // ... existing items
  { text: 'Nowa Strona', icon: <NewIcon />, path: '/new-page' },
];
```

## 🚀 Użycie

Layout jest automatycznie stosowany do wszystkich stron zdefiniowanych w routingu. Nie musisz go importować w poszczególnych stronach - wystarczy utworzyć komponent strony i dodać route.

### Przykład strony:
```tsx
import { Box, Typography, Paper } from '@mui/material';

export default function MyPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Tytuł Strony
      </Typography>
      
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography>Treść strony...</Typography>
      </Paper>
    </Box>
  );
}
```

Content area automatycznie dostosuje się do rozmiaru ekranu i sidebara!

