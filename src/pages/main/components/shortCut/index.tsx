import React from 'react';
import { RiFileAddLine } from 'react-icons/ri';
import { MdDriveFolderUpload } from 'react-icons/md';
import { BiSave, BiPrinter, BiFlag } from 'react-icons/bi';
import { IoMdHelp } from 'react-icons/io';
import { AiOutlineDatabase } from 'react-icons/ai';
import { CgList } from 'react-icons/cg';
import { LiaClipboardListSolid } from 'react-icons/lia';

import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import PerformCalculation from 'components/func/perform-calculation';
import classNames from 'classnames/bind';
import styles from './index.module.scss';

const cn = classNames.bind(styles);

const ShortCut = () => {
  const { t } = useTranslation();

  const buttons = [
    { title: t('short-cut.new-file'), icon: <RiFileAddLine /> },
    { title: t('short-cut.open'), icon: <MdDriveFolderUpload /> },
    { title: t('short-cut.save'), icon: <BiSave /> },
    { title: t('short-cut.print'), icon: <BiPrinter /> },
    { title: t('short-cut.standard-material'), icon: <BiFlag /> },
    { title: t('short-cut.perform-calculation'), icon: <PerformCalculation /> },
    { title: t('short-cut.list-analysis'), icon: <CgList /> },
    {
      title: t('short-cut.impact-assessment'),
      icon: <LiaClipboardListSolid />,
    },
    { title: t('short-cut.db-manager'), icon: <AiOutlineDatabase /> },
    { title: t('short-cut.help'), icon: <IoMdHelp /> },
  ];

  //https://www.flaticon.com/search?word=standard&color=black&craft=1

  return (
    <div className={cn('short-cut-wapper')}>
      {buttons.map((button, index) => (
        <div className={cn('button')} key={index}>
          <Tooltip title={button.title} placement="bottom">
            {button.icon}
          </Tooltip>
        </div>
      ))}
    </div>
  );
};

export default ShortCut;
