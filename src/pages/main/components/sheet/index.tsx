import { useState, useMemo, useCallback } from 'react';
import {
  DynamicDataSheetGrid,
  textColumn,
  keyColumn,
  AddRowsComponentProps,
  createContextMenuComponent,
} from 'react-datasheet-grid';
import { BiCopy, BiCut, BiPaste } from 'react-icons/bi';
import { TbRowInsertBottom } from 'react-icons/tb';
import { GrDuplicate } from 'react-icons/gr';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import uuid from 'react-uuid';
import styles from './index.module.scss';
import classNames from 'classnames/bind';

import 'react-datasheet-grid/dist/style.css';

const cn = classNames.bind(styles);

const SpreadSheet = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [data, setData] = useState<any>(dummyData());
  const [prevData, setPrevData] = useState(dummyData());

  const createdRowIds = useMemo(() => new Set(), []);
  const deletedRowIds = useMemo(() => new Set(), []);
  const updatedRowIds = useMemo(() => new Set(), []);

  const columns = useMemo(
    () => [
      { ...keyColumn('firstName', textColumn), title: 'First name' },
      { ...keyColumn('lastName', textColumn), title: 'Last name' },
    ],
    [],
  );

  const onActiveCellChange = (cell: any) => {
    const { cell: activeCell } = cell;
    if (activeCell) {
      const { row: rowIndex } = activeCell;
      const row = data[rowIndex];
      console.log('row', row);
    }
  };

  const createRow: any = useCallback(() => {
    const row = {
      id: uuid(),
      active: false,
      firstName: 'new',
      lastName: 'new',
    };
    return row;
  }, []);

  const bottomButonComponent: any = ({ addRows }: AddRowsComponentProps) => {
    return (
      <div className="dsg-add-row">
        <button
          type="button"
          className={cn('bottom-button')}
          onClick={() => addRows(1)}
        >
          {t('spread-sheet.add')}
        </button>
        <div className="dsg-commit-row">
          <button
            type="button"
            className={cn('bottom-button')}
            onClick={cancel}
          >
            {t('spread-sheet.cancel')}
          </button>
          <button
            type="button"
            className={cn('bottom-button', 'save')}
            onClick={save}
          >
            {t('spread-sheet.save')}
          </button>
        </div>
      </div>
    );
  };

  const cancel = () => {
    setData(prevData);
    createdRowIds.clear();
    deletedRowIds.clear();
    updatedRowIds.clear();
  };

  const save = () => {
    const newData = data.filter(({ id }: any) => !deletedRowIds.has(id));
    setData(newData);
    setPrevData(newData);

    createdRowIds.clear();
    deletedRowIds.clear();
    updatedRowIds.clear();
  };

  const onChange = (newValue: any, operations: any) => {
    for (const operation of operations) {
      switch (operation.type) {
        case 'CREATE':
          newValue
            .slice(operation.fromRowIndex, operation.toRowIndex)
            .forEach(({ id }: any) => createdRowIds.add(id));
          break;
        case 'UPDATE':
          newValue
            .slice(operation.fromRowIndex, operation.toRowIndex)
            .forEach(({ id }: any) => {
              if (!createdRowIds.has(id) && !deletedRowIds.has(id)) {
                updatedRowIds.add(id);
              }
            });
          break;
        case 'DELETE':
          let keptRows = 0;
          data
            .slice(operation.fromRowIndex, operation.toRowIndex)
            .forEach(({ id }: any, i: number) => {
              updatedRowIds.delete(id);
              if (createdRowIds.has(id)) {
                createdRowIds.delete(id);
              } else {
                deletedRowIds.add(id);
                newValue.splice(
                  operation.fromRowIndex + keptRows++,
                  0,
                  data[operation.fromRowIndex + i],
                );
              }
            });
          break;
        default:
          break;
      }
    }
    setData(newValue);
  };

  const rowClassName = ({ rowData }: any) => {
    if (deletedRowIds.has(rowData.id)) {
      return 'row-deleted';
    }
    if (createdRowIds.has(rowData.id)) {
      return 'row-created';
    }
    if (updatedRowIds.has(rowData.id)) {
      return 'row-updated';
    }
  };

  const CustomContextMenuButton = ({ text, icon }: any) => {
    return (
      <div className="dsg-context-menu-item">
        {icon}
        <span>{text}</span>
      </div>
    );
  };

  const ContextMenu: any = createContextMenuComponent((item): any => {
    const menuItem = contextMenuItems.find(
      (menuItem) => menuItem.type === item.type,
    );
    if (!menuItem) {
      return <></>;
    }

    return (
      <>
        {CustomContextMenuButton({
          text:
            typeof menuItem.text === 'function'
              ? menuItem.text(item)
              : menuItem.text,
          icon: menuItem.icon,
        })}
      </>
    );
  });

  const contextMenuItems = [
    {
      type: 'CUT',
      text: t('spread-sheet.cut'),
      icon: <BiCut />,
    },
    {
      type: 'COPY',
      text: t('spread-sheet.copy'),
      icon: <BiCopy />,
    },
    {
      type: 'PASTE',
      text: t('spread-sheet.paste'),
      icon: <BiPaste />,
    },
    {
      type: 'DELETE_ROW',
      text: t('spread-sheet.delete-row'),
      icon: <RiDeleteBin7Line />,
    },
    {
      type: 'DELETE_ROWS',
      text: (item: any) =>
        `${t('spread-sheet.delete-row')} ${item.fromRow} - ${item.toRow}`,
      icon: <RiDeleteBin7Line />,
    },
    {
      type: 'INSERT_ROW_BELLOW',
      text: t('spread-sheet.insert-row-below'),
      icon: <TbRowInsertBottom />,
    },
    {
      type: 'DUPLICATE_ROW',
      text: t('spread-sheet.duplicate-row'),
      icon: <GrDuplicate />,
    },
    {
      type: 'DUPLICATE_ROWS',
      text: (item: any) =>
        `${t('spread-sheet.duplicate-row')} ${item.fromRow} - ${item.toRow}`,
      icon: <GrDuplicate />,
    },
  ];

  return (
    <div>
      <Button className={cn('back-button')} onClick={() => navigate(-1)}>
        Back
      </Button>

      <DynamicDataSheetGrid
        value={data}
        height={500}
        onChange={onChange}
        rowClassName={rowClassName}
        columns={columns}
        onActiveCellChange={onActiveCellChange}
        addRowsComponent={bottomButonComponent}
        createRow={createRow}
        contextMenuComponent={ContextMenu}
      />
    </div>
  );
};

// dummy data 100row
const dummyData = () => {
  const data: any = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      id: i,
      firstName: 'firstName' + i,
      lastName: 'lastName' + i,
    });
  }
  return data;
};

export default SpreadSheet;
