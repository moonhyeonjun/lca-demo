import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Language.module.scss';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

const cn = classNames.bind(styles);

const Language = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('en');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <div className={cn('languages')}>
      <button
        className={cn('language', { active: language === 'ko' })}
        onClick={() => changeLanguage('ko')}
      >
        한국어
      </button>
      <button
        className={cn('language', { active: language === 'en' })}
        onClick={() => changeLanguage('en')}
      >
        English
      </button>
    </div>
  );
};

export default Language;
