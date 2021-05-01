import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import GlobalStyle from './GlobalStyle';
import theme from './theme';
import CardList from './pages/CardList/CardList';
import CardAddForm from './pages/CardAddForm/CardAddForm';
import CardAddComplete from './pages/CardAddComplete/CardAddComplete';
import CardListDev from './pages/CardList/CardList.dev';
import CardAddCompleteDev from './pages/CardAddComplete/CardAddComplete.dev';
import ROUTE from './constants/route';

// TODO: 조건부 렌더링 되는 컴포넌트에, hook을 쓰면 안된다.
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
        <Route
          exact
          path={ROUTE.COMPLETE}
          component={process.env.REACT_APP_ENV === 'dev' ? CardAddCompleteDev : CardAddComplete}
        />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
