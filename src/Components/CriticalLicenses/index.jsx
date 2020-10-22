import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import BusinessIcon from '@material-ui/icons/Business';
import InfoIcon from '@material-ui/icons/Info';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

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
    marginLeft: '10px'
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
  slider: {
    width: 500,
    trackColor: "yellow",
    selectionColor: "green"
  }
});

const muiTheme = createMuiTheme({
  overrides: {
    MuiSlider: {
      thumb: {
        color: '#ff7e00',
      },
      track: {
        color: '#ff7e00'
      },
      rail: {
        color: '#ccc'
      },
      mark: {
        color: '#ff7e00'
      }
    }
  }
});

const CriticalLicenses = () => {

  const { isLoading, outputData } = useContext(DataContext)

  const classes = useStyles();
  const [dayValue, setDayValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


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
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = outputData.filter(each => each.expirationDate < dayValue && each.expirationDate >= 0)

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
            <div className={classes.slider}>
              <Typography id="discrete-slider" gutterBottom>
                Dias a expirar: <strong>{dayValue} dias</strong>
              </Typography>
              <ThemeProvider theme={muiTheme}>
                <Slider
                  defaultValue={90}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  min={10}
                  max={90}
                />
              </ThemeProvider>

            </div>
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
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index.toString()}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
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

export default CriticalLicenses