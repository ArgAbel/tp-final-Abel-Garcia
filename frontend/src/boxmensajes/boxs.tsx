import { Paper, Typography, Box, Button, Container, Grid } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

const LandingPatitas = () => {
  // 2. Inicializa la función navigate
  const navigate = useNavigate();

const handleLoginRedirect = () => {
    navigate('/login'); // Asegúrate de que esta ruta coincida con la de tu App.tsx
  };

  const testimonios = [
    { nombre: "Dra. Laura", texto: "El orden en la clínica es otro nivel." },
    { nombre: "Vet. Huellas", texto: "Intuitivo y fácil de usar." },
    { nombre: "Carlos Ruiz", texto: "Gestión de inventario rápida." },
    { nombre: "Dra. Elena", texto: "Diseño cálido y profesional." }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      p: 2,
      background: 'linear-gradient(135deg, #f9fbf7 0%, #ebf0e6 100%)',
      overflow: 'hidden' 
    }}>
      <Container maxWidth="lg">
        
        {/* PANEL DE BIENVENIDA */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 2, md: 3 }, 
            textAlign: 'center', 
            borderRadius: 4, 
            mb: 3, 
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #d1d9cc'
          }}
        >
          <PetsIcon sx={{ fontSize: 30, color: '#7a8d6e', mb: 1 }} />
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 800, 
              color: '#5a6b4d', 
              fontSize: { xs: '1.4rem', md: '2.2rem' },
              lineHeight: 1.2
            }}
          >
            Bienvenidos a Patitas Felices
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ color: 'text.secondary', mt: 1, mb: 1, maxWidth: '500px', mx: 'auto' }}
          >
            Administración Sistem: Gestión eficiente con el corazón puesto en cada mascota.
          </Typography>
        </Paper>

        {/* CONTENEDOR DE TESTIMONIOS */}
        <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
          {testimonios.map((t, index) => (
            /* Eliminamos 'item' para evitar el error de TypeScript y usamos las props de tamaño directamente */
            <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper 
                sx={{ 
                  p: 2, 
                  textAlign: 'center',
                  borderRadius: 3,
                  border: '1px solid #e0e0e0',
                  // Ancho máximo solicitado
                  maxWidth: { md: '23vw', xs: '100%' }, 
                  height: '100%',
                  minHeight: '110px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  mx: 'auto',
                  transition: '0.3s',
                  '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} sx={{ fontSize: 14, color: '#ffb400' }} />
                  ))}
                </Box>
                <Typography 
                  variant="subtitle2" 
                  sx={{ fontWeight: 'bold', color: '#5a6b4d', fontSize: '0.85rem' }}
                >
                  {t.nombre}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ color: 'text.secondary', fontStyle: 'italic', lineHeight: 1.1 }}
                >
                  "{t.texto}"
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* BOTÓN DE ACCIÓN (Fuera del Grid para mejor control) */}
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Button 
            variant="contained" 
            onClick={handleLoginRedirect}
            sx={{ 
              bgcolor: '#7a8d6e', 
              borderRadius: 8, 
              px: 6, 
              py: 1.5,
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
              boxShadow: '0 4px 14px rgba(122, 141, 110, 0.4)',
              '&:hover': { bgcolor: '#5a6b4d' }
            }}
          >
            Iniciar Sesión
          </Button>
        </Box>
     
      </Container>
    </Box>
  );
};

export default LandingPatitas;