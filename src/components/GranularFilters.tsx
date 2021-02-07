import * as React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import GpsNotFixedIcon from "@material-ui/icons/GpsNotFixed";
import DropDrownFilter from "./FilterDropDrown";
import { useCitiesState, useCitiesDispatch } from "../context/CitiesContext";
import { getUserLocation } from "../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: theme.spacing(3, 2),
      padding: theme.spacing(2),
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
    },
    boldTitle: {
      fontWeight: "bold",
    },
    formWrapper: {
      flexBasis: "640px",
    },
    geoLocation: {
      position: "absolute",
      top: 24,
      right: 15,
      padding: theme.spacing(2),
    },
  })
);

const defaultSortMenuOption = ["None", "Name", "Population"];

const GranularFilters: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const { filters, provinces, isGeolocationEnabled } = useCitiesState();
  const filterDispatch = useCitiesDispatch();

  const handleGeoLocationEnable = async () => {
    try {
      const { lat, lng } = await getUserLocation();
      filterDispatch({ type: "setUserLocation", location: { lat, lng } });
    } catch (err) {
      console.error(err);
      filterDispatch({ type: "setUserLocation" });
    }
  };

  return (
    <Paper elevation={6} className={classes.paper}>
      <Typography
        color="textPrimary"
        variant="subtitle1"
        className={classes.boldTitle}
        gutterBottom
      >
        Filters
      </Typography>
      <div className={classes.formWrapper}>
        <DropDrownFilter
          label="Province"
          menuOptions={provinces}
          value={filters?.province || "None"}
          changeHandler={(val: string | undefined) =>
            filterDispatch({
              type: "setProvinceFilter",
              province: val ?? "None",
            })
          }
          applyDefaultSelection
        />
        <DropDrownFilter
          label="Sort By"
          menuOptions={
            isGeolocationEnabled
              ? [...defaultSortMenuOption, "Distance"]
              : defaultSortMenuOption
          }
          value={filters?.sort?.sortKey}
          changeHandler={(val: any) =>
            !!val
              ? val === "None"
                ? filterDispatch({ type: "setSortKey" })
                : filterDispatch({ type: "setSortKey", sortKey: val })
              : null
          }
          applyDefaultSelection
        />
        {filters?.sort ? (
          <DropDrownFilter
            label="Order"
            menuOptions={["ASC", "DESC"]}
            changeHandler={(val: any) =>
              !!val && !!filters?.sort
                ? filterDispatch({ type: "setSortOrder", sortOrder: val })
                : null
            }
            value={filters?.sort?.sortOrder}
            applyDefaultSelection={!!filters?.sort}
          />
        ) : null}
        {isGeolocationEnabled ? (
          <Typography
            color="textSecondary"
            variant="caption"
            className={classes.geoLocation}
            gutterBottom
          >
            Geolocation Enabled
          </Typography>
        ) : (
          <Button
            color="primary"
            variant="contained"
            className={classes.geoLocation}
            onClick={handleGeoLocationEnable}
            disabled={
              typeof isGeolocationEnabled === "boolean" &&
              isGeolocationEnabled === false
            }
          >
            <GpsNotFixedIcon />
            &nbsp;Enable Geolocation
          </Button>
        )}
      </div>
    </Paper>
  );
};

export default GranularFilters;
