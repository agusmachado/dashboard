
// Initial State. Es un Arreglo de objetos vacío
export const initialState = {
    datos: [] // Aquí se almacenarán los gráficos
}

// Reducer: nos sirve para manejar las acciones de creación, actualización y eliminación
export const dashboardReducer = (state, action) => {

    if (action.type === 'crear_grafico') {
        console.log('Los datos ya se encuentran en el reducer: ', action.payload)
        return {
            ...state,
            datos: [
                ...state.datos,
                action.payload
            ]
        }
    }    

    if (action.type === 'actualizar_grafico') {
        return {
            ...state,
            datos: state.datos.map((grafico) => grafico.id === action.payload.id ? {...grafico, ...action.payload } : grafico )
        }
    }

    if (action.type === 'eliminar_grafico') {
        return {
            ...state,
            datos: state.datos.filter( grafico => grafico.id !== action.payload.id )
        }
    }

    return state
}