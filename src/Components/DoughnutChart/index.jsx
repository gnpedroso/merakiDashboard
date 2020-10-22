import React, { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';

import './DoughnutChart.css'
import { DataContext } from '../../context/DataContext'

const DoughnutChart = () => {

	const { isLoading, outputData } = useContext(DataContext)

	
	// SEPARAR EM 3 GRUPOS, QUANTIDADE ACIMA DE 61 - QUANTIDADE ENTRE 60 e 31 - DE 30 PRA BAIXO
	let above90 = outputData.filter(data => data.expirationDate >= 90)
	let above60 = outputData.filter(data => data.expirationDate < 90 && data.expirationDate > 60)
	let above30 = outputData.filter(data => data.expirationDate <= 60 && data.expirationDate > 30)
	let under30 = outputData.filter(data => data.expirationDate <= 30)

	const getQuantity = condition => condition.reduce((acc, curr) => {
		return acc + curr.qty
	}, 0)


	const doughnutChart = (
		<Doughnut className='DoughnutChart'
			data={{
				labels: [
					'Acima de 90 dias',
					'Entre 90 e 60 dias',
					'Entre 60 e 30 dias',
					'Abaixo de 30 dias'
				],
				datasets: [{
					data: [getQuantity(above90), getQuantity(above60), getQuantity(above30), getQuantity(under30)],
					backgroundColor: [
						'#FFD700',
						'#faa61a',
						'#FF4500',
						'#e60000',
					]
				}]
			}}
		/>
	)

	if (isLoading) {
		return <img src={require('../../images/Spinner-1.4s-251px.gif')} alt="loading..." className='Loading' />
	}

	return (
		<div className='DoughnutChart'>
			<h5>Gráfico de Validade das Licenças (dias)</h5>
			{doughnutChart}
		</div>
	);
}

export default DoughnutChart
