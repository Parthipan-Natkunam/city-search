import * as React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import PageviewIcon from "@material-ui/icons/Pageview";
import SearchBox from "./SearchBox";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(3),
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
    },
    icon: {
      marginRight: theme.spacing(1),
      verticalAlign: "bottom",
    },
    brandText: {
      userSelect: "none",
      flex: "0 0 50%",
    },
  })
);

interface NavbarProps {
  brandTitle: string;
}

const Navbar: React.FC<NavbarProps> = ({ brandTitle }): JSX.Element => {
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.root}>
      <Typography variant="h5" className={classes.brandText}>
        <PageviewIcon fontSize="large" className={classes.icon} />
        {brandTitle}
      </Typography>
      <SearchBox />
    </AppBar>
  );
};

export default Navbar;
