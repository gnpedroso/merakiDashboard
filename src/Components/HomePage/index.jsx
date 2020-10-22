import React, { useContext } from 'react'
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup'

import './HomePage.css'
import CriticalChart from '../CriticalChart'
import DoughnutChart from '../DoughnutChart'
import { DataContext } from '../../context/DataContext'

const HomePage = () => {

    const { isLoading, cleanData, outputData } = useContext(DataContext)

    const numberOfCompanies = () => {
        return cleanData.map(each => each.company).length
    }

    const numberOfLicenses = () => {
        return cleanData.map(each => each.results).map(one => one.length).reduce((a, b) => { return a + b }, 0)
    }


    const numberOfLicensesCloseToExpiration = () => {
        let above90 = outputData.filter(data => data.expirationDate <= 90)
        return above90.map(each => each.qty).reduce((a, b) => { return a + b }, 0)
    }

    if (isLoading) {
        return <img src={require('../../images/Spinner-1.4s-251px.gif')} alt="loading..." className='Loading' />
    }

    return (
        <div className='Header'>
            <h1>Bem-vindo <span>Usuário</span>!</h1>
            <h5>Meraki Dashboard powered by <span className='B2On'>B2On</span></h5>

            <Grid container spacing={3} justify='center' className='Cards'>
                <Grid item component={Card} xs={12} md={3} className='Clientes'>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>Nº de Clientes</Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={numberOfCompanies()} duration={2.5} separator=',' />
                        </Typography>
                        <Typography variant='body2'>Número total de clientes ativos</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className='Licensas'>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>Nº de Licenças</Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={numberOfLicenses()} duration={2.5} separator=',' />
                        </Typography>
                        <Typography variant='body2'>Número total de licenças ativas</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className='Expirar'>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>Nº de Licenças a Expirar</Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={numberOfLicensesCloseToExpiration()} duration={2.5} separator=',' />
                        </Typography>
                        <Typography variant='body2'>Número total de licenças a expirar a partir de 90 dias</Typography>
                    </CardContent>
                </Grid>

            </Grid>

            <div className='Charts'>
                <CriticalChart />

                <DoughnutChart />
            </div>



        </div>
    )
}

export default HomePage