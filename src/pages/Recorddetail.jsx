import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Boarddetail = () => {
  const [post, setPost] = useState({});
  const [dhtmlContent, setDhtmlContent] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [scores, setScores] = useState({ scoreP1: 0, scoreP2: 0, scoreP3: 0, scoreP4: 0 });
  const [teamNames, setTeamNames] = useState({ team_p1_name: '', team_p2_name: '', team_p3_name: '', team_p4_name: '' });
  const [dhtmltype, setDhtmlType] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postResponse = await axios.get(`http://54.180.179.9:5002/record/posts/${id}`);
        setPost(postResponse.data);

        const imagePathResponse = await axios.get(`http://54.180.179.9:5002/record/posts/${id}/image`);
        // 기존 post state에 type_image_path 속성을 추가
        setPost((prevState) => ({
          ...prevState,
          type_image_path: imagePathResponse.data.type_image_path,
        }));
      } catch (error) {
        console.error('Error fetching the post:', error);
      }
    };

    const applyUserDataToDhtml = (originalDoc, userData) => {
      const doc = originalDoc.cloneNode(true);
      switch (doc.querySelector('.dhtml-content').id) {
        case 'dhtml1':
          if (userData && userData.personalDetails) {
            doc.querySelector('#school').defaultValue = userData.personalDetails.school || '';
            doc.querySelector('#grade').defaultValue = userData.personalDetails.grade || '';
            doc.querySelector('#group').defaultValue = userData.personalDetails.group || '';
            doc.querySelector('#studentID').defaultValue = userData.personalDetails.studentID || '';
            doc.querySelector('#name').defaultValue = userData.personalDetails.name || '';
            doc.querySelector('#team_p1_name').defaultValue = userData.personalDetails.team_p1_name || '';
            doc.querySelector('#team_p2_name').defaultValue = userData.personalDetails.team_p2_name || '';
            doc.querySelector('#team_p3_name').defaultValue = userData.personalDetails.team_p3_name || '';
            doc.querySelector('#team_p4_name').defaultValue = userData.personalDetails.team_p4_name || '';
            // ... 체크박스 처리 ...
            doc.querySelector('#team_p1_check_1').defaultValue = userData.personalDetails.team_p1_check_1 || '';
            doc.querySelector('#team_p2_check_1').defaultValue = userData.personalDetails.team_p2_check_1 || '';
            doc.querySelector('#team_p3_check_1').defaultValue = userData.personalDetails.team_p3_check_1 || '';
            doc.querySelector('#team_p4_check_1').defaultValue = userData.personalDetails.team_p4_check_1 || '';

            doc.querySelector('#team_p1_check_2').defaultValue = userData.personalDetails.team_p1_check_2 || '';
            doc.querySelector('#team_p2_check_2').defaultValue = userData.personalDetails.team_p2_check_2 || '';
            doc.querySelector('#team_p3_check_2').defaultValue = userData.personalDetails.team_p3_check_2 || '';
            doc.querySelector('#team_p4_check_2').defaultValue = userData.personalDetails.team_p4_check_2 || '';

            doc.querySelector('#team_p1_check_3').defaultValue = userData.personalDetails.team_p1_check_3 || '';
            doc.querySelector('#team_p2_check_3').defaultValue = userData.personalDetails.team_p2_check_3 || '';
            doc.querySelector('#team_p3_check_3').defaultValue = userData.personalDetails.team_p3_check_3 || '';
            doc.querySelector('#team_p4_check_3').defaultValue = userData.personalDetails.team_p4_check_3 || '';

            doc.querySelector('#team_p1_check_4').defaultValue = userData.personalDetails.team_p1_check_4 || '';
            doc.querySelector('#team_p2_check_4').defaultValue = userData.personalDetails.team_p2_check_4 || '';
            doc.querySelector('#team_p3_check_4').defaultValue = userData.personalDetails.team_p3_check_4 || '';
            doc.querySelector('#team_p4_check_4').defaultValue = userData.personalDetails.team_p4_check_4 || '';

            doc.querySelector('#team_p1_check_5').defaultValue = userData.personalDetails.team_p1_check_5 || '';
            doc.querySelector('#team_p2_check_5').defaultValue = userData.personalDetails.team_p2_check_5 || '';
            doc.querySelector('#team_p3_check_5').defaultValue = userData.personalDetails.team_p3_check_5 || '';
            doc.querySelector('#team_p4_check_5').defaultValue = userData.personalDetails.team_p4_check_5 || '';
          }
          break;
        case 'dhtml2':
          if (userData && userData.QnAResponses) {
            doc.querySelector('#date').defaultValue = userData.QnAResponses.date || '';
            doc.querySelector('#school').defaultValue = userData.QnAResponses.school || '';
            doc.querySelector('#grade').defaultValue = userData.QnAResponses.grade || '';
            doc.querySelector('#group').defaultValue = userData.QnAResponses.group || '';
            doc.querySelector('#studentID').defaultValue = userData.QnAResponses.studentID || '';
            doc.querySelector('#name').defaultValue = userData.QnAResponses.name || '';
            doc.querySelector('#question1').defaultValue = userData.QnAResponses.question1 || '';
            doc.querySelector('#question2').defaultValue = userData.QnAResponses.question2 || '';
            doc.querySelector('#question3').defaultValue = userData.QnAResponses.question3 || '';
            doc.querySelector('#question4').defaultValue = userData.QnAResponses.question4 || '';
            doc.querySelector('#question5').defaultValue = userData.QnAResponses.question5 || '';
          }
          break;
        case 'dhtml3':
          if (userData && userData.radioResponses) {
            doc.querySelector('#studentID').defaultValue = userData.radioResponses.studentID || '';
            doc.querySelector('#name').defaultValue = userData.radioResponses.name || '';
            for (let i = 1; i <= 10; i += 1) { // 각 질문에 대해서 반복합니다.
              const questionResponse = userData.radioResponses[`selectedRadiogroup${i}`];
              if (questionResponse !== undefined) {
                const radioButtonId = `#q${i}_${questionResponse}`; // `#q1_2`, ..., `#q10_2`
                const radioButton = doc.querySelector(radioButtonId);
                if (radioButton) {
                  radioButton.defaultChecked = true; // 해당 라디오 버튼을 선택합니다.
                }
              }
            }
          }
          break;
        default:
          break;
      }
      return doc;
    };

    const fetchDhtmlContent = async () => {
      try {
        const dhtmlResponse = await axios.get(`http://54.180.179.9:5002/record/posts/${id}/dhtml`);
        const parser = new DOMParser();
        let doc = parser.parseFromString(dhtmlResponse.data.dhtmlContent, 'text/html');

        const inputs = doc.querySelectorAll('input');
        inputs.forEach((input) => {
          input.setAttribute('disabled', 'disabled');
        });

        const textareas = doc.querySelectorAll('textarea');
        textareas.forEach((textarea) => {
          textarea.setAttribute('disabled', 'disabled');
        });

        doc = applyUserDataToDhtml(doc, dhtmlResponse.data.userData);

        setDhtmlContent(doc.body.innerHTML);

        const dhtmlType = doc.querySelector('.dhtml-content')?.id;
        setDhtmlType(dhtmlType);

        const { userData } = dhtmlResponse.data;
        if (userData) {
          if (userData.personalDetails) {
            setScores({
              scoreP1: userData.personalDetails.scorep1 || 0,
              scoreP2: userData.personalDetails.scorep2 || 0,
              scoreP3: userData.personalDetails.scorep3 || 0,
              scoreP4: userData.personalDetails.scorep4 || 0,
            });

            setTeamNames({
              team_p1_name: userData.personalDetails.team_p1_name || '',
              team_p2_name: userData.personalDetails.team_p2_name || '',
              team_p3_name: userData.personalDetails.team_p3_name || '',
              team_p4_name: userData.personalDetails.team_p4_name || '',
            });
          }

          if (userData.radioResponses) {
            setTotalScore(userData.radioResponses.totalscore || 0);
          }
        }
      } catch (error) {
        console.error('Error fetching the DHTML content:', error);
      }
    };

    fetchDhtmlContent();
    fetchPost();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">게시판 보기</h1>
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
        </div>
        {dhtmlContent && (
          <div className="mt-4" dangerouslySetInnerHTML={{ __html: dhtmlContent }} />
        )}
        {/* 총점 */}
        {dhtmltype === 'dhtml1' && (
          <div className="mt-2 mb-2">
            {/* 팀 이름과 점수 표시 */}
            <div className="text-center">
              {scores.scoreP1 > 0 && (<p className="pt-3 mt-2 mb-1">{teamNames.team_p1_name} 총점: {scores.scoreP1}</p>)}
              {scores.scoreP2 > 0 && (<p className="mt-1 mb-1">{teamNames.team_p2_name} 총점: {scores.scoreP2}</p>)}
              {scores.scoreP3 > 0 && (<p className="mt-1 mb-1">{teamNames.team_p3_name} 총점: {scores.scoreP3}</p>)}
              {scores.scoreP4 > 0 && (<p className="mt-1 mb-1">{teamNames.team_p4_name} 총점: {scores.scoreP4}</p>)}
            </div>
          </div>
        )}

        {dhtmltype === 'dhtml3' && (
          <div className="text-center mt-2 mb-2">
            {/* 총점 표시 */}
            <span>총점: {totalScore}</span>
          </div>
        )}
      </div>
      {/* 이전으로 돌아가기 버튼 */}
      <div className="mt-4 flex justify-end">
        <button type="button" onClick={() => navigate('/record')} className="bg-gray-500 text-white px-6 py-2 rounded-md mr-2">이전</button>
      </div>
    </div>
  );
};

export default Boarddetail;
