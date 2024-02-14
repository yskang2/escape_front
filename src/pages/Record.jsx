import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { useStateContext } from '../contexts/ContextProvider';
import { Header } from '../components';

const Record = () => {
  const [data, setData] = useState([]);
  const { user, currentLanguage } = useStateContext();
  const editing = { allowDeleting: false, allowEditing: false };

  useEffect(() => {
    // API에서 기록지 목록을 가져옵니다.
    axios.get('/record/posts', {
      params: {
        userName: user.name,
        isAdmin: user.admin === 'Y',
      },
    }).then((response) => {
      // 각 데이터 항목에 행 번호(rowNumber) 추가
      const newData = response.data.map((item, index) => ({
        ...item,
        rowNumber: index + 1, // 1부터 시작하는 행 번호
      }));
      setData(newData);
    }).catch((error) => {
      console.error('Error fetching the records', error);
    });
  }, [user.name, user.admin]);

  const ordersGrid = [
    { field: 'rowNumber', headerText: currentLanguage === 'Eng' ? 'No' : '번호', width: 50 },
    { field: 'title', headerText: currentLanguage === 'Eng' ? 'Record Sheet Title' : '기록지 제목', width: 150 },
    { field: 'author', headerText: currentLanguage === 'Eng' ? 'Author' : '작성자', width: 100 },
    { field: 'created_at', headerText: currentLanguage === 'Eng' ? 'Created At' : '작성일', format: 'yMd', width: 120 },
    { field: 'type_name', headerText: currentLanguage === 'Eng' ? 'Type of Record' : '기록지 유형', width: 90 },
  ];

  const navigate = useNavigate();

  const handleRecordClick = (args) => {
    const selectedRecordId = args.rowData.id;
    navigate(`/record/post/${selectedRecordId}`);
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category={currentLanguage === 'Eng' ? 'Record Sheet' : '기록지'}
        title={currentLanguage === 'Eng' ? 'Record Management' : '기록지관리'}
      />
      <GridComponent
        id="gridcomp"
        dataSource={data}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        editSettings={editing}
        recordClick={handleRecordClick} // recordClick 이벤트 핸들러 추가
      >
        <ColumnsDirective>
          {ordersGrid.map((item, index) => (
            <ColumnDirective
              key={index}
              field={item.field}
              headerText={item.headerText}
              width={item.width}
              isPrimaryKey={item.isPrimaryKey}
              format={item.format}
            />
          ))}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={() => navigate('/record/create')}
          className="bg-blue-500 text-white px-6 py-2 rounded-md"
        >
          {currentLanguage === 'Eng' ? 'Create Post' : '글쓰기'}
        </button>
      </div>
    </div>
  );
};

export default Record;
