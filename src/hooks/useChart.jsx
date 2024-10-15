import { useEffect, useReducer, useState } from "react"
import { dashboardReducer, initialState } from "../reducers/ChartReducer"


export default function useChart() {
  const [state, dispatch] =useReducer(dashboardReducer, initialState)
  const [graficosCargados, setGraficosCargados] = useState(false)

  const ids = new Set();

  useEffect(() =>{
    if (!graficosCargados) {
      const storeData = localStorage.getItem("graficos")

      if (storeData) {
        const graficos = JSON.parse(storeData)

        graficos.forEach((grafico) => {
          if (!ids.has(grafico.id)) {
            ids.add(grafico.id)
            dispatch({ type: 'crear_grafico', payload: grafico })
          }
        });
      }
    }
    setGraficosCargados(true)
  }, [graficosCargados])

  useEffect(() => {
    if (graficosCargados) {
      localStorage.setItem("graficos", JSON.stringify(state.datos))
    }
  }, [state.datos, graficosCargados])

  const agregarGrafico = ( grafico ) => {
    console.log("Datos originales del gráfico: ", grafico)

    if (!ids.has(grafico.id)) {
      ids.add(grafico.id)
      dispatch({ type: 'crear_grafico', payload: grafico })
    } else {
      console.warn("Gráfico con id duplicado", `${grafico.id}, este gráfico no se publicará y se omitirá`)
    }
  }

  const actualizarGrafico = (graficoElegido) => {
    console.log("Hook useChart - ActualizarGrafico: ", graficoElegido)
    dispatch({ type: 'actualizar_grafico', payload: graficoElegido })
  }

  const eliminarGrafico = (id) => {
    dispatch({ type: 'eliminar_grafico', payload: { id }})
  }

  return {
    state,
    agregarGrafico,
    actualizarGrafico,
    eliminarGrafico
  }
}
