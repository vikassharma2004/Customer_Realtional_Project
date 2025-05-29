import { useRoutes } from 'react-router-dom';
import './App.css'
import {allRoutes} from './routes/AppRoutes.jsx';


// Routes to be rendered
function AppRouter() {
  const routes = useRoutes(allRoutes);
  return routes;
}

const App = () => {
  return (
  <>
      <AppRouter />
  
  </>
  )
}

export default App