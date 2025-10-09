import { Box, Typography, Paper } from '@mui/material';

export default function Loyalty() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Program lojalnościowy
      </Typography>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Tutaj będzie program lojalnościowy z punktami i nagrodami.
        </Typography>
      </Paper>
    </Box>
  );
}
