import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

const RecordCreate = () => {
  const navigate = useNavigate();
  const { user, currentLanguage } = useStateContext();
  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState(true);
  const [recordTypes, setRecordTypes] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState(null); // 추가
  const [currentDate] = useState(new Date());
  const [dhtmlContent, setDhtmlContent] = useState(''); // DHTML 내용을 저장할 state
  const [responses, setResponses] = useState({}); // 응답 항목을 저장할 state
  const [totalScore, setTotalScore] = useState(0);
  const [scoreP1, setScoreP1] = useState(0);
  const [scoreP2, setScoreP2] = useState(0);
  const [scoreP3, setScoreP3] = useState(0);
  const [scoreP4, setScoreP4] = useState(0);
  const [teamP1Name, setTeamP1Name] = useState('');
  const [teamP2Name, setTeamP2Name] = useState('');
  const [teamP3Name, setTeamP3Name] = useState('');
  const [teamP4Name, setTeamP4Name] = useState('');

  const handleTypeSelect = async (imagePath, typeId) => {
    setSelectedTypeId(typeId); // 추가
    setShowModal(false);

    // 선택한 typeId로 DHTML 내용 가져오기
    try {
      const response = await axios.get(`/record/record-type-dhtml/${typeId}`);
      setDhtmlContent(response.data.dhtml);
    } catch (error) {
      console.error('Error fetching DHTML:', error);
    }
  };

  const handleResponseChange = (e) => {
    const { name, value } = e.target;
    setResponses((prev) => ({ ...prev, [name]: value }));
    if (selectedTypeId === 2) {
      let score = 0;
      const radioInputs = document.querySelectorAll('input[name^="group"]:checked');
      radioInputs.forEach((input) => {
        score += parseInt(input.value, 10);
      });
      setTotalScore(score);
    }
    if (selectedTypeId === 1) {
      let newScoreP1 = 0;
      let newScoreP2 = 0;
      let newScoreP3 = 0;
      let newScoreP4 = 0;
      for (let i = 1; i <= 5; i += 1) {
        newScoreP1 += parseInt(document.getElementById(`team_p1_check_${i}`).value || 0, 10);
        newScoreP2 += parseInt(document.getElementById(`team_p2_check_${i}`).value || 0, 10);
        newScoreP3 += parseInt(document.getElementById(`team_p3_check_${i}`).value || 0, 10);
        newScoreP4 += parseInt(document.getElementById(`team_p4_check_${i}`).value || 0, 10);
      }

      setScoreP1(newScoreP1);
      setScoreP2(newScoreP2);
      setScoreP3(newScoreP3);
      setScoreP4(newScoreP4);
    }
  };

  const handleTeamNameChange = (e) => {
    switch (e.target.id) {
      case 'team_p1_name':
        setTeamP1Name(e.target.value);
        break;
      case 'team_p2_name':
        setTeamP2Name(e.target.value);
        break;
      case 'team_p3_name':
        setTeamP3Name(e.target.value);
        break;
      case 'team_p4_name':
        setTeamP4Name(e.target.value);
        break;
      default:
        // 기타 처리
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dhtmlData = {}; // DHTML 데이터를 저장할 객체

    // selectedTypeId 값에 따라서 DHTML 항목 값 저장
    if (selectedTypeId === 1) {
      dhtmlData.personalDetails = {
        school: document.getElementById('school').value,
        grade: document.getElementById('grade').value,
        group: document.getElementById('group').value,
        studentID: document.getElementById('studentID').value,
        name: document.getElementById('name').value,
        team_p1_name: document.getElementById('team_p1_name').value,
        team_p2_name: document.getElementById('team_p2_name').value,
        team_p3_name: document.getElementById('team_p3_name').value,
        team_p4_name: document.getElementById('team_p4_name').value,
        team_p1_check_1: document.getElementById('team_p1_check_1').value,
        team_p2_check_1: document.getElementById('team_p2_check_1').value,
        team_p3_check_1: document.getElementById('team_p3_check_1').value,
        team_p4_check_1: document.getElementById('team_p4_check_1').value,
        team_p1_check_2: document.getElementById('team_p1_check_2').value,
        team_p2_check_2: document.getElementById('team_p2_check_2').value,
        team_p3_check_2: document.getElementById('team_p3_check_2').value,
        team_p4_check_2: document.getElementById('team_p4_check_2').value,
        team_p1_check_3: document.getElementById('team_p1_check_3').value,
        team_p2_check_3: document.getElementById('team_p2_check_3').value,
        team_p3_check_3: document.getElementById('team_p3_check_3').value,
        team_p4_check_3: document.getElementById('team_p4_check_3').value,
        team_p1_check_4: document.getElementById('team_p1_check_4').value,
        team_p2_check_4: document.getElementById('team_p2_check_4').value,
        team_p3_check_4: document.getElementById('team_p3_check_4').value,
        team_p4_check_4: document.getElementById('team_p4_check_4').value,
        team_p1_check_5: document.getElementById('team_p1_check_5').value,
        team_p2_check_5: document.getElementById('team_p2_check_5').value,
        team_p3_check_5: document.getElementById('team_p3_check_5').value,
        team_p4_check_5: document.getElementById('team_p4_check_5').value,
        scorep1: scoreP1,
        scorep2: scoreP2,
        scorep3: scoreP3,
        scorep4: scoreP4,
      };
    } else if (selectedTypeId === 3) {
      dhtmlData.QnAResponses = {
        date: document.getElementById('date').value,
        school: document.getElementById('school').value,
        grade: document.getElementById('grade').value,
        group: document.getElementById('group').value,
        studentID: document.getElementById('studentID').value,
        name: document.getElementById('name').value,
        question1: document.getElementById('question1').value,
        question2: document.getElementById('question2').value,
        question3: document.getElementById('question3').value,
        question4: document.getElementById('question4').value,
        question5: document.getElementById('question5').value,
      };
    } else if (selectedTypeId === 2) {
      dhtmlData.radioResponses = {
        studentID: document.getElementById('studentID').value,
        name: document.getElementById('name').value,
        selectedRadiogroup1: document.querySelector('input[name="group1"]:checked').value,
        selectedRadiogroup2: document.querySelector('input[name="group2"]:checked').value,
        selectedRadiogroup3: document.querySelector('input[name="group3"]:checked').value,
        selectedRadiogroup4: document.querySelector('input[name="group4"]:checked').value,
        selectedRadiogroup5: document.querySelector('input[name="group5"]:checked').value,
        selectedRadiogroup6: document.querySelector('input[name="group6"]:checked').value,
        selectedRadiogroup7: document.querySelector('input[name="group7"]:checked').value,
        selectedRadiogroup8: document.querySelector('input[name="group8"]:checked').value,
        selectedRadiogroup9: document.querySelector('input[name="group9"]:checked').value,
        selectedRadiogroup10: document.querySelector('input[name="group10"]:checked').value,
        totalscore: totalScore,
      };
    }

    const newPost = {
      title,
      recordType: selectedTypeId, // 추가
      dhtmlContent: dhtmlData,
      author: user?.name,
    };

    try {
      await axios.post('/record/posts', newPost);
      navigate('/record');
    } catch (error) {
      console.error('Error creating the post:', error);
    }
  };

  useEffect(() => {
    const fetchRecordTypes = async () => {
      try {
        const response = await axios.get('/record/record-types');
        setRecordTypes(response.data);
      } catch (error) {
        console.error('Error fetching record types:', error);
      }
    };

    fetchRecordTypes();

    if (selectedTypeId === 2) {
      const radioInputs = document.querySelectorAll('input[name^="group"]');

      radioInputs.forEach((input) => {
        input.addEventListener('change', handleResponseChange);
      });

      return () => {
        radioInputs.forEach((input) => {
          input.removeEventListener('change', handleResponseChange);
        });
      };
    }

    if (selectedTypeId === 1) {
      const teamInputs = document.querySelectorAll('input[id^="team_p"]');
      teamInputs.forEach((input) => {
        input.addEventListener('change', handleResponseChange);
      });

      const teamNameInputs = ['team_p1_name', 'team_p2_name', 'team_p3_name', 'team_p4_name'];

      teamNameInputs.forEach((inputId) => {
        const inputElement = document.getElementById(inputId);
        if (inputElement) {
          inputElement.addEventListener('change', handleTeamNameChange);
        }
      });

      return () => {
        teamInputs.forEach((input) => {
          input.removeEventListener('change', handleResponseChange);
        });
        teamNameInputs.forEach((inputId) => {
          const inputElement = document.getElementById(inputId);
          if (inputElement) {
            inputElement.removeEventListener('change', handleTeamNameChange);
          }
        });
      };
    }
    return () => {};
  }, [dhtmlContent, selectedTypeId]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {responses === ''}
      {showModal && (
        <div className="inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-md">
            {/* 타이틀과 X 버튼을 감싸는 div를 추가 */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{currentLanguage === 'Eng' ? 'Choose a format' : '서식을 선택하세요'}</h2>
              <button
                type="button"
                onClick={() => navigate('/record')}
              >
                X
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 overflow-y-auto text-center">
              {recordTypes.map((type) => (
                <div key={type.type_id} onClick={() => handleTypeSelect(type.type_image_path, type.type_id)} className="flex flex-col items-center border rounded border-gray-300">
                  <div className="relative w-60 h-60 overflow-hidden rounded"> {/* 고정된 너비와 높이 및 반올림된 모서리 스타일을 추가 */}
                    <img src={type.type_thumnail_image_path} alt={type.type_name} className="absolute top-0 left-0 w-full h-full object-cover" />
                  </div>
                  <p>{type.type_name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {!showModal && (
      <>
        <h1 className="text-3xl font-bold mb-6">{currentLanguage === 'Eng' ? 'Record Sheet writing' : '기록지 글쓰기'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={currentLanguage === 'Eng' ? 'Title' : '제목'}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          {/* 작성자 아이콘, 작성자명, 작성일 부분 */}
          <div className="flex items-center mb-4">
            {/* 아이콘을 추가하려면 여기에 <img> 태그나 <div>를 사용하여 아이콘을 표시하세요 */}
            {/* <img src="path_to_icon" alt="Author Icon" /> */}
            <span className="mr-2">{user.name}</span>
            <span>{`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`}</span>
          </div>
          {/* 선택한 이미지를 표시 */}
          <div className="mb-4">
            {/* <img src={selectedImage} alt="Selected Record Type" className="mx-auto" /> */}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: dhtmlContent }}
            onChange={handleResponseChange}
          />
          {(selectedTypeId === 2) && <div className="text-center mt-2 mb-2">총점: <span id="totalscore">{totalScore}</span></div>}
          {selectedTypeId === 1 && (
            <div className="mt-2 mb-2">
              <div className="text-center">
                {scoreP1 > 0 && (<p className="pt-3 mt-2 mb-1">{teamP1Name} 총점: {scoreP1}</p>)}
                {scoreP2 > 0 && (<p className="mt-1 mb-1">{teamP2Name} 총점: {scoreP2}</p>)}
                {scoreP3 > 0 && (<p className="mt-1 mb-1">{teamP3Name} 총점: {scoreP3}</p>)}
                {scoreP3 > 0 && (<p className="mt-1 mb-1">{teamP4Name} 총점: {scoreP4}</p>)}
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/record')}
              className="bg-gray-500 text-white px-6 py-2 rounded-md mr-2"
            >{currentLanguage === 'Eng' ? 'cancel' : '취소'}
            </button>
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md">{currentLanguage === 'Eng' ? 'regist' : '등록'}</button>
          </div>
        </form>
      </>
      )}
    </div>
  );
};

export default RecordCreate;
