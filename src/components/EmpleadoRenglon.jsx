// Importar modulos
import styled from 'styled-components';
// import { empleados } from '../empleados';

// Estilos del componente ///////////////////////////////////

// Estilos para el componente completo
const EmpleadoRenglonEstilo = styled.div`
	width: 100%;
	background-color: lightblue;
	border: 4px solid red;
	padding: 1rem;
	border-radius: 1rem;
	margin-top: 1rem;
	display: flex;
	justify-content: space-around;
	padding-top: 10px;

	:hover {
		background-color: yellow;
		cursor: pointer;
	}
`;

// Componente ////////////////////////////////////////////////////
const EmpleadoRenglon = ({ empleado, mostrarDetallesEmpleado }) => {
	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE
	const { ID, NOMBRE, PUESTO } = empleado;
	const llamarMostrarDetallesEmpleado = () => {
		// console.log(empleado);
		mostrarDetallesEmpleado(empleado);
	};
	// Parte 2. HTML que se renderiza en UserListRows
	return (
		// Estilo del componente
		<EmpleadoRenglonEstilo onClick={llamarMostrarDetallesEmpleado}>
			<span>{Math.floor(ID / 1e31)}</span>
			<span>{NOMBRE}</span>
			<span>{PUESTO}</span>
		</EmpleadoRenglonEstilo>
	);
};

export default EmpleadoRenglon;
