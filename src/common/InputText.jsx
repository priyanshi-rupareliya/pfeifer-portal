import React from "react";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FormControl, FormHelperText, IconButton, InputAdornment, OutlinedInput } from "@mui/material";

function InputText(props) {

  const getEndAdornment = () => {
    if (props.type === "text" && !props.showPassword) {
      return (
        <InputAdornment position="end" style={{ padding: "8px" }}>
          {props.icon}
        </InputAdornment>)
    } else {
      return (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={props.handleClickShowPassword}
          > 
            {props.showPassword ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
          </IconButton>
        </InputAdornment>
      )
    }
  }

  const endAdornment = getEndAdornment()

  return (
    <FormControl sx={{ marginBottom: 3, }} className="input-text" variant="outlined" size={props.size} fullWidth={true}>
      <OutlinedInput
        id={props.id}
        inputRef={props.refe}
        type={props.type}
        value={props.value}
        onChange={props.handleChange}
        endAdornment={endAdornment}
        startAdornment={undefined}
        fullWidth={true}
        required={props.required}
        error={props.error ? true : (props.isRequire && !props.value)}
      />

      {props.error && (
        <FormHelperText className="m-0" error id={`${props.id}-error`}>
          {props.error}
        </FormHelperText>
      )}

      {props.isRequire && !props.value && (
        <FormHelperText className="m-0" error id={`${props.id}-error`}>
          {props.label} is required
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default InputText
