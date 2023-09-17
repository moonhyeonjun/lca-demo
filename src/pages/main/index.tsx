import Flow from 'pages/main/components/flow/Flow';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import TreeNode from './components/tree';
import { ReactFlowProvider } from 'reactflow';

const cn = classNames.bind(styles);

const MainPage = () => {
  return (
    <div className={cn('main-page')}>
      <ReactFlowProvider>
        <TreeNode />
        <Flow />
      </ReactFlowProvider>
    </div>
  );
};

export default MainPage;
