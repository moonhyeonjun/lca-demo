import styles from './index.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const Footer = () => {
  return <div className={cn('footer')}>Footer</div>;
};

export default Footer;
