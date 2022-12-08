// Importar modulos
import styled from 'styled-components';
import { useState } from 'react';

// Importar componentes
import FiltroListaEmpleados from './FiltroListaEmpleados';
import ListaEmpleadosRenglones from './ListaEmpleadosRenglones';
import Encabezado from './Encabezado';
import BarraNavegacion from './BarraNavegacion';
import VentanaEmergenteDetallesEmpleado from './VentanaEmergenteDetallesEmpleado';

// Estilos //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Estilo para el componente completo
const ListaEmpleadosEstilo = styled.div`
	width: 800px;
	margin: auto;
	padding: 1rem;
	background-color: yellow;
	border: 4px solid red;

	/* Estilo del layout */
	display: grid;
	grid-template-columns: 1fr 3fr;
	grid-template-rows: 100px 100px 500px;
	grid-template-areas:
		'Encabezado Encabezado'
		'Nav Nav'
		'Formulario Lista';
`;

// Estilos para el encabezado
const EncabezadoEstilo = styled.header`
	grid-area: Encabezado;
	display: grid;
	align-items: center;
	background-color: lightblue;
	border: 4px solid red;
	text-align: center;
`;

// Estilos para la barra de navegacion
const BarraNavegacionEstilo = styled.nav`
	grid-area: Nav;

	display: grid;
	align-items: center;
	background-color: lightgreen;
	border: 4px solid red;

	> ul {
		/* Permite distribucion horizontal */
		display: flex;
		/* Elimina los puntos */
		list-style: none;
	}

	li {
		padding: 10px;
		border: 4px solid red;
		margin: 0 40px 0 40px;
	}
`;

// Estilos para el formulario de filtrado
const FiltroListaEmpleadosEstilo = styled.div`
	grid-area: Formulario;

	background-color: lightgray;
	border: 4px solid red;
	display: flex;
`;

// Estilos para los renglones de productos
const ListaEmpleadosRenglonesEstilo = styled.section`
	grid-area: Lista;

	overflow: auto;
	background-color: lightpink;
	border: 4px solid red;
`;

// Componente ///////////////////////////////////////////////////////////////////////
const ListaEmpleados = ({ empleadosIniciales }) => {
	// Parte 1. Declarar todos los hooks a usar en el componente
	// Custom Hook para crear el estado filters y destructurar sus componentes y su handleFilters
	const { buscar, ordenarPor, manejarFiltros } = useFiltros();

	// Hook para guardar al empleado seleccionado para mostrar
	// sus detalles
	const [empleadoDetalles, setEmpleadoDetalles] = useState({});
	// Custom hook para mostrar los detalles del empleado
	const {
		estadoVentanaEmergente,
		setEstadoVentanaEmergente,
		mostrarDetallesEmpleado
	} = useVentanaEmergente(setEmpleadoDetalles);
	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

	// Parte 2. Llamar funciones para modificar la lista de usuarios a partir de los datos del formulario
	// 1. Filtrar usuarios por nombre
	let empleadosFiltrados = filtrarProductosPorNombre(
		empleadosIniciales,
		buscar
	);

	// 3. Ordenar usuarios
	empleadosFiltrados = ordenarEmpleados(empleadosFiltrados, ordenarPor);

	// Parte 3. Crear el HTML que se va a renderizar en App
	return (
		// Un estilo para todo el componente
		<ListaEmpleadosEstilo>
			{/* ENCABEZADO */}
			<EncabezadoEstilo>
				<Encabezado />
			</EncabezadoEstilo>
			{/* PANEL DE NEVAGACION */}
			<BarraNavegacionEstilo>
				<BarraNavegacion />
			</BarraNavegacionEstilo>
			{/* CONTENIDO PRINCIPAL */}

			{/* FILTRO DE USUARIOS */}
			<FiltroListaEmpleadosEstilo>
				<FiltroListaEmpleados manejarFiltros={manejarFiltros} />
			</FiltroListaEmpleadosEstilo>

			{/* LISTA DE USUARIOS */}
			<ListaEmpleadosRenglonesEstilo>
				<ListaEmpleadosRenglones
					empleados={empleadosFiltrados}
					mostrarDetallesEmpleado={mostrarDetallesEmpleado}
				/>
			</ListaEmpleadosRenglonesEstilo>
			{/* VENTANA EMERGENTE CON DETALLES DE VENTA */}
			<VentanaEmergenteDetallesEmpleado
				estado={estadoVentanaEmergente}
				cambiarEstado={setEstadoVentanaEmergente}
				empleadoDetalles={empleadoDetalles}
			/>
		</ListaEmpleadosEstilo>
	);
};
// Funciones /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Parte 4. Crear las funciones que generan los custom hooks
// Funcion para crear estado filtros y su API
const useFiltros = () => {
	const [filtros, setFiltros] = useState({
		buscar: '',
		ordenarPor: 0
	});
	const manejarFiltros = (buscar, ordenarPor) => {
		setFiltros({ buscar, ordenarPor });
	};

	return {
		...filtros,
		manejarFiltros
	};
};

// Funcion para crear estado users y su API

// Parte 5. Crear las funciones que manipulan los estados
// Funcion para filtrar usuarios por nombre
const filtrarProductosPorNombre = (empleados, buscar) => {
	// Si no hay nombre para buscar, regresa todos los usuarios
	// Regresamos una copia para tener una funcion pura
	if (!buscar) return [...empleados];
	// Pasa el nombre a buscar a minusculas
	const minusculaBusqueda = buscar.toLowerCase();

	// Filtra los usuarios con el nombre de busqueda
	const empleadosFiltrados = empleados.filter(empleado =>
		empleado.NOMBRE.toLowerCase().startsWith(minusculaBusqueda)
	);

	return empleadosFiltrados;
};

// Función para ordenar los usuarios
const ordenarEmpleados = (empleados, ordenarPor) => {
	const empleadosOrdenados = [...empleados];
	switch (ordenarPor) {
		case 1:
			return empleadosOrdenados.sort((a, b) => {
				if (a.NOMBRE > b.NOMBRE) return 1;
				if (a.NOMBRE < b.NOMBRE) return -1;
				return 0;
			});
		default:
			return empleadosOrdenados;
	}
};

// Funcion para crear estado estadoVentanaEmergente y su API
const useVentanaEmergente = setEmpleadoDetalles => {
	// Crear estado
	const [estadoVentanaEmergente, setEstadoVentanaEmergente] = useState(false);

	// Funcion para cambiar detalles de venta y mostrar los detalles de venta
	const mostrarDetallesEmpleado = empleado => {
		// El empleado completo se establece como empleadoDetalles
		setEmpleadoDetalles(empleado);

		// Cambiar para mostrar ventana emergente
		setEstadoVentanaEmergente(true);
	};

	return {
		estadoVentanaEmergente,
		setEstadoVentanaEmergente,
		mostrarDetallesEmpleado
	};
};

export default ListaEmpleados;
