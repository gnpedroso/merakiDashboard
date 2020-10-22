import React, { useContext } from 'react'
import { Bar } from 'react-chartjs-2';

import './CriticalChart.css'
import { DataContext } from '../../context/DataContext'

const CriticalChart = () => {

    const { isLoading, outputData } = useContext(DataContext)

    let below30 = outputData.filter(data => data.expirationDate <= 30)
    let above30 = outputData.filter(data => data.expirationDate <= 60 && data.expirationDate > 30)
    let above60 = outputData.filter(data => data.expirationDate < 90 && data.expirationDate > 60)
    let above90 = outputData.filter(data => data.expirationDate >= 90 && data.expirationDate <= 120)

    const getQuantity = condition => condition.reduce((acc, curr) => {
        return acc + curr.qty
    }, 0)

    const barChart = (
        <Bar
            data={{
                labels: ['Abaixo de 30 dias', 'Entre 30 e 60 dias', 'Entre 60 e 90 dias', 'Entre 90 e 120 dias'],
                datasets: [{
                    label: 'Licenças',
                    backgroundColor: ['#e60000', '#FF4500', '#faa61a', '#FFD700'],
                    data: [getQuantity(below30), getQuantity(above30), getQuantity(above60), getQuantity(above90)]
                }]
            }}
            options={{
                legend: { display: false },
                responsive: true,
                title: { display: true, text: 'Dias para expirar as licenças x Quantidade de licenças' },
                // onClick: (event, elements) => {
                //     const chart = elements[0]._chart;
                //     const element = chart.getElementAtEvent(event)[0];
                //     const dataset = chart.data.datasets[element._datasetIndex];
                //     const value = dataset.data[element._index];
                //     console.log(dataset.data)
                // }
            }}

        />
    )

    if (isLoading) {
        return <img src={require('../../images/Spinner-1.4s-251px.gif')} alt="loading..." className='Loading' />
    }

    return (
        <div className='barChart'>
            {barChart}
        </div>
    )
}

export default CriticalChart