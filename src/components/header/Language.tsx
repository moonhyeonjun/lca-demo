import React, { useState } from 'react';
import { Button, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames/bind';
import styles from './Language.module.scss';

import type { MenuProps } from 'antd';

const cn = classNames.bind(styles);

const Language = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('en');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div
          onClick={() => changeLanguage('ko')}
          className={cn('language-button')}
        >
          <img src={'/ko.png'} alt="language" width="20px" />
          한국어
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div
          onClick={() => changeLanguage('en')}
          className={cn('language-button')}
        >
          <img src={'/en.png'} alt="language" width="20px" />
          English
        </div>
      ),
    },
  ];

  return (
    <div className={cn('languages')}>
      <Dropdown
        menu={{ items }}
        placement="bottomRight"
        arrow={{ pointAtCenter: true }}
      >
        {language === 'ko' ? (
          <Button type="text" className={cn('language-button')}>
            <img src={'/ko.png'} alt="language" width="20px" />
          </Button>
        ) : (
          <Button type="text" className={cn('language-button')}>
            <img src={'/en.png'} alt="language" width="20px" />
          </Button>
        )}
      </Dropdown>
    </div>
  );
};

export default Language;
