import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form'

export default function MyDatePickerField(props) {
    const { label, width, name, control } = props
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

        <Controller
            name = {name}
            control = {control}
            render = {({
                field: {onChange, value},
                
                
                }) => (
                    <DatePicker 
                    onChange={onChange}
                    value={value}
                    sx={{width: {width}}} 
                    label={label} />
                )}
        />
      
        
  
    </LocalizationProvider>
  );
}