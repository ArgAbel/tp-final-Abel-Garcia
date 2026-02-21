import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, Typography, TextField, Button, Checkbox, 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Stack, Divider, ButtonGroup, ThemeProvider, createTheme,
  Dialog, DialogTitle, DialogContent, DialogActions, Container
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Refresh as RefreshIcon, 
  Add as AddIcon, 
  Save as SaveIcon, 
  Delete as DeleteIcon 
} from '@mui/icons-material';
import { getAuthHeaders } from '../../utils/headers';
import './dashboard.css';
import { 
  Snackbar, 
  Alert,  
} from '@mui/material';

// --- CONFIGURACIÓN Y TIPOS ---
const API_BASE = 'http://localhost:3000';
const theme = createTheme();

// --- CONFIGURACIÓN DE CAMPOS POR ENTIDAD ---
// Esto define qué campos pedirá el Modal al crear un nuevo registro
const ENTITY_SCHEMAS: Record<string, string[]> = {
  usuarios: ['username', 'email', 'password', 'role'],
  mascotas: ['name', 'race', 'b_date', 'dueno_id'],
  duenos: ['name', 'lastname', 'adress', 'phone'],
  hclinica: ['text', 'user_id', 'mascotaid']
};

type EntityType = 'usuarios' | 'mascotas' | 'duenos' | 'hclinica';

interface Entity {
  id: string | number;
  [key: string]: string | number | boolean | null | undefined;
}

interface MasterCRUDProps {
  entityName: EntityType;
  title: string;
  onAuthError: () => void;
}

