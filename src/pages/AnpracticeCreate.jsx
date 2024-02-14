import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

const AnpracticeCreate = () => {
  const navigate = useNavigate();
  const { user, currentLanguage } = useStateContext();
  // const [board, setBoard] = useState('게시판1');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const author = user?.name;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      // board,
      title,
      content,
      author,
    };

    try {
      await axios.post('/board/anpracticeposts', newPost);
      navigate('/anpractice');
    } catch (error) {
      console.error('Error creating the post:', error);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <h1 className="text-3xl font-bold mb-6">{currentLanguage === 'Eng' ? 'Group2 Board write' : 'Group2 글쓰기'}</h1>
      <form onSubmit={handleSubmit}>
        {/* <div className="mb-4">
          <label htmlFor="selectOption">게시판 선택:
            <select id="selectOption" value={board} onChange={(e) => setBoard(e.target.value)}>
              <option value="게시판1">게시판1</option>
            </select>
          </label>
        </div> */}
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={currentLanguage === 'Eng' ? 'Title' : '제목'}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={currentLanguage === 'Eng' ? 'Content' : '내용'}
            className="w-full px-3 py-2 border rounded-md"
            rows="10"
          />
        </div>
        <div className="flex justify-end">
          <button type="button" onClick={() => navigate('/anpractice')} className="bg-gray-500 text-white px-6 py-2 rounded-md mr-2">{currentLanguage === 'Eng' ? 'cancel' : '취소'}</button>
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md">{currentLanguage === 'Eng' ? 'regist' : '등록'}</button>
        </div>
      </form>
    </div>
  );
};

export default AnpracticeCreate;
