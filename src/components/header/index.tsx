import Navbar from './Navbar';
import Language from './Language';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './index.module.scss';

const cn = classNames.bind(styles);

const Header = () => {
  return (
    <header>
      <div className={cn('nav-area')}>
        <Link to="/" className={cn('logo')}>
          LCA
        </Link>
        <Navbar />
      </div>
      <Language />
    </header>
  );
};

export default Header;
