import { Box, Typography, Paper } from '@mui/material';

export default function NewApplication() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Nowy wniosek
      </Typography>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Tutaj będzie formularz do tworzenia nowego wniosku.
        </Typography>
      </Paper>
    </Box>
  );
}
