import { createContext, useContext } from "react";
import useChart from "../hooks/useChart";

// 1 - Creo el Context
const ChartContext = createContext()


// 2 - Creo el Proveedor del Context
export const ChartProvider = ({ children }) => {
    const { state, agregarGrafico, actualizarGrafico, eliminarGrafico} = useChart()

    return (
        <ChartContext.Provider
            value={{ state, agregarGrafico, actualizarGrafico, eliminarGrafico }}
        >
            { children }
        </ChartContext.Provider>
    )
}

// 3 Hook para acceder al context
export const useChartContext = () => {
    const context = useContext(ChartContext)

    if (!context) {
        throw new Error('useChart must be used within a ChartProvider')
    }
    return context
}