import "./Subindex.css";
import { Paper, Typography} from '@mui/material';
import WelcomeCard from '../../boxmensajes/boxs';
function Index() {
  return (
    <div className="contenedor-grid">
      <div className="header">
        <img
          src="./src/assets/patitasfelicesletra.png"
          className="imgh"
          alt="Logo"
        />
      </div>

      <div className="textintro">
        <Paper 
          variant="outlined" 
          sx={{ 
            p: { xs: 2, md: 4 },
            width: '100%',
            boxSizing: 'border-box',
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          {/* Usamos component="div" para que no haya errores al meter botones dentro */}
          <Typography variant="body1" component="div" sx={{ textAlign: 'center' }}>
            <p>¡El corazón de tu clínica, en un solo lugar! <br />
            <strong>¡Bienvenidos a la familia de Patitas Felices!</strong></p>
            
            <p>Nuestra plataforma es la herramienta aliada que tu veterinaria necesita.</p>
            <p>¡Entra ahora y descubre lo fácil que es hacer felices a más patitas!</p>
          </Typography>
            </Paper>
      </div>


      <div className="videointro">
        
      <WelcomeCard />
      
    </div>
        
     
    </div>
  );
}

export default Index;