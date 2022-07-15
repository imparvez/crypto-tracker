import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../Config/api'
import { CryptoState } from '../CryptoContext'
import styled from '@emotion/styled'
import CoinInfo from '../Components/CoinInfo'
import { LinearProgress, Typography } from '@mui/material'
import { numberWithCommas } from '../util'

const Container = styled.div`
  display: flex;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`

const Sidebar = styled.div`
  width: 30%;

  @media screen and (max-width: 767px) {
    width: 100%;
  }

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 25px;
  border-right: 2px solid grey;
`

const CoinName = styled(Typography)`
  font-weight: bold;
  margin-bottom: 20px;
  font-family: 'Montserrat'
`

const CoinDescription = styled(Typography)`
  width: 100%;
  font-family: 'Montserrat';
  padding: 25px;
  padding-bottom: 15px;
  padding-top: 0;
  text-align: justify;
`

const MarketData = styled.div`
  align-self: start;
  padding: 25px;
  padding-top: 10px;
  width: 100%;

  @media screen and (max-width: 767px) {
    display: flex;
    justify-content: space-around;
  }
`

const Heading = styled(Typography)``

const CoinPage = () => {
  const { id } = useParams()
  const [coin, setCoin] = useState('')

  const { currency, symbol } = CryptoState()

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id))
    setCoin(data)
  }

  useEffect(() => {
    fetchCoin()
  }, [])

  if(!coin) return (
    <LinearProgress style={{ backgroundColor: 'gold' }} />
  )

  return (
    <Container>
      <Sidebar>
        <img
          src={coin.image && coin.image.large}
          alt={coin.name}
          height='200'
          style={{ marginBottom: 20 }}
        />

        <CoinName variant='h3'>
          {coin.name}
        </CoinName>

        <CoinDescription variant='h6' dangerouslySetInnerHTML={{ __html : coin.description && coin.description.en.split(". ")[0]}} />

        <MarketData>
          {/** Rank */}
          <span style={{ display: 'flex'}}>
            <Heading variant='h5'>
              Rank:  
            </Heading>
            &nbsp; &nbsp; 
            <Typography variant='h5' style={{ fontFamily: 'Montserrat' }}>
              {coin.market_cap_rank}  
            </Typography> 
          </span>

          {/** Current Prices */}
          <span style={{ display: 'flex'}}>
            <Heading variant='h5'>
              Current Price:  
            </Heading>
            &nbsp; &nbsp; 
            <Typography variant='h5' style={{ fontFamily: 'Montserrat' }}>
              {symbol} {' '}
              {coin.market_data && numberWithCommas(coin.market_data.current_price[currency.toLowerCase()])}
            </Typography> 
          </span>
          
          {/** Market Cap */}
          <span style={{ display: 'flex'}}>
            <Heading variant='h5'>
              Market Cap: {' '}  
            </Heading>
            &nbsp; &nbsp; 
            <Typography variant='h5' style={{ fontFamily: 'Montserrat' }}>
              {symbol} {' '}
              {coin.market_data && numberWithCommas(coin.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M
            </Typography> 
          </span>
        </MarketData>
      </Sidebar>
      <CoinInfo coin={coin} />
    </Container>
  )
}

export default CoinPage