import { Box, Typography, Paper } from '@mui/material';

export default function Analytics() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Analityka
      </Typography>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Tutaj będą statystyki i wykresy analityczne.
        </Typography>
      </Paper>
    </Box>
  );
}
