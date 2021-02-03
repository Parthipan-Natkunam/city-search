import * as React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

interface NavbarProps {
  brandTitle: string;
}

const Navbar: React.FC<NavbarProps> = ({ brandTitle }): JSX.Element => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Typography variant="h5">{brandTitle}</Typography>
    </AppBar>
  );
};

export default Navbar;
