import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import AdbIcon from '@mui/icons-material/Adb';
import { Box, Grid, Toolbar, Tooltip, MenuItem, IconButton, Menu } from '@mui/material';
import Link from 'next/link';
import { AuthContext } from '../component/option/AuthContext';
import jwt_decode from 'jwt-decode';





export default function Navbar() {
  const { logoutUser } = React.useContext(AuthContext);

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [checks, setChecks] = React.useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    const checkData = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        // Decode the token to extract the email or username
        const decodedToken = jwt_decode(token);
        const email = decodedToken.email;
        // Set the checks state to true if token and email exist
        setChecks(true);
      } else {
        setChecks(false);
      }
    };

    checkData(); // Call the checkData function
  }, []);

  return (
    <>
      <AppBar position="sticky" sx={{ zIndex: 0, background: 'rgba(0, 0, 0, 0.7)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Grid container justifyContent="space-between" sx={{ width: '100%' }}>
              <Grid item xs={1} sx={{ justifyContent: 'center', display: 'flex' }}>
                <Tooltip title="Homepage">
                  <Link href="/home/">
                    <Avatar
                      src="/home.svg"
                      style={{
                        filter:
                          'brightness(0) saturate(100%) invert(25%) sepia(100%) saturate(4483%) hue-rotate(343deg) brightness(87%) contrast(118%)',
                      }}
                      width={65}
                      height={65}
                    />
                  </Link>
                </Tooltip>
              </Grid>

              <Grid item xs={1} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <Tooltip title="Help Help">
                  <Link href="help">
                    <Avatar
                      src="/network.svg"
                      style={{
                        filter:
                          'brightness(0) saturate(100%) invert(25%) sepia(100%) saturate(4483%) hue-rotate(343deg) brightness(87%) contrast(118%)',
                      }}
                      width={65}
                      height={65}
                    />
                  </Link>
                </Tooltip>
              </Grid>

              <Grid item xs={1} sx={{ justifyContent: 'center', display: 'flex' }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      style={{
                        filter:
                          'brightness(0) saturate(100%) invert(25%) sepia(100%) saturate(4483%) hue-rotate(343deg) brightness(87%) contrast(118%)',
                      }}
                      width={67}
                      height={67}
                      src="/account.svg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {checks ? (
                    <>
                      <Link href="/home/profile">
                        <MenuItem>Profile</MenuItem>
                      </Link>
                      <MenuItem onClick={() => { logoutUser(); window.location.reload(); }}>Logout</MenuItem>
                    </>
                  ) : (
                    <>
                      <Link href="/home/login">
                        <MenuItem>Login</MenuItem>
                      </Link>
                      <Link href="/home/signup">
                        <MenuItem>SignUp</MenuItem>
                      </Link>
                    </>
                  )}
                </Menu>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
