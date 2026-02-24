import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Box, Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import "./navbar.css";

const navItems = [
  { path: "/Index", label: "Inicio" },
  { path: "/Login", label: "Login" },
  { path: "/Dashboard", label: "Dashboard" },
];
function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(90deg, #1A73E8 0%, #0D47A1 100%)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        py: 0.5,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between", height: "80px" }}>
          <img
            src="src/assets/patitasfelicesletra.png"
            alt="Logo"
            className="nav-logo"
          />

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </Box>

          {/* Mobile Toggle */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Drawer (Simplificado) */}
      <Box className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
      </Box>
    </AppBar>
  );
}

export default NavBar;
