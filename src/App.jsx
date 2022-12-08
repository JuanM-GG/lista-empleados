import ListaEmpleados from './components/ListaEmpleados';
import { empleados } from './empleados.js';

const App = () => {
	return <ListaEmpleados empleadosIniciales={empleados} />;
};

export default App;
