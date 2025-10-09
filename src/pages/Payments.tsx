import { Box, Typography, Paper } from '@mui/material';

export default function Payments() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Płatności
      </Typography>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Tutaj będzie lista płatności i zarządzanie płatnościami.
        </Typography>
      </Paper>
    </Box>
  );
}
