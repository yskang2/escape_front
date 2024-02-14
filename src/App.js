import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Ecommerce, Orders, Calendar, Employees, Stacked,
  Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial,
  ColorPicker, ColorMapping, Editor, Nriframe, VRContent, Board, Boarddetail,
  BoardCreate, Record, Recorddetail, CeBoard, RecordCreate, CeBoarddetail,
  CeBoardCreate, Cnpractice, Cnpracticedetail, CnpracticeCreate, Anpractice,
  Anpracticedetail, AnpracticeCreate } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, user, setLanguage } = useStateContext();

  const useradmin = user?.admin;
  const usergroup = user?.grouplevel; // 사용자 그룹 컨트롤

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    const currentThemeLanguage = localStorage.getItem('languageMode');
    if (currentThemeColor && currentThemeMode && currentThemeLanguage) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
      setLanguage(currentThemeLanguage);
    }
  }, [setCurrentColor, setCurrentMode, setLanguage]);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}

              <Routes>
                {/* dashboard  */}
                <Route path="/" element={(<Ecommerce />)} />
                <Route path="/dashboard" element={(<Ecommerce />)} />
                <Route path="/emr" element={(<Nriframe />)} />
                <Route path="/VRcontents" element={(<VRContent />)} />

                {/* 자유 게시판  */}
                <Route path="/board" element={<Board />} />
                <Route path="/board/post/:id" element={<Boarddetail />} />
                <Route path="/board/create" element={<BoardCreate />} />

                {/* 임상전문가 소통 게시판  */}
                <Route path="/ceboard" element={<CeBoard />} />
                <Route path="/ceboard/post/:id" element={<CeBoarddetail />} />
                <Route path="/ceboard/create" element={<CeBoardCreate />} />

                {/* group1 실습 게시판 */}
                {(usergroup === '1' || useradmin === 'Y') && (
                <>
                  <Route path="/cnpractice" element={<Cnpractice />} />
                  <Route path="/cnpractice/post/:id" element={<Cnpracticedetail />} />
                  <Route path="/cnpractice/create" element={<CnpracticeCreate />} />
                </>
                )}

                {/* group2 실습 게시판 */}
                {(usergroup === '2' || useradmin === 'Y') && (
                <>
                  <Route path="/anpractice" element={<Anpractice />} />
                  <Route path="/anpractice/post/:id" element={<Anpracticedetail />} />
                  <Route path="/anpractice/create" element={<AnpracticeCreate />} />
                </>
                )}

                {/* 기록지 */}
                <Route path="/record" element={<Record />} />
                <Route path="/record/post/:id" element={<Recorddetail />} />
                <Route path="/record/create" element={<RecordCreate />} />

                {/* 기타 */}
                <Route path="/employees" element={<Employees />} />
                <Route path="/useroption" element={<Customers />} />

                {/* apps  */}
                <Route path="/record" element={<Orders />} />
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/color-picker" element={<ColorPicker />} />

                {/* charts  */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/userinfo" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/option" element={<Stacked />} />

              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
