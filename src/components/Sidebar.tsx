import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Divider,
  Typography,
} from '@mui/material';
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Payment as PaymentIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
  Receipt as ReceiptIcon,
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
  { text: 'Strona główna', icon: <HomeIcon />, path: '/' },
  { text: 'Klient indywidualny', icon: <PersonIcon />, path: '/individual' },
  { text: 'Klient biznesowy', icon: <BusinessIcon />, path: '/business' },
  { text: 'Płatności', icon: <PaymentIcon />, path: '/payments', divider: true },
  { text: 'Klienci', icon: <PeopleIcon />, path: '/clients' },
  { text: 'Faktury', icon: <ReceiptIcon />, path: '/invoices' },
  { text: 'Analityka', icon: <AnalyticsIcon />, path: '/analytics', divider: true },
  { text: 'Ustawienia', icon: <SettingsIcon />, path: '/settings' },
];

export const Sidebar = ({ open, onClose, drawerWidth = 240 }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const drawer = (
    <Box sx={{ overflow: 'auto' }}>
      <Toolbar />
      
      <Box sx={{ px: 2, py: 2 }}>
        <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 600 }}>
          Menu
        </Typography>
      </Box>

      <List>
        {menuItems.map((item) => (
          <Box key={item.path}>
            <ListItem disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => handleNavigate(item.path)}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: location.pathname === item.path ? 'inherit' : 'text.secondary',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
            {item.divider && <Divider sx={{ my: 1 }} />}
          </Box>
        ))}
      </List>
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
            borderRight: 1,
            borderColor: 'divider',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};

