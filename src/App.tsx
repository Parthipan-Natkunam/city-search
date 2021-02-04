import * as React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { CitiesProvider } from "./context/CitiesContext";
import Cities from "./pages/Cities";
import { Navbar } from "./components";
import { Pagination } from "./components";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
      backgroundColor: "#c1c1c1",
    },
    paginationContainer: {
      marginTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      display: "flex",
      justifyContent: "center",
    },
  })
);

const App: React.FC = (): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline>
        <Paper elevation={0} className={classes.root}>
          <Navbar brandTitle="City Searcher" />
          <CitiesProvider>
            <Grid container>
              <Cities />
            </Grid>
            <Grid container className={classes.paginationContainer}>
              <Pagination />
            </Grid>
          </CitiesProvider>
        </Paper>
      </CssBaseline>
    </>
  );
};

export default App;
