import * as React from "react";
import InputBase from "@material-ui/core/InputBase";
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { searchForStringValues, debounce } from "../utils";
import { useCitiesState, useCitiesDispatch } from "../context/CitiesContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      marginTop: theme.spacing(3),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        margin: 0,
        width: "220px",
        transition: theme.transitions.create("width"),
        "&:focus-within": {
          width: "100%",
        },
      },
      [theme.breakpoints.up("md")]: {
        width: "230px",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
      width: "100%",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      width: "100%",
    },
  })
);

const SearchBox: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const { data } = useCitiesState();
  const filterDispatch = useCitiesDispatch();

  const handleSearch = debounce((searchTerm: string | undefined): void => {
    console.log(searchTerm);
    let filteredData = data;
    if (searchTerm) {
      filteredData = searchForStringValues(data, "city", searchTerm);
    }
    filterDispatch({ type: "setFilteredData", data: filteredData });
    return;
  });

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search by City Name..."
        inputProps={{ "aria-label": "search" }}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleSearch(event?.currentTarget?.value)
        }
      />
    </div>
  );
};

export default SearchBox;