const MasterCRUD: React.FC<MasterCRUDProps> = ({ entityName, title, onAuthError }) => {
  const [data, setData] = useState<Entity[]>([]);
  const [searchId, setSearchId] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  const [formFields, setFormFields] = useState<Partial<Entity>>({});
  
 
  // Estado para el Modal de Creación
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [newEntry, setNewEntry] = useState<Record<string, string>>({});

  const endpoint = `${API_BASE}/${entityName}`;

  // 1. GET ALL
  const handleFetchAll = useCallback(async () => {
    try {
      const response = await fetch(endpoint, { headers: getAuthHeaders() });
      if (response.status === 401 ||response.status === 403) {
      onAuthError(); // Disparamos la alerta llamativa en el Dashboard
      setData([]);   // Limpiamos la tabla por seguridad
      return;        // Salimos de la función
    }

    // 2. Si no es 401 pero hay otro error (ej. 500, 404)
    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status}`);
    }

    // 3. Procesamos los datos si todo salió bien
    const result = await response.json();
    setData(Array.isArray(result) ? result : result ? [result] : []);
    setSelectedItem(null);
    setFormFields({});
    
  } catch (error) { 
    console.error("Error cargando datos:", error);
    // Opcional: podrías limpiar la tabla también en caso de error de red
    setData([]); 
  }
}, [endpoint, onAuthError]); // Importante añadir onAuthError a las dependencias
      /*const result = await response.json();
      setData(Array.isArray(result) ? result : result ? [result] : []);
      setSelectedItem(null);
      setFormFields({});
    } catch (error) { console.error("Error cargando datos:", error); }
  }, [endpoint]);*/

  useEffect(() => { handleFetchAll(); }, [handleFetchAll]);

  // 2. GET BY ID (Botón Buscar)
  const handleFetchById = async () => {
    if (!searchId) return;
    try {
      const response = await fetch(`${endpoint}/${searchId}`, { headers: getAuthHeaders() });
      if (!response.ok) throw new Error();
      const result = await response.json();
      setData(result ? [result] : []);
    } catch { 
      setData([]); 
      alert("No se encontró el registro");
    }
  };

  // 3. POST (Botón Crear - Abre Modal)
  const handleOpenModal = () => {
    // Inicializamos el objeto de nueva entrada con campos vacíos según el esquema
    const schema = ENTITY_SCHEMAS[entityName] || [];
    const initialFields = schema.reduce((acc, curr) => ({ ...acc, [curr]: '' }), {});
    setNewEntry(initialFields);
    setOpenCreateModal(true);
  };

  const handleConfirmCreate = async () => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      });
      if (response.ok) {
        setOpenCreateModal(false);
        handleFetchAll();
      }
    } catch (error) { console.error(error); }
  };

  // 4. PUT (Botón Actualizar)
  const handleUpdate = async () => {
    if (!selectedItem?.id) return;
    try {
      await fetch(`${endpoint}/${selectedItem.id}`, {
        method: 'PUT',
        headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(formFields),
      });
      handleFetchAll();
    } catch (error) { console.error(error); }
  };

  // 5. DELETE (Botón Borrar)
  const handleDelete = async () => {
    if (!selectedItem?.id || !window.confirm("¿Estás seguro de eliminar este registro?")) return;
    try {
      const response = await fetch(`${endpoint}/${selectedItem.id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (response.ok) {
        alert("Registro desactivado correctamente.");
        setSelectedItem(null);
        handleFetchAll(); // Esto traerá la lista filtrada (sin el desactivado)
      }
    } catch (error) {
      console.error(error);
      alert("No se puede eliminar");
    };
  };
  // --- HANDLERS DE UI ---
  const handleCheckboxChange = (item: Entity) => {
    if (selectedItem?.id === item.id) {
      setSelectedItem(null);
      setFormFields({});
    } else {
      setSelectedItem(item);
      setFormFields({ ...item });
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>

      {/* BARRA DE ACCIONES */}
      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Buscar por ID"
            variant="outlined"
            fullWidth
            size="small"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <Button variant="contained" onClick={handleFetchById} startIcon={<SearchIcon />}>
            Buscar
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleFetchAll} startIcon={<RefreshIcon />}>
            Refrescar
          </Button>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={handleOpenModal}>
            Crear Nuevo
          </Button>
          <Button variant="contained" color="warning" startIcon={<SaveIcon />} onClick={handleUpdate} disabled={!selectedItem}>
            Guardar Cambios
          </Button>
          <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleDelete} disabled={!selectedItem}>
            Eliminar
          </Button>
        </Stack>
      </Paper>

      {/* TABLA DE DATOS */}
      <TableContainer component={Paper} elevation={4} sx={{height: '400px', overflowY: 'auto'}}>
        <Table>
          <TableHead sx={{ bgcolor: '#eeeeee' }}>
            <TableRow>
              <TableCell padding="checkbox">Selección</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Detalles (Editable al seleccionar)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id} hover selected={selectedItem?.id === item.id}>
                <TableCell padding="checkbox">
                  <Checkbox checked={selectedItem?.id === item.id} onChange={() => handleCheckboxChange(item)} />
                </TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {Object.keys(item).filter(k => k !== 'id').map((key) => (
                      <TextField
                        key={`${item.id}-${key}`}
                        label={key}
                        size="small"
                        variant="standard"
                        value={selectedItem?.id === item.id ? (formFields[key] ?? '') : (item[key] ?? '')}
                        onChange={(e) => setFormFields({ ...formFields, [key]: e.target.value })}
                        disabled={selectedItem?.id !== item.id}
                        sx={{ minWidth: '150px' }}
                      />
                    ))}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MODAL PARA CREAR (DINÁMICO) */}
      <Dialog sx={{height: '800px'}}open={openCreateModal} onClose={() => setOpenCreateModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>Crear Nuevo {title}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {(ENTITY_SCHEMAS[entityName] || []).map((field) => (
              <TextField
                key={field}
                label={field.toUpperCase()}
                fullWidth
                value={newEntry[field] || ''}
                onChange={(e) => setNewEntry({ ...newEntry, [field]: e.target.value })}
              />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateModal(false)}>Cancelar</Button>
          <Button onClick={handleConfirmCreate} variant="contained" color="success">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// --- COMPONENTE PADRE (DASHBOARD) ---
export const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<{key: EntityType, label: string}>({
    key: 'usuarios',
    label: 'Usuarios'
  });
  const [authError, setAuthError] = useState({ open: false, message: '' });
  const triggerAuthError = () => {
    setAuthError({
      open: true,
      message: 'Tu sesión ha expirado o no tienes permisos para realizar esta acción.'
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', pb: 10 }}>
        <Paper sx={{ mb: 4, p: 2, borderRadius: 0 }} elevation={2}>
          <Container maxWidth="lg">
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Sistema Veterinaria
              </Typography>
              <ButtonGroup variant="outlined">
                <Button 
                  variant={activeSection.key === 'usuarios' ? 'contained' : 'outlined'}
                  onClick={() => setActiveSection({key: 'usuarios', label: 'Usuarios'})}
                >Usuarios</Button>
                <Button 
                  variant={activeSection.key === 'mascotas' ? 'contained' : 'outlined'}
                  onClick={() => setActiveSection({key: 'mascotas', label: 'Mascotas'})}
                >Mascotas</Button>
                <Button 
                  variant={activeSection.key === 'duenos' ? 'contained' : 'outlined'}
                  onClick={() => setActiveSection({key: 'duenos', label: 'Dueños'})}
                >Dueños</Button>
                <Button 
                  variant={activeSection.key === 'hclinica' ? 'contained' : 'outlined'}
                  onClick={() => setActiveSection({key: 'hclinica', label: 'Historia Clínica'})}
                >H. Clínica</Button>
              </ButtonGroup>
            </Stack>
          </Container>
        </Paper>

        <Container maxWidth="lg">
          <MasterCRUD 
            key={activeSection.key} 
            entityName={activeSection.key} 
            title={activeSection.label}
            onAuthError={triggerAuthError}
          />
        </Container>

        {/* El Snackbar se queda aquí para ser global */}
        <Snackbar open={authError.open} autoHideDuration={6000} onClose={() => setAuthError({ open: false, message: '' })}>
          <Alert severity="error" variant="filled">{authError.message}</Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;