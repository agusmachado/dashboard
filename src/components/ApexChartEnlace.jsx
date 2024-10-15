import ReactApexChart from "react-apexcharts"

export default function ApexChartEnlace({ dataGrafico }) {

  const { tipo, series } = dataGrafico
  
    const options = {
        chart: {
          type: tipo // Tipo de Gráfico
        },
        series: series,
        xaxis: {
          type: 'datetime',
          labels: { format: 'dd MMM' }
        }
      }
  
  
    return (
    <div>
        <ReactApexChart 
            options={options}
            series={options.series}
            type={tipo}
        />        
    </div>
  )
}
