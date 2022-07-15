import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled'
import Header from './Components/Header'
import Homepage from './Pages/Homepage'
import CoinPage from './Pages/CoinPage'

const AppContainer = styled.div`
  background-color: #14161a;
  color: #fff;
  min-height: 100vh;
`

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Header />
        <Routes>
          <Route path='/' element={<Homepage />} exact />
          <Route path='/coins/:id' element={<CoinPage />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
