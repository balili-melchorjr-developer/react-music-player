import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form'
import { Box, Typography } from '@mui/material'

export default function MyMultilineField(props) {
    const { label, width, placeholder, name, control } = props
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <Controller
            name = {name}
            control = {control}
            render = {({
                field: {onChange, value},
                fieldState:{error},
                formState,
                }) => (
                    <TextField
                        sx={{width: {width}}}
                        id="standard-multiline-static"
                        label={label}
                        multiline
                        onChange={onChange}
                        value={value}
                        rows={1}
                        variant="standard"
                        placeholder={placeholder}
                        error={!!error}
                        helperText={error?.message}
                        />
                )}
            
        />
    </Box>
  );
}