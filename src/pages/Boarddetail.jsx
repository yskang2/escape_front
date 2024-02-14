import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';

const Boarddetail = () => {
  const { user, currentLanguage } = useStateContext();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://54.180.179.9:5002/board/posts/${id}`);
        setPost(response.data);

        const commentsResponse = await axios.get(`http://54.180.179.9:5002/board/posts/${id}/comments`);
        setComments(commentsResponse.data);

        await axios.put(`http://54.180.179.9:5002/board/posts/${id}/increase-view`);
      } catch (error) {
        console.error('Error fetching the post:', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleCommentSubmit = async () => {
    try {
      await axios.post(`http://54.180.179.9:5002/board/posts/${id}/comments`, {
        author: user?.name, // 임시로 사용자 이름을 직접 지정했습니다.
        content: commentInput,
      });

      const commentsResponse = await axios.get(`http://54.180.179.9:5002/board/posts/${id}/comments`);
      setComments(commentsResponse.data);
      setCommentInput('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{currentLanguage === 'Eng' ? 'Free Board' : '자유 게시판'}</h1>
      <div className="bg-white p-8 rounded-md shadow-md">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl">{post.title}</h2>
          <span>{formatDate(post.created_at)}</span>
        </div>
        <hr className="my-4" />
        <div className="mb-4 flex justify-between">
          <div>
            <span className="mr-2">👤 {post.author}</span>
          </div>
          <span>{currentLanguage === 'Eng' ? 'Views' : '조회수'} : {post.views}</span>
        </div>
        <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
      </div>

      <div className="mt-8">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-100 p-4 mb-4 rounded-md shadow-sm">
            <div className="flex justify-between mb-2">
              <span>👤 {comment.author}</span>
              <span className="text-gray-500">{comment.date}</span>
            </div>
            <p>{comment.content}</p>
          </div>
        ))}
        <div className="flex mt-6">
          <input
            className="flex-grow rounded-md p-2"
            type="text"
            placeholder={currentLanguage === 'Eng' ? 'Please enter your comment...' : '댓글을 입력하세요...'}
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button
            type="button"
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleCommentSubmit}
          >{currentLanguage === 'Eng' ? 'regist' : '등록'}
          </button>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button type="button" onClick={() => navigate('/board')} className="bg-gray-500 text-white px-6 py-2 rounded-md mr-2">{currentLanguage === 'Eng' ? 'back' : '이전'}</button>
      </div>
    </div>
  );
};

export default Boarddetail;
