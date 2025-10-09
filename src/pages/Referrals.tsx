import { Box, Typography, Paper } from '@mui/material';

export default function Referrals() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        System poleceń
      </Typography>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Tutaj będzie system poleceń i zarządzanie poleconymi klientami.
        </Typography>
      </Paper>
    </Box>
  );
}
