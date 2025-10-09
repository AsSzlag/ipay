import { Box, Typography, Paper, Button, Stack } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import { useNavigate } from 'react-router-dom';

export default function Applications() {
  const navigate = useNavigate();
  const hasApplications = false; // This would come from your state/API

  const handleCreateIndividualApplication = () => {
    navigate('/app/new-individual-application');
  };

  const handleCreateBusinessApplication = () => {
    navigate('/app/new-company-application');
  };

  if (!hasApplications) {
    return (
      <Paper elevation={2} sx={{ p: 3, maxWidth: 1200, mx: 'auto', mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 400 }}>
          Dopasuj ratę
        </Typography>

        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Czego potrzebujesz
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={handleCreateIndividualApplication}
            sx={{
              width: '100%',
            }}
          >
            <Stack direction="column" spacing={2} alignItems="center">
              <PersonIcon sx={{ fontSize: 32 }} />
              Klient indywidualny
            </Stack>
          </Button>

          <Button
            onClick={handleCreateBusinessApplication}
            variant="outlined"
            sx={{
              width: '100%',
            }}
          >
            <Stack direction="column" spacing={2} alignItems="center">
              <BusinessIcon sx={{ fontSize: 32 }} />
              Klient firmowy
            </Stack>
          </Button>
        </Box>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Lista wniosków
      </Typography>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Tutaj będzie lista wszystkich wniosków z możliwością filtrowania i
          zarządzania.
        </Typography>
      </Paper>
    </Box>
  );
}
