import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { camelToKebab, camelToTitle } from "./text";
import { handleChange, handleFileChange } from "./handlers";

export const formStyles = theme => ({
	container: {
		display: "flex",
		flexDirection: "column",
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: "95%",
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120,
	},
	dense: {
		marginTop: 19,
	},
	menu: {
		width: 200,
	},
	group: {
		margin: theme.spacing.unit,
	},
	button: {
		margin: theme.spacing.unit,
	},
});

export const renderTextField = (context, name, type) => (
	<TextField
		id={camelToKebab(name)}
		variant="outlined"
		label={camelToTitle(name)}
		className={context.props.classes.textField}
		value={context.state[name]}
		onChange={handleChange(context, `${name}`)}
		margin="normal"
		type={type ? type : "text"}
		autoComplete="off"
		required={true}
	/>
);

export const renderNumberField = (context, name) => (
	<TextField
		id={camelToKebab(name)}
		variant="outlined"
		label={camelToTitle(name)}
		className={context.props.classes.textField}
		value={context.state[name]}
		onChange={handleChange(context, `${name}`)}
		margin="normal"
		type="number"
		autoComplete="off"
		required={true}
	/>
);

export const renderFileUploadField = (context, name) => (
	<TextField
		id={camelToKebab(name)}
		className={context.props.classes.textField}
		onChange={handleFileChange(context, `${name}`)}
		margin="normal"
		type="file"
		required={true}
	/>
);

export const renderDropdownSelect = (context, name, options) => (
	<TextField
		id={camelToKebab(name)}
		select
		variant="outlined"
		label={camelToTitle(name)}
		className={context.props.classes.textField}
		value={context.state[name]}
		onChange={handleChange(context, name)}
		margin="normal"
	>
		{options.map(option => (
			<MenuItem key={option.id} value={option.id}>
				{option.label}
			</MenuItem>
		))}
	</TextField>
);

export const renderSelectCustomHandle = (context, name, options, handler) => (
	<TextField
		id={camelToKebab(name)}
		name={name}
		select
		variant="outlined"
		label={camelToTitle(name)}
		className={context.props.classes.textField}
		value={context.state[name]}
		onChange={handler}
		margin="normal"
	>
		{options.map(option => (
			<MenuItem key={option.id} value={option.id}>
				{option.label}
			</MenuItem>
		))}
	</TextField>
);

export const renderRadioGroup = (context, name, radios) => (
	<FormControl component="fieldset">
		<RadioGroup
			row={true}
			aria-label={name}
			name={name}
			className={context.props.classes.group}
			value={context.state[name]}
			onChange={handleChange(context, `${name}`)}
		>
			{radios.map(radio => {
				return (
					<FormControlLabel
						key={radio.value}
						value={radio.value}
						control={<Radio color="primary" />}
						label={radio.label}
					/>
				);
			})}
		</RadioGroup>
	</FormControl>
);
