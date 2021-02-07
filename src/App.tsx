import * as React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { CitiesProvider } from "./context/CitiesContext";
import Cities from "./pages/Cities";
import { Navbar } from "./components";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
      backgroundColor: "#fff",
    },
  })
);

const App: React.FC = (): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline>
        <Paper elevation={0} className={classes.root}>
          <CitiesProvider>
            <Navbar brandTitle="City Searcher" />
            <Cities />
          </CitiesProvider>
        </Paper>
      </CssBaseline>
    </>
  );
};

export default App;
