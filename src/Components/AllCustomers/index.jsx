import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, List, ListItem, ListItemText } from '@material-ui/core'
import TablePagination from '@material-ui/core/TablePagination';
import BusinessIcon from '@material-ui/icons/Business';
import InfoIcon from '@material-ui/icons/Info';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ScheduleIcon from '@material-ui/icons/Schedule';
import WarningIcon from '@material-ui/icons/Warning';
import CheckIcon from '@material-ui/icons/Check';

import './AllCustomers.css'
import Filter from '../Filter'
import { DataContext } from '../../context/DataContext'

const columns = [
    { id: 'company', label: 'Empresa', minWidth: 170 },
    { id: 'licenseType', label: 'Tipo de Licença', minWidth: 100 },
    {
        id: 'qty',
        label: 'Quantidade de Licenças',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('pt-BR'),
    },
    {
        id: 'expirationDate',
        label: 'Dias Restantes',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('pt-BR'),
    },
    {
        id: 'warning',
        label: 'Prioridade',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('pt-BR'),
    },

];

const useStyles = makeStyles({
    bigContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    nav: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: '30px',
        marginLeft: '10px',
        maxHeight: '65px',
    },
    root: {
        width: '80%',
        textAlign: 'left'

    },
    container: {
        maxHeight: 600,
    },
    icon: {
        position: 'relative',
        top: '6px'
    },
});

const AllCustomers = () => {

    const { isLoading, cleanData, restingDays } = useContext(DataContext)

    const classes = useStyles();
    const [dayValue, setDayValue] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const checkColor = expirationDate => {
        if (expirationDate <= 90) {
            return 'red'
        } else if (expirationDate <= 450) {
            return 'orange'
        } else {
            return 'green'
        }
    }


    function valuetext(value) {
        setDayValue(value)
        return value;
    }

    const checkLabel = label => {
        switch (label) {
            case 'Empresa':
                return <BusinessIcon />
            case 'Tipo de Licença':
                return <InfoIcon />
            case 'Quantidade de Licenças':
                return <EventAvailableIcon />
            case 'Dias Restantes':
                return <ScheduleIcon />;
            case 'Prioridade':
                return <WarningIcon />;
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const rows = Object.entries(cleanData.reduce((obj, curr) => {
        obj[curr.company] = Object.values(curr.results.reduce((data, { licenseType, expirationDate, state }) => {
            const key = licenseType + expirationDate;
            if (!data[key])
                data[key] = { licenseType, expirationDate: restingDays(expirationDate), qty: 0, company: curr.company, state };
            data[key].qty++;
            return data;
        }, {}));
        return obj;
    }, {}));

    rows.map(each => each[1].sort((a, b) => {
        if (a.expirationDate < b.expirationDate) {
            return -1;
        } else {
            return 1;
        }
    }));

    if (isLoading) {
        return <img src={require('../../images/Spinner-1.4s-251px.gif')} alt="loading..." className='Loading' />
    }

    return (
        <>
            <div className={classes.bigContainer}>
                <Paper className={classes.root}>
                    <nav className={classes.nav}>
                        <Filter
                            className='Filter'
                        />
                    </nav>

                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            <strong><span className={classes.icon}>{checkLabel(column.label)}</span> {column.label}</strong>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((companyData, index) => (
                                    <TableRow key={index.toString()}>
                                        <TableCell component="th" scope="row" style={{ verticalAlign: 'top' }} >
                                            <strong>{companyData[0]}</strong>
                                        </TableCell>

                                        <TableCell align="center" >
                                            <List>
                                                {
                                                    companyData[1].map((data, index) => (
                                                        <ListItem key={index.toString()} className='expirationDate'>
                                                            <ListItemText>
                                                                {data.licenseType}
                                                            </ListItemText>
                                                        </ListItem>
                                                    ))
                                                }
                                            </List>
                                        </TableCell>

                                        <TableCell >
                                            <List >
                                                {
                                                    companyData[1].map((data, index) => (
                                                        <ListItem key={index.toString()} className='expirationDate'>
                                                            <ListItemText align="center">
                                                                {data.qty}
                                                            </ListItemText>
                                                        </ListItem>
                                                    ))
                                                }
                                            </List>
                                        </TableCell>

                                        <TableCell>
                                            <List >
                                                {
                                                    companyData[1].map((data, index) => (
                                                        <ListItem key={index.toString()} className={`durationInDays ${checkColor(data.expirationDate)}`}>
                                                            <ListItemText align="center">
                                                                {data.expirationDate}
                                                            </ListItemText>
                                                        </ListItem>
                                                    ))
                                                }
                                            </List>
                                        </TableCell>

                                        <TableCell>
                                            <List className='Icons'>
                                                {
                                                    companyData[1].map((data, index) => (
                                                        <ListItem key={index.toString()} className={`durationInDays ${checkColor(data.expirationDate)}`}>
                                                            <ListItemText align="center">
                                                                {data.expirationDate < 90 ? <WarningIcon style={{ fontSize: 16 }} className='Danger' /> : <CheckIcon style={{ fontSize: 16 }} className='Check' />}
                                                            </ListItemText>
                                                        </ListItem>
                                                    ))
                                                }
                                            </List>
                                        </TableCell>




                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </>
    );
}

export default AllCustomers