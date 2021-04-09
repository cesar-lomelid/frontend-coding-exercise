import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import ColorForm from './scenes/ColorForm';
import NotFound from './components/NotFound';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#47B2FA',
      contrastText: '#fff',
    },
  },
  typography: {
    fontSize: 12,
    fontFamily: 'Sans-serif',
  },
});

const App: React.FC = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={ColorForm} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
