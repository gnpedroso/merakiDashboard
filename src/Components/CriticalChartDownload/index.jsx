import React from 'react'
import { Button } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import CriticalChart from '../CriticalChart'
import { DataContext } from '../../context/DataContext'

const CriticalChartDownload = () => {

    return (
        <div>
            <h1>Gráfico de Licenças</h1>
            <CriticalChart />
            <h5>Clique no botão abaixo para fazer o Download dos dados das licenças à expirar</h5>
            <Button
                variant="contained"
                color="default"
                startIcon={<CloudUploadIcon />}
            >
                Download
            </Button>
        </div>
    )
}

export default CriticalChartDownload
