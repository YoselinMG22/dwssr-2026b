
import { listUsers } from './users.service.js';

// Controlador para obtener todos los usuarios
export default function getUsers(req, res) {
  const users = listUsers();

  res.json({ users });
}
