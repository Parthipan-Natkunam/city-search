import * as React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

type FilterDropDownProps = {
  label: string;
  menuOptions: Array<string>;
  value?: string;
  changeHandler: Function;
  applyDefaultSelection?: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formItem: {
      margin: theme.spacing(0, 2),
      width: 120,
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(2),
      },
    },
  })
);

const FilterDropDown: React.FC<FilterDropDownProps> = ({
  label,
  menuOptions,
  changeHandler,
  value,
  applyDefaultSelection,
}): JSX.Element => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formItem}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={applyDefaultSelection ? value ?? menuOptions[0] : undefined}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          const selectedValue = event?.target?.value;
          changeHandler(selectedValue);
        }}
      >
        {menuOptions.map((option: string) => (
          <MenuItem key={`option-${option}`} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterDropDown;
