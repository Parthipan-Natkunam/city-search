import * as React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import RoomIcon from "@material-ui/icons/Room";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2),
    },
    textWrapper: {},
    name: {
      fontWeight: "bold",
      textAlign: "center",
    },
    keyText: {
      fontWeight: "bold",
    },
    buttonWrapper: {
      display: "flex",
      justifyContent: "flex-end",
    },
  })
);

interface CityCardProps {
  name: string;
  population: number;
  province: string;
  lat: number;
  lng: number;
}

const handleViewOnMap = (lat: number, lng: number) => {
  const urlString = `https://maps.google.com/?q=${lat},${lng}&z=18`;
  window.open(urlString);
};

const CityCard: React.FC<CityCardProps> = ({
  name,
  population,
  province,
  lat,
  lng,
}): JSX.Element => {
  const classes = useStyles();

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent className={classes.textWrapper}>
        <Typography color="textPrimary" className={classes.name} gutterBottom>
          {name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          <span className={classes.keyText}>Province: </span> {province}
        </Typography>
        <Typography color="textSecondary">
          <span className={classes.keyText}>Population: </span> {population}
        </Typography>
      </CardContent>
      <CardActions className={classes.buttonWrapper}>
        <Button
          size="small"
          color="secondary"
          onClick={() => handleViewOnMap(lat, lng)}
        >
          <RoomIcon />
          <span>View on Map</span>
        </Button>
      </CardActions>
    </Card>
  );
};

export default CityCard;
