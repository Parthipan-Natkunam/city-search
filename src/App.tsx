import * as React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Navbar, CityCard } from "./components";
import { useFetchAllCities } from "./hooks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
      backgroundColor: "#c1c1c1",
    },
  })
);

const App: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const { isLoading, isError, data: cities } = useFetchAllCities(
    process.env.CITIES_ENDPOINT
  );

  return (
    <>
      <CssBaseline>
        <Paper elevation={0} className={classes.root}>
          <Navbar brandTitle="City Searcher" />
          {isLoading && <h1>Loading...</h1>}
          {isError && <h1>Something went wrong...</h1>}
          {cities?.length && (
            <div>
              {cities.map(
                ({
                  city: name,
                  population,
                  admin_name: province,
                  lat,
                  lng,
                }: any) => (
                  <CityCard
                    key={`city-${lat}-${lng}`}
                    name={name}
                    population={population}
                    province={province}
                    lat={lat}
                    lng={lng}
                  />
                )
              )}
            </div>
          )}
        </Paper>
      </CssBaseline>
    </>
  );
};

export default App;
