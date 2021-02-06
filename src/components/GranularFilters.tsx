import * as React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import GpsNotFixedIcon from "@material-ui/icons/GpsNotFixed";

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
      // paddingRight: theme.spacing(1),
      // borderRight: "2px solid #888585",
    },
    formWrapper: {
      flexBasis: "640px",
    },
    formItem: {
      margin: theme.spacing(0, 2),
      width: 120,
    },
    button: {
      position: "absolute",
      top: 25,
      right: 15,
    },
  })
);

const GranularFilters: React.FC = (): JSX.Element => {
  const classes = useStyles();

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
        <FormControl className={classes.formItem}>
          <InputLabel id="demo-simple-select-label">Province</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            // onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty Five</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formItem}>
          <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            // onChange={handleChange}
          >
            <MenuItem value={10}>Name</MenuItem>
            <MenuItem value={20}>Population</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formItem}>
          <InputLabel id="demo-simple-select-label">Order</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            // onChange={handleChange}
          >
            <MenuItem value={10}>Asc</MenuItem>
            <MenuItem value={20}>Desc</MenuItem>
          </Select>
        </FormControl>
        <Button color="primary" variant="contained" className={classes.button}>
          <GpsNotFixedIcon />
          &nbsp;Enable Geolocation
        </Button>
      </div>
    </Paper>
  );
};

export default GranularFilters;
