import { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Link } from '@mui/material';
import { authService } from '../services';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.resetPassword({ email });
      setIsSubmitted(true);
      toast.success('Link do resetowania hasła został wysłany na podany email');
    } catch (error) {
      toast.error(`Wystąpił błąd podczas wysyłania linku: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Box sx={{ maxWidth: 400, mx: 'auto' }}>
        <Paper sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Sprawdź email
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            Wysłaliśmy link do resetowania hasła na adres:{' '}
            <strong>{email}</strong>
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            Sprawdź swoją skrzynkę pocztową i kliknij w link, aby zresetować
            hasło.
          </Typography>

          <Box sx={{ textAlign: 'center' }}>
            <Link href="/login" variant="body2">
              Powrót do logowania
            </Link>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto' }}>
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Resetowanie hasła
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mb: 3 }}
        >
          Wprowadź swój email, a wyślemy Ci link do resetowania hasła
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? 'Wysyłanie...' : 'Wyślij link'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link href="/login" variant="body2">
              Powrót do logowania
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
