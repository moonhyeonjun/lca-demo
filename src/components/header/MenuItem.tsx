import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import classNames from 'classnames/bind';
import styles from './MenuItem.module.scss';

const cn = classNames.bind(styles);

const MenuItem = ({ items, depthLevel }: any) => {
  const [dropdown, setDropdown] = useState(false);

  const ref = useRef<any>(null);

  useEffect(() => {
    const handler = (event: any) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [dropdown]);

  // const onMouseEnter = () => {
  //   window.innerWidth > 960 && setDropdown(true);
  // };

  // const onMouseLeave = () => {
  //   window.innerWidth > 960 && setDropdown(false);
  // };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  return (
    <li
      className={cn('menu-items')}
      ref={ref}
      // onMouseEnter={onMouseEnter}
      // onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            className={cn('hover-underline-animation')}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {window.innerWidth < 960 && depthLevel === 0 ? (
              items.title
            ) : (
              <Link to={items.url}>{items.title}</Link>
            )}

            {depthLevel > 0 && window.innerWidth < 960 ? null : depthLevel >
                0 && window.innerWidth > 960 ? (
              <span>&raquo;</span>
            ) : (
              <span className={cn('arrow')} />
            )}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : !items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            className={cn('hover-underline-animation')}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title}{' '}
            {depthLevel > 0 ? (
              <span>&raquo;</span>
            ) : (
              <span className={cn('arrow')} />
            )}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        <Link to={items.url}>{items.title}</Link>
      )}
    </li>
  );
};

export default MenuItem;
