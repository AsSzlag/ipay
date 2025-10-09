import React from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
} from '@mui/material';
import {
  Palette as PaletteIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Contrast as HighContrastIcon,
} from '@mui/icons-material';
import { useTheme } from '../hooks/useTheme';
import { type ThemeMode } from '../theme/themes';

interface ThemeOption {
  mode: ThemeMode;
  label: string;
  icon: React.ReactElement;
  description: string;
}

const themeOptions: ThemeOption[] = [
  {
    mode: 'normal',
    label: 'Normal',
    icon: <LightModeIcon />,
    description: 'Light theme with brand colors',
  },
  {
    mode: 'dark',
    label: 'Dark',
    icon: <DarkModeIcon />,
    description: 'Dark theme for low light',
  },
  {
    mode: 'highContrast',
    label: 'High Contrast',
    icon: <HighContrastIcon />,
    description: 'WCAG AAA compliant theme',
  },
];

export const ThemeSwitcher: React.FC = () => {
  const { themeMode, setThemeMode } = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeSelect = (mode: ThemeMode) => {
    setThemeMode(mode);
    handleClose();
  };

  const currentTheme = themeOptions.find(option => option.mode === themeMode);

  return (
    <>
      <Tooltip title={`Current theme: ${currentTheme?.label}`}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            ml: 1,
            color: 'inherit',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
          aria-label="Change theme"
        >
          <PaletteIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            minWidth: 200,
            '& .MuiMenuItem-root': {
              py: 1.5,
            },
          },
        }}
      >
        {themeOptions.map(option => (
          <MenuItem
            key={option.mode}
            onClick={() => handleThemeSelect(option.mode)}
            selected={themeMode === option.mode}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>{option.icon}</ListItemIcon>
            <ListItemText
              primary={option.label}
              secondary={
                <Typography variant="caption" color="text.secondary">
                  {option.description}
                </Typography>
              }
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
