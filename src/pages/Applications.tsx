import { Box, Typography, Paper } from '@mui/material';

export default function Applications() {
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
