import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import GlobalStyle from './GlobalStyle';
import theme from './theme';
import CardList from './pages/CardList/CardList';
import CardListDev from './pages/CardList/CardList.dev';
import CardAddForm from './pages/CardAddForm/CardAddForm';
import CardAddComplete from './pages/CardAddComplete/CardAddComplete';
import ROUTE from './constants/route';

// const test = async () => {
//   try {
//     const res = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/cards`, {
//       method: 'GET',
//     });
//     console.log(await res.json());
//   } catch (error) {
//     console.error(error);
//   }
// };

// test();

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <span>{process.env.REACT_APP_ENV === 'dev' ? 'Dev' : 'Stage'}</span>
    <Router>
      <Switch>
        <Route
          exact
          path={ROUTE.HOME}
          component={process.env.REACT_APP_ENV === 'dev' ? CardListDev : CardList}
        />
        <Route exact path={ROUTE.ADD} component={CardAddForm} />
        <Route exact path={ROUTE.COMPLETE} component={CardAddComplete} />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
