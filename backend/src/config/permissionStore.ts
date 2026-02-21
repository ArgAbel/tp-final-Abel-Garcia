//carga automatica de los permisos en memoria al iniciar el servidor, 
// para evitar consultas a la base de datos en cada autorización
//atraves de guarda en cache los permisos

export let rolePermissionsMap: Record<string, string[]> = {};

export const setPermissionsMap = (data: Record<string, string[]>) => {
  rolePermissionsMap = data;};

  import pool  from './database'; 


export const loadPermissions = async () => {
  try {
    // Consulta que une roles con sus nombres de permisos
    const query = `
      SELECT r.name as role_name, p.name as permission_name
      FROM Role r
      INNER JOIN role_permiso rp ON r.id = rp.id_role
      INNER JOIN Permiso p ON p.id = id_permiso
    `;

    const [rows]: any = await pool.query(query);

    const map: Record<string, string[]> = {};

    rows.forEach((row: any) => {
      if (!map[row.role_name]) {
        map[row.role_name] = [];
      }
      map[row.role_name].push(row.permission_name);
    });

    setPermissionsMap(map);
    console.log('✅ Mapa de permisos cargado');
    console.log(map);
  } catch (error) {
    console.error('❌ Error al cargar permisos:', error);
  }
};