import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
} from '@mui/material';
import {
  Person as PersonIcon,
  Business as BusinessIcon,
  Login as LoginIcon,
  PersonAdd as RegisterIcon,
} from '@mui/icons-material';

export default function LandingPage() {
  const [selectedClientType, setSelectedClientType] = useState<
    'individual' | 'business'
  >('individual');
  const navigate = useNavigate();

  const handleClientSelect = (type: 'individual' | 'business') => {
    setSelectedClientType(type);
    // Auto-navigate when selection is made
    if (type === 'individual') {
      navigate('/app/new-application');
    } else {
      navigate('/app/new-application');
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
        mx: 'auto',
        boxShadow: 3,
        borderRadius: 4,
        overflow: 'visible',
      }}
    >
      <CardContent sx={{ p: 5 }}>
        <Box sx={{ mb: 5, textAlign: 'left' }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem' },
              fontWeight: 700,
              color: 'text.primary',
              mb: 1,
            }}
          >
            Dopasuj ratę
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              fontSize: '1.1rem',
              fontWeight: 400,
            }}
          >
            Czego potrzebujesz
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={0}
          sx={{
            mb: 0,
            '& .MuiButton-root': {
              borderRadius: 0,
              borderRightWidth: 0,
              '&:last-child': {
                borderRightWidth: 1,
              },
            },
          }}
        >
          <Button
            fullWidth
            variant={
              selectedClientType === 'individual' ? 'contained' : 'outlined'
            }
            onClick={() => handleClientSelect('individual')}
            sx={{
              p: 3,
              height: 140,
              flexDirection: 'column',
              gap: 2,
              borderWidth: 1,
              borderColor: 'divider',
              borderRadius: '12px 0 0 12px',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 4,
                borderWidth: 1,
              },
              transition: 'all 0.3s ease',
              ...(selectedClientType === 'individual' && {
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }),
            }}
          >
            <PersonIcon sx={{ fontSize: 48 }} />
            <Typography
              variant="body1"
              fontWeight="medium"
              sx={{ fontSize: '1rem' }}
            >
              Klient indywidualny
            </Typography>
          </Button>

          <Button
            fullWidth
            variant={
              selectedClientType === 'business' ? 'contained' : 'outlined'
            }
            onClick={() => handleClientSelect('business')}
            sx={{
              p: 3,
              height: 140,
              flexDirection: 'column',
              gap: 2,
              borderWidth: 1,
              borderColor: 'divider',
              borderRadius: '0 12px 12px 0',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 4,
                borderWidth: 1,
              },
              transition: 'all 0.3s ease',
              ...(selectedClientType === 'business' && {
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }),
            }}
          >
            <BusinessIcon sx={{ fontSize: 48 }} />
            <Typography
              variant="body1"
              fontWeight="medium"
              sx={{ fontSize: '1rem' }}
            >
              Klient firmowy
            </Typography>
          </Button>
        </Stack>

        {/* Auth Actions */}
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<LoginIcon />}
            onClick={() => navigate('/login')}
            sx={{ minWidth: 140 }}
          >
            Zaloguj się
          </Button>
          <Button
            variant="contained"
            startIcon={<RegisterIcon />}
            onClick={() => navigate('/register')}
            sx={{ minWidth: 140 }}
          >
            Zarejestruj się
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
