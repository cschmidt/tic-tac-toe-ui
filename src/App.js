import React from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/icons/Menu'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import withRoot from './withRoot'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}


class App extends React.Component {

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Tic Tac Toe
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
          <Paper>
            <Button variant = "contained" >Yo, Imma Button </Button>
          </Paper>
        </AppBar>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(App))
