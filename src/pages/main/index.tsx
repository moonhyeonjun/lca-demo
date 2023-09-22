import { useEffect } from 'react';
import Flow from 'pages/main/components/flow/Flow';
import TreeNode from './components/tree';
import SpreadSheet from './components/sheet';
import { ReactFlowProvider } from 'reactflow';
import { useLocation } from 'react-router-dom';

import './index.scss';

const MainPage = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <div className="main">
      <ReactFlowProvider>
        <TreeNode />
        {location.pathname === '/' ? <Flow /> : <SpreadSheet />}
      </ReactFlowProvider>
    </div>
  );
};

export default MainPage;
