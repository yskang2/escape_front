import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useStateContext } from './contexts/ContextProvider';

import kakaoLogo from './images/kakao.png'; // 로고 이미지 임포트
import naverLogo from './images/naver.png';
import googleLogo from './images/google.png';

const Login = ({ onLogin }) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const { setUser } = useStateContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post('/login/add-user'); // 서버 엔드포인트를 가정합니다.
      const response = await axios.post('/login/login', { id, pw }); // 서버 엔드포인트를 가정합니다.
      if (response.data.success) {
        setUser(response.data.user);
        onLogin();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('로그인 오류', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <form onSubmit={handleLogin}> {/* 폼에 onSubmit 이벤트 핸들러를 추가합니다. */}
          <label htmlFor="userId">
            아이디
            <input
              id="userId"
              type="text"
              placeholder="아이디를 입력하세요."
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </label>
          <label htmlFor="userPw">
            비밀번호
            <input
              id="userPw"
              type="password"
              placeholder="비밀번호를 입력하세요."
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </label>
          <button type="submit" className="login-btn">로그인</button>
        </form>
        <div className="checkbox-container">
          <input type="checkbox" id="auto-login" /> 자동로그인

        </div>
        <div className="extra-links">
          <a href="#sign-up">회원가입</a> | <a href="#find-id-pw">아이디/비밀번호 찾기</a>
        </div>
        <div className="social-login">
          <button type="button" className="kakao-btn" style={{ backgroundImage: `url(${kakaoLogo})` }}> </button>
          <button type="button" className="naver-btn" style={{ backgroundImage: `url(${naverLogo})` }}> </button>
          <button type="button" className="google-btn" style={{ backgroundImage: `url(${googleLogo})` }}> </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
