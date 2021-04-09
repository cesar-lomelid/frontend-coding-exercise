import React, { Fragment, useState } from 'react';
import {
 FormControl, Button, Grid, TextField,
} from '@material-ui/core';

export const AddColor = (props: { callback: (arg0: string) => void; }) => {
  const [newColor, setNewColor] = useState('');

  const updateNewColor = (e: { target: { value: React.SetStateAction<string>; }; }) => setNewColor(e.target.value);

  const addNewColor = () => {
    props.callback(newColor);
    setNewColor('');
  }

  return (
    <Fragment>
      <Grid item xs={8}>
        <FormControl fullWidth>
          <TextField variant='outlined' label='Add color to dropdown' onChange={updateNewColor} />
        </FormControl>
      </Grid>
      <Grid item xs={8}>
        <Button variant='outlined' color='secondary' onClick={addNewColor}>
          Add Color
        </Button>
      </Grid>
    </Fragment>
  );
};