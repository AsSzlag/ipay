import { Box, Typography, Paper } from '@mui/material';

export default function Help() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Pomoc
      </Typography>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Tutaj będzie centrum pomocy z FAQ, instrukcjami i kontaktem.
        </Typography>
      </Paper>
    </Box>
  );
}
