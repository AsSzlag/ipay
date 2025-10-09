import { Box, Typography, Paper } from '@mui/material';

export default function Share() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Udostępnij do aplikacji
      </Typography>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Tutaj będzie możliwość udostępniania aplikacji i generowania linków
          polecających.
        </Typography>
      </Paper>
    </Box>
  );
}
