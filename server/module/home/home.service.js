
import { getHomeViewModel } from './home.service.js';

// Controlador para mostrar la página de inicio
export default function renderHome(req, res) {
  // Cargando el viewModel
  const viewModel = getHomeViewModel();

  // Renderizando la vista
  res.render('home', viewModel);
}
