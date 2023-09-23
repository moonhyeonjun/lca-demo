import React, { useState, useEffect } from 'react';
import { Modal, Progress, Button, Tooltip, Result } from 'antd';
import { BiCalculator } from 'react-icons/bi';

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

const PerformCalculation = () => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(false);
  const [percent, setPercent] = useState(0);
  const [progressTitle, setProgressTitle] = useState('');

  const startProgress = (stepIndex: number) => {
    if (stepIndex >= steps.length) {
      // setVisible(false);
      // setPercent(0);
      // setProgressTitle('');
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

  const onclick = () => {
    setVisible(false);
    setPercent(0);
    setProgressTitle('');
  };

  return (
    <>
      <Tooltip title={t('short-cut.perform-calculation')}>
        <BiCalculator onClick={() => setVisible(true)} />
      </Tooltip>
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={500}
        closable={false}
      >
        {percent === 100 ? (
          <Result
            status="success"
            title={t('modal.calculation-sucess-title')}
            subTitle={t('modal.calculation-sucess-sub-title')}
            extra={[
              <Button type="primary" key="console" onClick={onclick}>
                {t('modal.close')}
              </Button>,
            ]}
          />
        ) : (
          <>
            <div className={cn('progress-title')}>{progressTitle}</div>
            <Progress
              strokeColor={twoColors}
              percent={percent}
              status="active"
              style={{ marginBottom: '20px' }}
            />
          </>
        )}
      </Modal>
    </>
  );
};

export default PerformCalculation;
