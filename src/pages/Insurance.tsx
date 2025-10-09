import { Box, Typography, Paper } from '@mui/material';

export default function Insurance() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Ubezpieczenie zakupów
      </Typography>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Tutaj będzie system ubezpieczenia zakupów i zarządzanie polisami.
        </Typography>
      </Paper>
    </Box>
  );
}
