import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import axios from 'axios'
import AliceCarousel from 'react-alice-carousel';
import { TrendingCoins } from '../../Config/api'
import { CryptoState } from '../../CryptoContext'
import { Link } from 'react-router-dom';
import { numberWithCommas } from '../../util';

const CarouselContainer = styled.div`
    height: 50%;
    display: flex;
    align-items: center;
`

const CarouselItem = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    text-transform: uppercase;
    color: white;
`

const Carousel = () => {
    const [trending, setTrending] = useState([])
    const { currency, symbol } = CryptoState()
    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency))
        setTrending(data)
    }

    useEffect(() => {
        fetchTrendingCoins()
    }, [currency])

    const responsive = {
        0: {
            items: 2
        },
        512: {
            items: 4
        }
    }

    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;
        return (
            <CarouselItem
                to={`/coins/${coin.id}`}
            >
                <img
                    src={coin.image}
                    alt={coin.name}
                    height='80px'
                    style={{ marginBottom: 10 }}
                    loading='lazy'
                />
                <span>
                    {coin.symbol}
                    &nbsp;
                    <span
                        style={{
                            color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                            fontWeight: 500
                        }}
                    >
                        {profit && '+'} {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                </span>

                <span style={{ fontSize: 22, fontWeight: 500}}>
                    {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
                </span>
            </CarouselItem>
        )
    })

  return (
    <CarouselContainer>
        <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            autoPlay
            items={items}
        />
    </CarouselContainer>
  )
}

export default Carousel