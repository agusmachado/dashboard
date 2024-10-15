import { useState } from "react"
import { useChartContext } from "../context/ChartContext"
import ModalEliminar from "./ModalEliminar"
import useModal from "../hooks/useModal"

export default function EditorGraficos() {

    const { state, actualizarGrafico, eliminarGrafico } = useChartContext()


    const [selectorTitulo, setSelectorTitulo] = useState('')
    const [valorGrafico, setValorGrafico] = useState(0)
    const [fecha, setFecha] = useState(new Date())

    const { isOpen: isOpenModalEliminar, openModal: openModalModalEliminar , closeModal: closeModalModalEliminar } = useModal()

    const listaGraficos = state.datos
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({selectorTitulo, valorGrafico, fecha})

        const fechaFormateada = fecha.toISOString().split('T')[0]
        const nuevoDato = { 
            x: fechaFormateada, 
            y: valorGrafico
        }

        const graficoSeleccionado = state.datos.find((grafico) => grafico.id === selectorTitulo )

        if (graficoSeleccionado) {
            let nuevosDatos = [...graficoSeleccionado.series[0].data]

            const indiceFecha = nuevosDatos.findIndex(dato => dato.x === nuevoDato.x)

            if (indiceFecha !== -1) {
                // Si no es -1, entonces se encontró un dato con la misma fecha
                nuevosDatos[indiceFecha] = nuevoDato
            } else {
                // Si es -1, entonces no se encontró un dato con esa fecha
                nuevosDatos.push(nuevoDato)
            }

            // Si me devuelve un número negativo, entonces fechaA debe ir antes de fechaB
            // Si me da 0 fechaA y fechaB son iguales
            // Si me devuelve un número positivo, entonces fechaA debe ir después de fechaB
            nuevosDatos.sort((fechaA, fechaB) => fechaA.x.localeCompare( fechaB.x))

            const nuevoGrafico = {
                ...graficoSeleccionado,
                series:[{
                    ...graficoSeleccionado.series[0],
                    data: nuevosDatos
                }]
            }
            console.log("Grafico Actualizado en EditorGraficos: ", nuevoGrafico)
            actualizarGrafico(nuevoGrafico)
        }

        resetForm()
    }

    const resetForm = () => {
        setSelectorTitulo('')
        setValorGrafico(0)
        setFecha(new Date())
    }
    
  return (
    <form onSubmit={handleSubmit}>
        <div className="flex justify-around">
            <select
                className="w-96 m-5 p-1 rounded  shadow-lg border focus:shadow-slate-400 focus:outline-none"
                value={selectorTitulo}
                onChange={(e) => setSelectorTitulo(e.target.value)}
            >
                <option className="text-center">-- Título del Gráfico --</option>
                {listaGraficos.map((grafico) => ( 
                <option
                    key={grafico.id}
                    value={grafico.id}
                >
                    {grafico.titulo}
                </option>))}
            </select>

            <input 
                type="number" 
                placeholder="Dato"
                className="w-24 m-5 p-1 rounded  shadow-lg border focus:shadow-slate-400 focus:outline-none"
                value={valorGrafico}
                onChange={(e) => setValorGrafico(Number(e.target.value))}
            />

            <input 
                type="date" 
                className="w-44 m-5 p-1 rounded  shadow-lg border focus:shadow-slate-400 focus:outline-none"
                value={fecha.toISOString().split('T')[0]}
                onChange={(e) => setFecha(new Date(e.target.value))}
            />

            <button
                type="button"
                className="bg-red-500 hover:bg-red-700 rounded m-5 p-2 text-white hover:cursor-pointer shadow-lg"
                onClick={() => openModalModalEliminar()}
            >
                Eliminar Gráfico
            </button> 

                    { isOpenModalEliminar && 
                        <ModalEliminar
                            onClose={closeModalModalEliminar}
                            selectorTitulo={selectorTitulo}  
                            eliminarGrafico={eliminarGrafico}                        
                        />
                    }
            
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 rounded m-5 p-2 text-white hover:cursor-pointer shadow-lg"
            >
                Actualizar Gráfico
            </button>
        </div>
    </form>
  )
}
