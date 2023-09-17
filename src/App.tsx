import { Provider } from 'react-redux';
import { store } from 'store';
import PageLayout from 'layouts';

const App = () => {
  return (
    <Provider store={store}>
      <PageLayout />
    </Provider>
  );
};

export default App;
