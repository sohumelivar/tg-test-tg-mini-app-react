import './App.css';
import { useEffect, useState } from 'react';
import { useTelegram } from './hooks/useTelegram';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';
import Form from './components/Form/Form';

function App() {

  const createICSFile = () => {
    const event = `
    BEGIN:VCALENDAR
    VERSION:2.0
    BEGIN:VEVENT
    SUMMARY:Встреча с командой
    DTSTART:20250505T120000Z
    DTEND:20250505T130000Z
    DESCRIPTION:Обсуждение проекта Market
    LOCATION:Zoom
    END:VEVENT
    END:VCALENDAR`;

    const blob = new Blob([event.trim()], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'event.ics';
    link.click();
    URL.revokeObjectURL(url); // освобождаем память
  };







  const { tg } = useTelegram();
  const [userData, setUserData] = useState(null);
  const [showUserInfo, setShowUserInfo] = useState(false);

  useEffect(() => {
    tg.ready();
    const user = tg.initDataUnsafe?.user;
    if (user) {
      setUserData(user);
    }
  }, [tg]);

  return (
    <div className="App">
      <Header />
      <div style={{ padding: '2rem' }}>
      <h1>Создать событие в календаре</h1>
      <button onClick={createICSFile}>Добавить в календарь</button>
      </div>
      <button onClick={() => setShowUserInfo(true)}>Показать информацию о пользователе</button>
      <button
        onClick={() => {
          window.location.href = "tg://user?id=797017508";
        }}
      >
        Связаться
      </button>




      {showUserInfo && userData && (
        <div style={{
          marginTop: '20px',
          padding: '16px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#000000',
        }}>
          <h3>Информация о пользователе:</h3>
          <p><strong>Имя:</strong> {userData.first_name} {userData.last_name}</p>
          <p><strong>Username:</strong> @{userData.username}</p>
          <p><strong>ID:</strong> {userData.id}</p>
          <p><strong>Язык:</strong> {userData.language_code}</p>
          <button onClick={() => setShowUserInfo(false)}>Закрыть</button>
        </div>
      )}

      <Routes>
        <Route index element={<ProductList />} />
        <Route path={'form'} element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
