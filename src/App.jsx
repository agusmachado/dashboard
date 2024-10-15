import ApexChartEnlace from "./components/ApexChartEnlace"
import EditorGraficos from "./components/EditorGraficos"
import FormularioPrincipal from "./components/FormularioPrincipal"
import ResetearAplicacion from "./components/ResetearAplicación"
import { useChartContext } from "./context/ChartContext"
import useModal from "./hooks/useModal"

function App() {

 const { state } = useChartContext()
 console.log('El state que llega a App: ', state) 

 const { isOpen: isResetModalOpen, openModal: openResetModal, closeModal: closeResetModal } = useModal()
  
  return (
    <div className="w-4/5 mx-auto">
      
      <div className="flex justify-between items-center my-5">
        <h1 className="text-left font-black text-4xl">
          Dashboard
        </h1>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-700 rounded p-2 text-white hover:cursor-pointer shadow-lg"
          onClick={openResetModal}
        >
          Resetear Aplicación
        </button>

        { isResetModalOpen &&
          <ResetearAplicacion 
            onClose={closeResetModal}
          />
        }
      </div>

      <div className="rounded border shadow-2xl p-5 bg-white">
        <FormularioPrincipal/>
        <EditorGraficos/>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8 justify-center">
        {state.datos.map((grafico) => { 
            console.log("Datos del gráfico antes de renderizar:", grafico); // Verifica los datos que llegan antes de renderizar

            return (
                <div 
                    key={grafico.id}
                    className="rounded shadow-xl p-5 bg-slate-200 text-center"
                >
                    <h2 className="text-center font-bold pb-2">{grafico.titulo}</h2>
                    <div className="flex justify-center shadow-xl">
                        <ApexChartEnlace
                            dataGrafico={grafico}
                        />
                    </div>          
                </div>
            );
        })}
    </div>

    </div>
  )
}

export default App
