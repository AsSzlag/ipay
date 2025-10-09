import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  Divider,
  Checkbox,
  FormControlLabel,
  Container,
  Grid,
  IconButton,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Edit as EditIcon,
  Security as SecurityIcon,
  Shield as ShieldIcon,
} from '@mui/icons-material';
import { authService } from '../services';
import { toast } from 'react-toastify';
import { Logo } from '@components/Logo';

export default function Login() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await authService.login(formData);
      toast.success('Zalogowano pomyślnie!');
      navigate('/app/applications');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nieprawidłowy email lub hasło';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <EditIcon sx={{ fontSize: 40, color: '#003574' }} />,
      title: 'Szybka decyzja kredytowa',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: '#003574' }} />,
      title: 'Bezpieczne finansowanie online',
    },
    {
      icon: <ShieldIcon sx={{ fontSize: 40, color: '#003574' }} />,
      title: 'iPay Protect - ochrona transakcji',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: 'white',
          py: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate('/')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" color="text.primary">
            logowanie
          </Typography>
        </Box>
        <Logo height="32px" />
      </Box>

      {/* Navigation Link */}
      <Box sx={{ px: 3, py: 1 }}>
        <Link
          href="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textDecoration: 'none',
            color: 'text.secondary',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          Powrót do iPay.online
        </Link>
      </Box>

      {/* Main Content */}
      <Container maxWidth="sm" sx={{ flex: 1, py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              textTransform: 'uppercase',
              letterSpacing: 1,
              mb: 1,
              color: 'text.secondary',
            }}
          >
            PANEL KLIENTA
          </Typography>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
            }}
          >
            Zaloguj się, aby kontynuować
          </Typography>
        </Box>

        {/* Login Form */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            bgcolor: 'white',
            mb: 4,
          }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              type="email"
              placeholder="Wprowadź e-mail"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Hasło"
              name="password"
              type="password"
              placeholder="Wprowadź hasło"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              sx={{ mb: 2 }}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    size="small"
                  />
                }
                label="Zapamiętaj hasło"
                sx={{
                  '& .MuiFormControlLabel-label': { fontSize: '0.875rem' },
                }}
              />
              <Link
                href="/forgot-password"
                sx={{
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Nie pamiętasz hasła?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                py: 1.5,
                mb: 3,
                bgcolor: '#003574',
                '&:hover': { bgcolor: '#002a5c' },
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
            >
              {isLoading ? 'Logowanie...' : 'Zaloguj się'}
            </Button>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                lub
              </Typography>
            </Divider>

            {/* Social Login Buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={
                  <Box
                    component="img"
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0IDEyLjI3M0MyNCAxMS40MjE4IDIzLjk0NDUgMTAuNjA3MyAyMy44NTQ1IDkuODI3M0gyNC4wMDAwVjEyLjI3M1oiIGZpbGw9IjE4NzNGRiIvPgo8cGF0aCBkPSJNMTIuMDAwMSAyNEMxOC42MjcgMjQgMjQgMTguNjI3IDI0IDEyLjI3M0gxMi4wMDAxVjI0WiIgZmlsbD0iNDJBRTU1Ii8+CjxwYXRoIGQ9Ik0xMi4wMDAxIDkuODE4MThWMTIuMjczSDEyLjAwMDFWOS44MTgxOFoiIGZpbGw9IjQyQUU1NSIvPgo8cGF0aCBkPSJNMTIuMDAwMSAwQzUuMzczMDEgMCAwIDUuMzczMDEgMCAxMi4yNzNDMCAxOC42MjcgNS4zNzMwMSAyNCAxMi4wMDAxIDI0VjEyLjI3M0gxMi4wMDAxVjkuODE4MThIMTIuMDAwMVYwWiIgZmlsbD0iMTg3M0ZGIi8+Cjwvc3ZnPgo="
                    alt="Facebook"
                    sx={{ width: 20, height: 20 }}
                  />
                }
                sx={{
                  bgcolor: '#1877F2',
                  '&:hover': { bgcolor: '#166FE5' },
                  borderRadius: 2,
                  textTransform: 'none',
                  py: 1.5,
                }}
              >
                Kontynuuj przez Facebooka
              </Button>

              <Button
                fullWidth
                variant="outlined"
                startIcon={
                  <Box
                    component="img"
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIyLjU2IDEyLjI1QzIyLjU2IDExLjQ3IDIyLjQ5IDEwLjcyIDIyLjM3IDE5SDI0VjE0LjI1SDEyLjY5VjEwLjI1SDI0VjcuMjVIMTIuNjlWMy4yNUgyNC4wMUMyNC4wMSAxLjM5IDIyLjU2IDAgMjAuNjkgMEg3LjMxQzUuNDQgMCA0IDEuMzkgNCAzLjI1VjIwLjc1QzQgMjIuNjEgNS40NCAyNCA3LjMxIDI0SDIwLjY5QzIyLjU2IDI0IDI0IDIyLjYxIDI0IDIwLjc1VjE0LjI1SDIyLjU2VjEyLjI1WiIgZmlsbD0iIzQyODVGNCIvPgo8L3N2Zz4K"
                    alt="Google"
                    sx={{ width: 20, height: 20 }}
                  />
                }
                sx={{
                  borderColor: '#dadce0',
                  color: '#3c4043',
                  '&:hover': {
                    borderColor: '#dadce0',
                    bgcolor: '#f8f9fa',
                  },
                  borderRadius: 2,
                  textTransform: 'none',
                  py: 1.5,
                }}
              >
                Kontynuuj przez konto Google
              </Button>

              <Button
                fullWidth
                variant="contained"
                startIcon={
                  <Box
                    component="img"
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDBDNS4zNzMgMCAwIDUuMzczIDAgMTJTNS4zNzMgMjQgMTIgMjRTMjQgMTguNjI3IDI0IDEyUzE4LjYyNyAwIDEyIDBaTTE2LjYgMTUuNkMxNi4yIDE2IDE1LjYgMTYuMiAxNSAxNi4ySDlDOC40IDE2LjIgNy44IDE2IDcuNCAxNS42QzcgMTUuMiA2LjggMTQuNiA2LjggMTRWMTBDNi44IDkuNCA3IDguOCA3LjQgOC40QzcuOCA4IDguNCA3LjggOSA3LjhIMTVDMTUuNiA3LjggMTYuMiA4IDE2LjYgOC40QzE3IDguOCAxNy4yIDkuNCAxNy4yIDEwVjE0QzE3LjIgMTQuNiAxNyAxNS4yIDE2LjYgMTUuNloiIGZpbGw9IiMwMDAwMDAiLz4KPC9zdmc+Cg=="
                    alt="Apple"
                    sx={{ width: 20, height: 20 }}
                  />
                }
                sx={{
                  bgcolor: '#000000',
                  '&:hover': { bgcolor: '#333333' },
                  borderRadius: 2,
                  textTransform: 'none',
                  py: 1.5,
                }}
              >
                Kontynuuj przez konto Apple
              </Button>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Link
                href="/register"
                sx={{
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Nie masz jeszcze konta? Dołącz do nas &gt;
              </Link>
            </Box>
          </Box>
        </Paper>

        {/* Features Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 3,
                  bgcolor: 'white',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 'medium',
                    color: 'text.primary',
                    textAlign: 'center',
                  }}
                >
                  {feature.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: 'white',
          py: 3,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Potrzebujesz pomocy?
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              +48 508 770 470
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              info@ipay.online
            </Typography>
          </Box>
        </Box>
        <Logo height="32px" />
      </Box>
    </Box>
  );
}
