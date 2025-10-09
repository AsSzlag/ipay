import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Chip,
  Badge,
  Button,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  EmojiEventsOutlined as LevelIcon,
  NotificationsNone as BellIcon,
  KeyboardArrowDown as ArrowDownIcon,
  InfoOutlined as InfoIcon,
} from '@mui/icons-material';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Logo } from '@components/Logo';

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
        zIndex: theme => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 72 }}>
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

          <Logo height="28px" />

          {/* Breadcrumbs */}
          <Breadcrumbs aria-label="breadcrumb" sx={{ ml: 3 }}>
            <Link underline="hover" color="inherit" href="/">
              iPay
            </Link>
            <Typography color="primary.main" fontWeight={600}>
              Lista wniosków
            </Typography>
          </Breadcrumbs>
        </Box>

        {/* Right side controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* Level / Points */}
          <Chip
            icon={<LevelIcon sx={{ color: 'primary.main' }} />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Srebrny (180 pkt.)
                </Typography>
                <InfoIcon sx={{ fontSize: 16, color: 'action.active' }} />
              </Box>
            }
            variant="outlined"
            sx={{
              borderRadius: 3,
              px: 1,
              '& .MuiChip-icon': { ml: 0.5 },
              bgcolor: 'background.paper',
            }}
          />

          {/* Notifications */}
          <IconButton color="inherit" aria-label="notifications">
            <Badge color="error" variant="dot" overlap="circular">
              <BellIcon />
            </Badge>
          </IconButton>

          {/* User menu */}
          <Button
            variant="outlined"
            color="inherit"
            endIcon={<ArrowDownIcon />}
            sx={{
              textTransform: 'none',
              borderRadius: 3,
              bgcolor: 'background.paper',
              color: 'text.primary',
              borderColor: 'divider',
              '&:hover': { borderColor: 'divider' },
              pl: 1,
              pr: 1,
            }}
          >
            <Avatar sx={{ width: 24, height: 24, mr: 1 }} />
            <Typography variant="body2">Jan Kowalski</Typography>
          </Button>

          {/* Keep existing theme switcher if desired */}
          <ThemeSwitcher />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
