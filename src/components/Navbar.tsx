import * as React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import PageviewIcon from "@material-ui/icons/Pageview";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    icon: {
      marginRight: theme.spacing(1),
      verticalAlign: "bottom",
    },
    brandText: {
      userSelect: "none",
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
      <Typography variant="h5" className={classes.brandText}>
        <PageviewIcon fontSize="large" className={classes.icon} />
        {brandTitle}
      </Typography>
    </AppBar>
  );
};

export default Navbar;
