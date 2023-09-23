import React, { useState } from 'react';
import { Button, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import { LuSettings } from 'react-icons/lu';
import { TbLogout } from 'react-icons/tb';
import classNames from 'classnames/bind';
import styles from './Settings.module.scss';

import type { MenuProps } from 'antd';

const cn = classNames.bind(styles);

const Settings = () => {
  const { t } = useTranslation();

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <TbLogout size={15} />,
      label: t('header.logout'),
      onClick: () => {
        alert('로그아웃');
      },
    },
  ];

  return (
    <div className={cn('settings')}>
      <Dropdown
        menu={{ items }}
        placement="bottomRight"
        arrow={{ pointAtCenter: true }}
        trigger={['click']}
      >
        <LuSettings size={20} />
      </Dropdown>
    </div>
  );
};

export default Settings;
