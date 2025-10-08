import { Box, Typography, Paper } from '@mui/material';

export default function Clients() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Klienci
      </Typography>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Tutaj będzie lista wszystkich klientów.
        </Typography>
      </Paper>
    </Box>
  );
}

