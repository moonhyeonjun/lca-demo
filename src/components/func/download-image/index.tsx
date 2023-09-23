import React from 'react';
import { useReactFlow, getRectOfNodes, getTransformForBounds } from 'reactflow';
import { useTranslation } from 'react-i18next';
import { toPng } from 'html-to-image';
import { Tooltip } from 'antd';
import { BiPrinter } from 'react-icons/bi';

const downloadImage = (dataUrl: string) => {
  const a = document.createElement('a');

  a.setAttribute('download', 'reactflow.png');
  a.setAttribute('href', dataUrl);
  a.click();
};

const imageWidth = 1024;
const imageHeight = 768;

const DownloadButton = () => {
  const { t } = useTranslation();

  const { getNodes } = useReactFlow();
  const onClick = () => {
    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2,
    );

    // toPng(document.querySelector('.react-flow__viewport'), {
    //   backgroundColor: '#1a365d',
    //   width: imageWidth,
    //   height: imageHeight,
    //   style: {
    //     width: imageWidth,
    //     height: imageHeight,
    //     transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
    //   },
    // }).then(downloadImage);
  };

  return (
    <Tooltip title={t('short-cut.print')}>
      <BiPrinter onClick={onClick} />
    </Tooltip>
  );
};

export default DownloadButton;
