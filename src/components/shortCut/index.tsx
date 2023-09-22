import React from 'react';
import { RiFileAddLine } from 'react-icons/ri';
import { MdDriveFolderUpload } from 'react-icons/md';
import { BiSave, BiPrinter } from 'react-icons/bi';
import { IoMdHelp } from 'react-icons/io';
import { AiOutlineDatabase } from 'react-icons/ai';
import { SiPeerlist } from 'react-icons/si';
import { CgList } from 'react-icons/cg';
import { BsCalculator } from 'react-icons/bs';
import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import ProgressBar from 'pages/main/components/progress-bar';
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
    { title: t('short-cut.reference-material'), icon: <SiPeerlist /> },
    { title: t('short-cut.perform-calculation'), icon: <BsCalculator /> },
    { title: t('short-cut.list-analysis'), icon: <CgList /> },
    {
      title: t('short-cut.impact-assessment'),
      icon: <ProgressBar />,
    },
    { title: t('short-cut.db-manager'), icon: <AiOutlineDatabase /> },
    { title: t('short-cut.help'), icon: <IoMdHelp /> },
  ];

  return (
    <div className={cn('short-cut-wapper')}>
      {buttons.map((button, index) => (
        <div className={cn('button')} key={index}>
          <Tooltip title={button.title} placement="bottom">
            {button.icon}
          </Tooltip>
          {/* <span>{button.title}</span> */}
        </div>
      ))}
    </div>
  );
};

export default ShortCut;
