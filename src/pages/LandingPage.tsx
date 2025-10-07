import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
} from '@mui/material'
import {
  Person as PersonIcon,
  Business as BusinessIcon,
} from '@mui/icons-material'

export default function LandingPage() {
  const [selectedClientType, setSelectedClientType] = useState<'individual' | 'business'>('individual')
  const navigate = useNavigate()

  const handleContinue = () => {
    if (selectedClientType === 'individual') {
      navigate('/individual')
    } else {
      navigate('/business')
    }
  }

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', boxShadow: 3 }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'left' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Dopasuj ratę
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Czego potrzebujesz
          </Typography>
        </Box>
        
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 4 }}>
          <Button
            fullWidth
            variant={selectedClientType === 'individual' ? 'contained' : 'outlined'}
            onClick={() => setSelectedClientType('individual')}
            sx={{
              p: 3,
              height: 140,
              flexDirection: 'column',
              gap: 2,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
                transform: 'translateY(-2px)',
                boxShadow: 4,
              },
              transition: 'all 0.3s ease',
            }}
          >
            <PersonIcon sx={{ fontSize: 48 }} />
            <Typography variant="body1" fontWeight="medium">
              Klient indywidualny
            </Typography>
          </Button>
          
          <Button
            fullWidth
            variant={selectedClientType === 'business' ? 'contained' : 'outlined'}
            onClick={() => setSelectedClientType('business')}
            sx={{
              p: 3,
              height: 140,
              flexDirection: 'column',
              gap: 2,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
                transform: 'translateY(-2px)',
                boxShadow: 4,
              },
              transition: 'all 0.3s ease',
            }}
          >
            <BusinessIcon sx={{ fontSize: 48 }} />
            <Typography variant="body1" fontWeight="medium">
              Klient firmowy
            </Typography>
          </Button>
        </Stack>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleContinue}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              minWidth: 150,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 4,
              },
              transition: 'all 0.3s ease',
            }}
          >
            Kontynuuj
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
