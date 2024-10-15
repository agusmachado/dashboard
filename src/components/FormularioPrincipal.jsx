import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { useChartContext } from "../context/ChartContext"

export default function FormularioPrincipal() {
    const { agregarGrafico } = useChartContext()
    
    const [titulo, setTitulo ] = useState("")
    const [valorGrafico, setValorGrafico ] = useState(0) 
    const [fecha, setFecha] = useState(new Date())
    const [tipoGrafico, setTipoGrafico ] = useState("")

    const tiposDeGraficos = [ 'line', 'area', 'bar', 'heatmap']
  
   const handleSubmit = (e) => {
    e.preventDefault()  

    // Flujo de la fecha en el formulario = Date => date => Date => date
    const fechaFormateada = fecha.toISOString().split('T')[0]

    // Creamos un nuevo gráfico
    const nuevoGrafico = {
        id: uuidv4(),
        titulo,
        tipo: tipoGrafico,
        series: [{            
            data: [{
                x: fechaFormateada,
                y: valorGrafico
            }]
        }]
    }

    console.log("Datos del gráfico", nuevoGrafico)
    agregarGrafico(nuevoGrafico)
    resetForm()
   }

   const resetForm = () => {
    setTitulo("")
    setValorGrafico(0)
    setFecha(new Date())
    setTipoGrafico("")
   }
    
  return (
    <form onSubmit={handleSubmit}>
        <div className="flex justify-around">
            <input 
                type="text" 
                placeholder="Nombre del Gráfico"
                className="w-96 m-5 p-1 rounded  shadow-lg border focus:shadow-slate-400 focus:outline-none"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
            />

            <input 
                type="number"
                placeholder="Dato" 
                className="w-24 m-5 p-1 rounded  shadow-lg border focus:shadow-slate-400 focus:outline-none"
                value={valorGrafico}
                onChange={(e) => setValorGrafico(Number(e.target.value))}
                required
            />

            <input 
                type="date"
                className="w-44 m-5 p-1 rounded  shadow-lg border focus:shadow-slate-400 focus:outline-none" 
                value={fecha.toISOString().split('T')[0]}
                onChange={(e) => setFecha(new Date(e.target.value))}
            />

            <select
                className="w-48 m-5 p-1 rounded  shadow-lg border focus:shadow-slate-400 focus:outline-none"
                value={tipoGrafico}
                onChange={(e) => setTipoGrafico(e.target.value)}
            >
                <option value="">-- Tipo de Gráfico --</option>
                {tiposDeGraficos.map((tipo, index) => (
                    <option
                        key={index} 
                        value={tipo}
                    >
                        {tipo.toUpperCase()}
                    </option>
                ))}
            </select>

            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 rounded m-5 p-2 text-white hover:cursor-pointer shadow-lg"
            >
                Crear Gráfico
            </button>
        </div>
    </form>
  )
}
