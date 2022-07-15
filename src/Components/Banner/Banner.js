import React from 'react'
import styled from '@emotion/styled'
import { Container } from '@mui/system'
import { Typography } from '@mui/material'
import Carousel from './Carousel'

const BannerContainer = styled.div`
    background-image: url('https://raw.githubusercontent.com/piyush-eon/react-crypto-tracker/master/public/banner2.jpg');
`

const BannerWrapper = styled(Container)`
    height: 400px;
    display: flex;
    flex-direction: column;
    padding-top: 25px;
    justify-content: space-between;
`

const TagLine = styled.div`
    display: flex;
    height: 40%;
    flex-direction: column;
    padding-top: 25px;
    justify-content: space-around;
`

const Banner = () => {
  return (
    <BannerContainer>
        <BannerWrapper>
            <TagLine>
                <Typography
                    variant='h2'
                    style={{
                        fontWeight: 'bold',
                        marginBottom: 15,
                        fontFamily: 'Montserrat'
                    }}
                >
                    Crypto Hunter
                </Typography>
                <Typography
                    variant='subtitle2'
                    style={{
                        color: 'darkgray',
                        textTransform: 'capitalize',
                        fontFamily: 'Montserrat'
                    }}
                >
                    Get all the info regarding your favourite Crypto Currency
                </Typography>
            </TagLine>
            <Carousel />
        </BannerWrapper>
    </BannerContainer>
  )
}

export default Banner