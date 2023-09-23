import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const Breadcrub = ({ pathname }: any) => {
  const navigate = useNavigate();
  const path = pathname.split('/').pop();
  const items = [
    {
      key: 'home',
      title: <HomeOutlined className={cn('touch')} />,
      onClick: () => navigate('/'),
    },
    {
      key: 'path',
      title: <>{path}</>,
    },
  ];

  return (
    <div className={cn('breadcrub')}>
      <Breadcrumb items={items} />
    </div>
  );
};

export default Breadcrub;
