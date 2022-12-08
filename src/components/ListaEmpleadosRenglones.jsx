// Importar modulo
import styled from 'styled-components';

// Importar componente
import EmpleadoRenglon from './EmpleadoRenglon';

// Estilos //////////////////////////////////////////////////
const NombreColumnasEstilo = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;
	padding-top: 10px;

	:first-child {
		padding-left: 10px;
	}
`;

// Componente ///////////////////////////////////////////////////////////////
const ListaEmpleadosRenglones = ({ empleados, mostrarDetallesEmpleado }) => {
	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

	// Parte 2. HTML que se renderiza
	// Si no hay usuarios, regresa el parrafo no hay empleados
	if (!empleados.length) return <p>No hay empleados</p>;
	// Si hay usuarios regresa los componentes UserRow por cada uno
	// No usamos return en map si todo se escribe en una linea
	return (
		<>
			<NombreColumnasEstilo>
				{/* Nombres de las columnas en la tabla de empleados */}
				<span>ID</span>
				<span>NOMBRE</span> <span>PUESTO</span>
			</NombreColumnasEstilo>
			{empleados.map(empleado => (
				<EmpleadoRenglon
					key={empleado.ID}
					empleado={empleado}
					mostrarDetallesEmpleado={mostrarDetallesEmpleado}
				/>
			))}
		</>
	);
};

export default ListaEmpleadosRenglones;
