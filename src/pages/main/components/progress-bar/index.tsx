import React, { useState, useEffect } from 'react';
import { Modal, Progress, Button, Tooltip } from 'antd';
import { LiaClipboardListSolid } from 'react-icons/lia';
import { useTranslation } from 'react-i18next';

import styles from './index.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);
const twoColors = { '0%': '#108ee9', '100%': '#87d068' };

const steps = [
  { title: '연산 중... 잠시만 기다려 주세요', percent: 10 },
  { title: 'First Step', percent: 40 },
  { title: 'Second Step', percent: 70 },
  { title: 'Third Step', percent: 99 },
  { title: 'complete', percent: 100 },
];

const ProgressBar = () => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(false);
  const [percent, setPercent] = useState(0);
  const [progressTitle, setProgressTitle] = useState('');

  const startProgress = (stepIndex: number) => {
    if (stepIndex >= steps.length) {
      setVisible(false);
      setPercent(0);
      setProgressTitle('');
    } else {
      setTimeout(
        () => {
          setProgressTitle(steps[stepIndex].title);
          setPercent(steps[stepIndex].percent);
          startProgress(stepIndex + 1);
        },
        stepIndex === 0 ? 0 : 2000,
      );
    }
  };

  useEffect(() => {
    if (visible) {
      startProgress(0);
    }
  }, [visible]);

  return (
    <>
      <Tooltip title={t('short-cut.impact-assessment')}>
        <LiaClipboardListSolid onClick={() => setVisible(true)} />
      </Tooltip>
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={500}
        closable={false}
      >
        <div className={cn('progress-title')}>{progressTitle}</div>
        <Progress
          strokeColor={twoColors}
          percent={percent}
          status="active"
          style={{ marginBottom: '20px' }}
        />
      </Modal>
    </>
  );
};

export default ProgressBar;
