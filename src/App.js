import './App.css';
import { useEffect, useState } from 'react';
import { useTelegram } from './hooks/useTelegram';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';
import Form from './components/Form/Form';

function App() {

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
      <button onClick={() => setShowUserInfo(true)}>Показать информацию о пользователе</button>
      <button
        onClick={() => {
          tg.openTelegramLink("https://t.me/sohumelivar");
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
