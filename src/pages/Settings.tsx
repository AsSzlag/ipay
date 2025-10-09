import { Box, Typography, Paper } from '@mui/material';

export default function Settings() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Ustawienia
      </Typography>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Tutaj będą ustawienia aplikacji i konta użytkownika.
        </Typography>
      </Paper>
    </Box>
  );
}
