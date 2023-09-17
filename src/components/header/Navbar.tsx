import { getMenuItems } from 'components/header/menuItems';
import MenuItem from './MenuItem';
import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';

const cn = classNames.bind(styles);

const Navbar = () => {
  const menuItems = getMenuItems();

  return (
    <nav>
      <ul className={cn('menus')}>
        {menuItems.map((menu: any, index: number) => {
          const depthLevel = 0;
          return <MenuItem items={menu} key={index} depthLevel={depthLevel} />;
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
