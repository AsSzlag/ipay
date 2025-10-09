import { Box, Typography, Paper } from '@mui/material';

export default function Invoices() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Faktury
      </Typography>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Tutaj będzie system fakturowania.
        </Typography>
      </Paper>
    </Box>
  );
}
