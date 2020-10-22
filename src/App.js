import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import * as ROUTES from './Components/Router/routes'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { AppBar, CssBaseline, Drawer, Hidden, IconButton, List, ListItem, ListItemText, ListItemIcon, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import HomeIcon from '@material-ui/icons/Home';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import StorageIcon from '@material-ui/icons/Storage';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import './App.css'
import { DataProvider } from './context/DataContext'
import AllCustomers from './Components/AllCustomers'
import CriticalLicenses from './Components/CriticalLicenses'
import CriticalChart from './Components/CriticalChart'
import HomePage from './Components/HomePage'
import CriticalChartDownload from './Components/CriticalChartDownload';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  list: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  },
  listItem: {
    padding: 0,
    width: '4%',
  },
  appBar: {
    backgroundColor: '#ff7e00',
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
}));


function App() {

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }
  const drawer = (
    <div className='Drawer'>
      <List>
        <ListItem>
          <ListItemIcon className='Logo'>
            <img src={require('./images/logo_b2on.png')} className='b2onLogo' />
          </ListItemIcon>
        </ListItem >
        <ListItem button>
          <ListItemText>
            <Link to="/" className='Link'><HomeIcon className='Icon' /> Home</Link>
          </ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText>
            <Link to='/criticalexpiration' className='Link'><TrendingDownIcon className='Icon' /> Licenças Críticas</Link>
          </ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText>
            <Link to='/allcustomers' className='Link'><StorageIcon className='Icon' /> Todas as Licenças</Link>
          </ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText>
            <Link to='/critchart' className='Link'><EqualizerIcon className='Icon' /> Gráfico de Licenças</Link>
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );

  return (
    <DataProvider>
      <Router>
        <div className="App">

          <nav>

            <div className={classes.root}>
              <CssBaseline />
              <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                  <List className={classes.list}>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="h6" noWrap>
                          Meraki Licensing Dashboard
                      </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <ListItemIcon>
                        <AccountCircleIcon />
                      </ListItemIcon>
                    </ListItem>
                  </List>

                </Toolbar>
              </AppBar>

              <nav className={classes.drawer}>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                  <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                      keepMounted: true, // Better open performance on mobile.
                    }}
                  >
                    <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
                      <CloseIcon />
                    </IconButton>
                    {drawer}
                  </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                  <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                  >
                    <div className={classes.toolbar} />
                    {drawer}
                  </Drawer>
                </Hidden>
              </nav>
            </div>

          </nav>
          <div className='Switch'>
            <Switch>
              <Route exact path={ROUTES.HOMEPAGE}>
                <HomePage />
              </Route>
              <Route path={ROUTES.CRIT_EXPIRATION}>
                <CriticalLicenses />
              </Route>
              <Route path={ROUTES.ALL_CUSTOMERS}>
                <AllCustomers />
              </Route>
              <Route path={ROUTES.CRIT_CHART}>
                <CriticalChartDownload />
              </Route>
            </Switch>
          </div>

        </div>
      </Router>
    </DataProvider>
  );
}

export default App;