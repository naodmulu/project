import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import HealingIcon from "@mui/icons-material/Healing";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";

export const MNavbar = () => {
  let username = localStorage.getItem("username");
  let speciality = "Heart Specialist";

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const handleHomeButton = () => {
    navigate("/home");
  };

  const handleLogout = () => {
    fetch("http://127.0.0.1:5000/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");
        navigate("/");
      })
      .catch((error) => console.error("Error:", error));
  };
  // username recieved from app.tsx

  return (
    <Box  sx={{ mb: 20 }}>
      <AppBar sx={{ backgroundColor: "#06b6d4", height: "80px" }}>
        <Toolbar sx={{ p: 1 }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <HealingIcon onClick={handleHomeButton} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Logo Here
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            size="medium"
            onClick={handleMenu}
            id="profile-button"
            aria-controls={open ? "profile-menu" : undefined}
            aria-expaned={open ? "true" : undefined}
            aria-haspopup="true"
          >
            {/* <AccountCircleIcon /> */}
            <Avatar sizes="large">{username.charAt(0).toUpperCase()}</Avatar>
          </IconButton>
          <Menu
            id="profile-menu"
            MenuListProps={{ "aria-labelledby": "profile-button" }}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "200px",
                width: 200,
                m: 1,
                p: 1,
              }}
            >
              <Box className="flex flex-col items-center pb-10 mb-1">
                <Box
                  sx={{
                    width: "100%",
                    m: "auto",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Avatar sx={{ width: 36, height: 36, m: "auto" }}>
                    {username.charAt(0).toUpperCase()}
                  </Avatar>
                  <Button>Change Profile</Button>
                </Box>
                <Box className="flex items-center">
                  <Typography
                    variant="h6"
                    component="div"
                    className="mb-1 text-xl font-medium text-gray-900"
                  >
                    {username}
                  </Typography>
                  <IconButton size="small">
                    <EditIcon />
                  </IconButton>
                </Box>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {speciality}
                </span>
              </Box>
              <Box className="flex flex-col items-center mt-6">
                <Button onClick={handleLogout}>Logout</Button>
              </Box>
            </Box>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MNavbar;
