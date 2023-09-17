import Router from 'Router';
import Header from 'components/header';
import Footer from 'components/footer';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Layout } from 'antd';

const cn = classNames.bind(styles);

const PageLayout = () => {
  return (
    <Layout>
      <Layout.Header className={cn('header')}>
        <Header />
      </Layout.Header>
      <Layout.Content className={cn('content')}>
        <Router />
      </Layout.Content>
      <Layout.Footer className={cn('footer')}>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
};

export default PageLayout;
