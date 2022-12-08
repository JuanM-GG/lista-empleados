// Importar modulos
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import styled from 'styled-components';

// Estilos para el componente ////////////////////////////////////////////////////////////////

// Estilo para el componente completo
const FiltroListaEmpleadosEstilo = styled.form`
	padding: 1rem;
	align-items: center;
	justify-content: center;

	/* Estilo del layout */
	display: grid;
	grid-gap: 10px;
	grid-template-rows: 0.2fr 1fr 1fr;
	grid-template-areas:
		'Nombre'
		'Ordenar'
		'Buscar';
`;

// Estilo para la entrada de texto
const BuscarNombreEstilo = styled.div`
	grid-area: Nombre;
	display: grid;
	grid-gap: 15px;
`;

const SeleccionarOrdenEstilo = styled.div`
	grid-area: Ordenar;
	display: grid;
	grid-gap: 15px;
`;

const DescargarEmpleadosEstilo = styled.div`
	grid-area: Buscar;

	button {
		height: 60px;
		
	}
	
`;

// Componente /////////////////////////////////////////////////////////////////////////
const FiltroListaEmpleados = ({ manejarFiltros }) => {
	// Parte 1. Crear los hooks a usar en el componente
	// Crear datos del formulario
	const { register, watch, handleSubmit } = useForm({
		defaultValues: {
			buscar: '',
			ordenarPor: 0
		}
	});

	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

	// Parte 2. Funciones que se llaman con cada renderizado
	// Observar el valor de las entradas
	const { buscar, ordenarPor } = watch();

	// Solo para verificar que la data en el formulario es correcta
	const onSubmit = data => {
		console.log(data);

	};
	// Usamos la data en el formulario para cambiar el estado de filters en UserList
	useEffect(() => {
		manejarFiltros(buscar, ordenarPor);
	}, [buscar, ordenarPor]);

	// Parte 3. HTML que va a ser renderizado 
	return (
		<FiltroListaEmpleadosEstilo onSubmit={handleSubmit(onSubmit)}>
			{/* BUSCAR POR NOMBRE EMPLEADO */}
			<BuscarNombreEstilo>
				<label>Nombre empleado:</label>
				<input type='text' {...register('buscar')}></input>
			</BuscarNombreEstilo>
			
			{/* SELECT PARA SELECCIONAR ORDEN */}

			<SeleccionarOrdenEstilo>
				<label>Seleccionar orden: </label>
				<select
					{...register('ordenarPor', {
						valueAsNumber: true
					})}
				>
					<option value={0}>Por defecto</option>
					<option value={1}>Por nombre</option>
				</select>
			</SeleccionarOrdenEstilo>
			{/* BOTON PARA BUSCAR USUARIOS */}
			<DescargarEmpleadosEstilo>
				<button type='submit'>Descargar Empleados</button>
			</DescargarEmpleadosEstilo>
		</FiltroListaEmpleadosEstilo>
	);
};

export default FiltroListaEmpleados;
