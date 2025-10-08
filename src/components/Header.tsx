import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { ThemeSwitcher } from './ThemeSwitcher';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: 1,
        borderColor: 'divider',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 'bold',
              letterSpacing: '-0.02em',
              '& .logo-i': {
                color: 'primary.main',
              },
              '& .logo-pay': {
                color: 'secondary.main',
              },
            }}
          >
            <span className="logo-i">i</span>
            <span className="logo-pay">Pay</span>
          </Typography>
        </Box>

        <ThemeSwitcher />
      </Toolbar>
    </AppBar>
  );
};

