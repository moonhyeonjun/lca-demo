import React from 'react';
import { Dropdown } from 'antd';
import { BiSolidDownArrow } from 'react-icons/bi';
import classNames from 'classnames/bind';
import styles from './MenuItem.module.scss';

import type { MenuProps } from 'antd';

const cn = classNames.bind(styles);

const MenuItem = ({ items: menus }: any) => {
  const items: MenuProps['items'] = menus.submenu?.map(
    (submenuItem: any, index: number) => {
      return {
        key: index,
        label: (
          <div className={cn('sub-menu')}>
            {submenuItem.icon} {submenuItem.title}
          </div>
        ),
        onClick: () => {
          console.log('click');
        },
      };
    },
  );

  return (
    <div className={cn('menu-items')}>
      <Dropdown
        menu={{ items }}
        placement="bottomLeft"
        arrow={{ pointAtCenter: true }}
        trigger={['click']}
      >
        <button className={cn('hover-underline-animation')}>
          {menus.title} <BiSolidDownArrow size={8} />
        </button>
      </Dropdown>
    </div>
  );
};

export default MenuItem;
