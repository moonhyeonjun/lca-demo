import { Route, Routes } from 'react-router-dom';
import Main from './pages/main';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
};
export default Router;
