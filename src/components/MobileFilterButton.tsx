import * as React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import FilterListIcon from "@material-ui/icons/FilterList";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "absolute",
      right: 12,
      zIndex: 1000,
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    roundButton: {
      bottom: 0,
    },
    expandedButton: {
      top: 10,
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

const MobileFilterButton: React.FC<{
  isSmall: boolean;
  clickHandler: Function;
}> = ({ isSmall, clickHandler }): JSX.Element => {
  const classes = useStyles();

  const [isFiltersVisible, setIsFiltersVisible] = React.useState<boolean>(
    false
  );

  React.useEffect(() => {
    setIsFiltersVisible(!isSmall);
  }, [isSmall, setIsFiltersVisible]);

  if (!isSmall) return null;

  const classNames = isFiltersVisible
    ? `${classes.root} ${classes.roundButton}`
    : `${classes.root} ${classes.expandedButton}`;

  return (
    <Fab
      variant={isFiltersVisible ? "round" : "extended"}
      className={classNames}
      onClick={() => {
        clickHandler();
        setIsFiltersVisible((prevState: boolean) => !prevState);
      }}
    >
      {isFiltersVisible ? (
        <CloseIcon />
      ) : (
        <FilterListIcon className={classes.extendedIcon} />
      )}
      {isFiltersVisible ? "" : "Filters"}
    </Fab>
  );
};

export default MobileFilterButton;
