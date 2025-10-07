import { Outlet } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Fab,
  Badge,
  Link,
} from '@mui/material'
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  Chat as ChatIcon,
} from '@mui/icons-material'
import { ThemeSwitcher } from '../components/ThemeSwitcher'

export default function MainLayout() {

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default',
    }}>
      {/* Header */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{
          bgcolor: 'transparent',
          color: 'text.primary',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Typography
              variant="h4"
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
            
            <ThemeSwitcher />
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Container maxWidth="md">
          <Outlet />
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          borderTop: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Potrzebujesz pomocy?
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <Link
                href="tel:+48508770470"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: 'primary.main',
                  textDecoration: 'underline',
                  '&:hover': {
                    color: 'primary.dark',
                  },
                }}
              >
                <PhoneIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2">+48 508 770 470</Typography>
              </Link>
              
              <Link
                href="mailto:wnioski@ipay24.pl"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: 'primary.main',
                  textDecoration: 'underline',
                  '&:hover': {
                    color: 'primary.dark',
                  },
                }}
              >
                <EmailIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2">wnioski@ipay24.pl</Typography>
              </Link>
            </Box>
            
            <Typography
              variant="h6"
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
        </Container>
      </Box>

      {/* Chat Widget */}
      <Fab
        color="primary"
        aria-label="chat"
        sx={{
          position: 'fixed',
          bottom: 100,
          right: 24,
          zIndex: 1000,
        }}
      >
        <Badge badgeContent={1} color="error">
          <ChatIcon />
        </Badge>
      </Fab>
    </Box>
  )
}