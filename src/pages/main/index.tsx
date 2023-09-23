import Flow from 'pages/main/components/flow/Flow';
import TreeNode from './components/tree';
import SpreadSheet from './components/sheet';
import { ReactFlowProvider } from 'reactflow';
import { useLocation } from 'react-router-dom';
import { Resizable } from 're-resizable';
import Breadcrub from 'components/Breadcrumb';

import './index.scss';

const MainPage = () => {
  const location = useLocation();

  return (
    <div className="main">
      <ReactFlowProvider>
        <Resizable
          defaultSize={{
            width: 200,
            height: 'calc(100vh - 100px)',
          }}
          maxWidth={600}
          minWidth={100}
          enable={{ right: true }}
        >
          <TreeNode />
        </Resizable>
        {location.pathname === '/' ? (
          <Flow />
        ) : (
          <div className="content">
            <Breadcrub pathname={location.pathname} />
            <SpreadSheet />
          </div>
        )}
      </ReactFlowProvider>
    </div>
  );
};

export default MainPage;
