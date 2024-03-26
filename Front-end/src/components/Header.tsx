import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import { Link } from "react-router-dom";
import { userStore } from "../zustand/UserStore";
import { clearUserInfo } from "../utils";

const pages = [
  { label: "Trips", link: "trips" },
  { label: "Places", link: "places" },
  { label: "About us", link: "about" },
];
const settings = [
  { label: "Login", link: "login" },
  { label: "Signup", link: "signup" },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const user = userStore((state) => state.user);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "white",
        color: "black",
        boxShadow: "0px 0px 8px lightgrey",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            to="/"
            style={{
              color: "var(--green-color)",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <ShareLocationIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
              }}
              fontSize="large"
            />
            <Typography
              variant="h4"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                alignItems: "center",
              }}
              fontSize={"small"}
            >
              Travel
              <br></br>
              Helper
            </Typography>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "flex",
                md: "none",
              },
              color: "inherit",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                justifyContent: "center",
              }}
            >
              {pages.map((page, i) => (
                <MenuItem key={i} onClick={handleCloseNavMenu}>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    to={page.link}
                  >
                    {page.label}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link
            to="/"
            style={{
              display: "flex",
              flexGrow: 1,
              color: "var(--green-color)",
              textDecoration: "none",
            }}
          >
            <ShareLocationIcon
              sx={{
                mr: 1,
                display: { xs: "flex", md: "none" },
                fontSize: "large",
              }}
            />
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                display: { xs: "flex", md: "none" },
                fontSize: "small",
              }}
            >
              Travel<br></br>Helper
            </Typography>
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page, i) => (
              <Button
                key={i}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "inherit", display: "block" }}
              >
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  to={page.link}
                >
                  {page.label}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user?.image ? (
                  <div className="user-image">
                    <img src={user.image} alt="" />
                  </div>
                ) : (
                  <AccountCircleIcon fontSize="large" />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user ? (
                <>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link to="userProfile" className="header-link">
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link to="reservations" className="header-link">
                      My Reservations
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      clearUserInfo();
                      handleCloseUserMenu();
                    }}
                  >
                    Logout
                  </MenuItem>
                </>
              ) : (
                settings.map((setting, i) => (
                  <MenuItem key={i} onClick={handleCloseUserMenu}>
                    <Link to={setting.link} className="header-link">
                      {setting.label}
                    </Link>
                  </MenuItem>
                ))
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
