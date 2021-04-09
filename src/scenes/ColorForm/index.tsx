import React, { useState, useEffect } from 'react';
import {
  FormControl, Button, Grid, Typography, Paper, TextField, MenuItem,
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AddColor } from './components/AddColor/AddColor';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: '40px',
  },
  paper: {
    padding: theme.spacing(2),
  },
  title: {
    fontSize: '24px'
  }
}));

const ColorForm: React.FC = () => {
  const classes = useStyles();
  const [error, setError] = useState('');
  const [colors, setColors] = useState(['']);
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [selectedColor, setSelectedColor] = useState('Red');

  useEffect(() => {
    fetch('api/colors')
      .then(res => res.json())
      .then((data) => {
        let savedColors: any = [];
        data.colors.map((d: any) => {
          savedColors.push(d.value);
        });
        setColors(savedColors);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  // Add new color to optios, if exist it dowsn't be added.
  const handleAddColor = (color: string) => {
    if (!colors.find(c => c === color)) {
      setColors([...colors, color]);
    }
  }

  const handleSubmit = () => {
    fetch('api/users', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        birthday: birthday,
        color: selectedColor
      })
    })
      .then((res) => {
        console.log(res.json());
        toast.success('User added successfully!');
      })
      .catch((error) => {
        setError(error);
        toast.error('Error adding user.');
      });
  }

  let options = colors.map((color: string, index: number) => {
    return(
      <MenuItem key={index} value={color}>{color}</MenuItem>
    );
  });

  return (
        <div className={classes.root}>
          <Grid container justify='center' spacing={3}>
            <Grid item xs={6}>
              <Paper elevation={0} variant='outlined' square className={classes.paper}>
                <Grid container justify='center' spacing={3}>
                  <Grid item xs={8}>
                    <Typography className={classes.title}>New Color</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container justify='center' spacing={3}>
                      <Grid item xs={8}>
                        <FormControl fullWidth>
                          <TextField
                            type='text'
                            label='Name'
                            variant='outlined'
                            inputProps={{ "data-testid": "content-input" }}
                            onChange={e => setName(e.target.value)}
                            required
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={8}>
                        <FormControl fullWidth>
                          <TextField
                            label='Birthday'
                            type='date'
                            variant='outlined'
                            defaultValue={Date.now}
                            onChange={e => setBirthday(e.target.value)}
                            required
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={8}>
                        <FormControl fullWidth>
                          <TextField
                            label='Color'
                            select
                            variant='outlined'
                            value={selectedColor}
                            onChange={e => setSelectedColor(e.target.value)}
                            required
                          >
                            {options}
                          </TextField>
                        </FormControl>
                      </Grid>
                      <AddColor callback={handleAddColor} />
                      <Grid item xs={8}>
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={handleSubmit}
                        >
                          Save User
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
          />
        </div>
  );
};

export default ColorForm;