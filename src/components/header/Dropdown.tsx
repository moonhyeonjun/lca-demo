import MenuItems from './MenuItem';
import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';

const cn = classNames.bind(styles);

interface DropdownProps {
  submenus: submenusProps[];
  dropdown: boolean;
  depthLevel: number;
}

interface submenusProps {
  title: string;
  path: string;
  dropdown: boolean;
  submenus: submenusProps[];
}

const Dropdown = ({ submenus, dropdown, depthLevel }: DropdownProps) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : '';

  return (
    <ul className={cn('dropdown', dropdownClass, dropdown ? 'show' : '')}>
      {submenus.map((submenu: submenusProps, index: number) => (
        <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
      ))}
    </ul>
  );
};

export default Dropdown;
