import React, { useState} from 'react';
import type {ChangeEvent, FormEvent } from 'react';
import { 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  Container, 
  Box, 
  Link, 
  Alert,
  CircularProgress,
  InputAdornment
  } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';



// Interfaces basadas en tus validadores de express-validator
interface AuthFormData {
  username?: string;
  email: string;
  password: string;
  role:'veterinario';
}

interface AuthResponse {
  token?: string;
  message?: string;
  errors?: unknown[];
}

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<AuthFormData>({
    username: '',
    email: '',
    password: '',
    role: 'veterinario',
  });
  const [status, setStatus] = useState<{ type: 'error' | 'success'; msg: string } | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const endpoint = isRegister 
      ? 'http://localhost:3000/login/register' 
      : 'http://localhost:3000/login';

    // Construimos el payload según lo que espera cada validador
    const payload: AuthFormData = isRegister 
      ? formData 
      : { email: formData.email, password: formData.password, role: formData.role };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data: AuthResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ocurrió un error en la autenticación');
      }

      if (isRegister) {
        setStatus({ type: 'success', msg: 'Registro exitoso. Ya puedes iniciar sesión.' });
        setIsRegister(false); // Cambiamos a modo login tras registrarse
      } else if (data.token) {
        localStorage.setItem('token', data.token);
        setStatus({ type: 'success', msg: 'Login correcto. Redirigiendo...' });
        navigate('/dashboard');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setStatus({ type: 'error', msg: err.message });
      } else {
        // En caso de que lo que se lance no sea un objeto Error estándar
        setStatus({ type: 'error', msg: 'Error desconocido' });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper 
        elevation={6} 
        sx={{ 
          mt: 8, 
          p: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          borderRadius: 2 
        }}
      >
        <Typography component="h1" variant="h5" fontWeight="bold">
          {isRegister ? 'Crear Cuenta' : 'Bienvenido'}
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2, width: '100%' }}>
          
          {isRegister && (
            <>
            <TextField
            margin="normal"
            fullWidth
            label="Rol de usuario"
            name="role"
            value={formData.role}
            disabled // Esto lo deshabilita visualmente y bloquea edición
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            helperText="Este valor es asignado por defecto"
          />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              autoComplete="username"
              value={formData.username}
              onChange={handleChange}
              // Validación espejo de tu .isLength({ max: 50, min: 3 })
              inputProps={{ minLength: 3, maxLength: 50 }}
            />
          </>)}
          
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            // Validación espejo de tu .isLength({ min: 6 })
            inputProps={{ minLength: 6 }}
          />

          {status && (
            <Alert severity={status.type} sx={{ mt: 2, width: '100%' }}>
              {status.msg}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2, py: 1.2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : (isRegister ? 'Registrarse' : 'Entrar')}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Link 
              component="button" 
              type="button"
              variant="body2" 
              onClick={() => {
                setIsRegister(!isRegister);
                setStatus(null);
              }}
              sx={{ textDecoration: 'none', fontWeight: 'medium' }}
            >
              {isRegister ? "¿Ya tienes cuenta? Inicia Sesión" : "¿No tienes cuenta? Regístrate gratis"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthForm;