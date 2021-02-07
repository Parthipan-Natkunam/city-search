import * as React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(3),
      display: "flex",
      width: "100vw",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    skeleton: {
      width: "100%",
      padding: theme.spacing(1),
      [theme.breakpoints.between("sm", "md")]: {
        width: "50%",
      },
      [theme.breakpoints.up("md")]: {
        width: "33.3333%",
      },
    },
  })
);

const Loader: React.FC = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {Array.from([...Array(12)]).map((item, index) => (
        <div className={classes.skeleton}>
          <Skeleton height={195} key={`loader-${index}`} />
        </div>
      ))}
    </div>
  );
};

export default Loader;
