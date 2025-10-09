import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Link,
} from '@mui/material';
import {
  Home as HomeIcon,
  List as ListIcon,
  Add as AddIcon,
  Star as StarIcon,
  Email as EmailIcon,
  Share as ShareIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
  Phone as PhoneIcon,
  Email as EmailContactIcon,
} from '@mui/icons-material';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  drawerWidth?: number;
}

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  divider?: boolean;
}

const menuItems: MenuItem[] = [
  { text: 'Panel Klienta', icon: <HomeIcon />, path: '/app' },
  { text: 'Lista wniosków', icon: <ListIcon />, path: '/app/applications' },
  { text: 'Nowy wniosek', icon: <AddIcon />, path: '/app/new-application' },
  { text: 'Program lojalnościowy', icon: <StarIcon />, path: '/app/loyalty' },
  { text: 'System poleceń', icon: <EmailIcon />, path: '/app/referrals' },
  { text: 'Udostępnij do aplikacji', icon: <ShareIcon />, path: '/app/share' },
  {
    text: 'Ubezpieczenie zakupów',
    icon: <SecurityIcon />,
    path: '/app/insurance',
  },
  { text: 'Ustawienia', icon: <SettingsIcon />, path: '/app/settings' },
  { text: 'Pomoc', icon: <HelpIcon />, path: '/app/help' },
  { text: 'Wyloguj się', icon: <LogoutIcon />, path: '/logout' },
];

export const Sidebar = ({ open, onClose, drawerWidth = 280 }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    if (path === '/logout') {
      // Handle logout logic here
      import('../services').then(({ authService }) => {
        authService.logout();
        navigate('/');
      });
      return;
    }
    navigate(path);
    onClose();
  };

  const drawer = (
    <Box
      sx={{
        overflow: 'auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
      }}
    >
      {/* Main Menu */}
      <Box sx={{ flexGrow: 1, py: 1 }}>
        <List sx={{ px: 1 }}>
          {menuItems.map(item => (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => handleNavigate(item.path)}
                sx={{
                  borderRadius: 1,
                  py: 1.5,
                  px: 2,
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                    // Ensure text label turns white when selected
                    '& .MuiListItemText-primary': {
                      color: 'white',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      location.pathname === item.path
                        ? 'white'
                        : 'text.secondary',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.95rem',
                    fontWeight: location.pathname === item.path ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Help Section */}
      <Box
        sx={{
          p: 3,
          borderTop: '1px dashed',
          borderColor: 'divider',
          bgcolor: 'background.default',
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, fontWeight: 500 }}
        >
          Potrzebujesz pomocy?
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Link
            href="/help"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'primary.main',
              textDecoration: 'underline',
              fontSize: '0.875rem',
              '&:hover': {
                color: 'primary.dark',
              },
            }}
          >
            <HelpIcon sx={{ fontSize: 18 }} />
            Dział pomocy
          </Link>

          <Link
            href="tel:+48508770470"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'primary.main',
              textDecoration: 'underline',
              fontSize: '0.875rem',
              '&:hover': {
                color: 'primary.dark',
              },
            }}
          >
            <PhoneIcon sx={{ fontSize: 18 }} />
            +48 508 770 470
          </Link>

          <Link
            href="mailto:wnioski@ipay24.pl"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'primary.main',
              textDecoration: 'underline',
              fontSize: '0.875rem',
              '&:hover': {
                color: 'primary.dark',
              },
            }}
          >
            <EmailContactIcon sx={{ fontSize: 18 }} />
            wnioski@ipay24.pl
          </Link>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            borderRight: 'none',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            borderRight: 'none',
            position: 'relative',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};
