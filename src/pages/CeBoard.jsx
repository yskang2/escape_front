import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';
import { Header } from '../components';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const CeBoard = () => {
  const [data, setData] = useState([]);
  const toolbarOptions = ['Search'];
  const editing = { allowDeleting: true, allowEditing: true };
  const { currentLanguage } = useStateContext();
  useEffect(() => {
    // API에서 게시판 목록을 가져옵니다.
    axios.get('/board/ceposts')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching the posts', error);
      });
  }, []);

  const columns = [
    { field: 'id', headerText: currentLanguage === 'Eng' ? 'No' : '번호', width: 50 },
    { field: 'title', headerText: currentLanguage === 'Eng' ? 'Title' : '제목', width: 150 },
    { field: 'author', headerText: currentLanguage === 'Eng' ? 'Author' : '작성자', width: 100 },
    { field: 'created_at', headerText: currentLanguage === 'Eng' ? 'Created At' : '작성일', format: 'yMd', width: 120 },
    { field: 'views', headerText: currentLanguage === 'Eng' ? 'Views' : '조회수', width: 90 },
  ];
  const navigate = useNavigate();
  const handleRowSelected = (args) => {
    const postId = args.data.id;
    navigate(`/ceboard/post/${postId}`);
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category={currentLanguage === 'Eng' ? 'Board (Shared)' : '게시판(공유)'}
        title={currentLanguage === 'Eng' ? 'Clinical expert communication bulletin Board' : '임상전문가 소통 게시판'}
      />
      <GridComponent
        dataSource={data}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
        rowSelected={handleRowSelected}
      >
        <ColumnsDirective>
          {columns.map((item, index) => (
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
        <Inject services={[Search, Page]} />
      </GridComponent>
      <div className="mt-4 flex justify-end">
        <button type="button" onClick={() => navigate('/ceboard/create')} className="bg-blue-500 text-white px-6 py-2 rounded-md">{currentLanguage === 'Eng' ? 'Create Post' : '글쓰기'}</button>
      </div>
    </div>
  );
};

export default CeBoard;
