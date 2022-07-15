import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { HistoricalChart } from '../Config/api'
import { CryptoState } from '../CryptoContext'
import styled from '@emotion/styled'
import { CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import { chartDays } from '../Config/data';
import SelectButton from './SelectButton';

const Container = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
    align-items: center
    justify-content: center;
    margin-top: 25px;
    padding: 40px;

    @media screen and (max-width: 767px) {
        width: 100%;
        margin-top: 0;
        padding: 20px;
        padding-top: 0;
    }
`

const CoinInfo = ({ coin }) => {
    const [historialData, setHistoricalData] = useState()
    const [days, setDays] = useState(1)
    const [flag, setflag] = useState(false);

    const { currency } = CryptoState()

    const fetchHistoricalData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
        setflag(true);
        setHistoricalData(data.prices)
    }

    useEffect(() => {
        console.log('days')
        fetchHistoricalData()
    }, [days])

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const labels = historialData && historialData.map((coin) => {
        let date = new Date(coin[0]);
        let time =
            date.getHours() > 12
            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
            : `${date.getHours()}:${date.getMinutes()} AM`;
        return days === 1 ? time : date.toLocaleDateString();
    })

    const data = historialData && historialData.map((coin) => coin[1])

  return (
    <ThemeProvider theme={darkTheme}>
        <Container>
            {/* Charts */}
            {
                !historialData || flag===false ? (
                    <CircularProgress 
                        size={250}
                        style={{ color: 'gold' }}
                        thickness={1}
                    />
                ) : (
                    <div>
                        <Line
                            data={{
                                labels: labels,

                                datasets: [
                                    {
                                        data: data,
                                        label: `Price ( Past ${days} Days ) in ${currency}`,
                                        borderColor: "#EEBC1D",
                                    },
                                ],
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 1,
                                    },
                                },
                            }}
                        />

                        <div
                            style={{
                                display: 'flex',
                                marginTop: 20,
                                justifyContent: 'space-around',
                                width: '100%'
                            }}
                        >
                            {chartDays.map((day) => (
                                <SelectButton
                                    key={day.value}
                                    onClick={() => setDays(day.value)}
                                    selected={days === day.value}
                                >
                                    {day.label}
                                </SelectButton>
                            ))}
                        </div>
                    </div>
                )
            }
            {/* Buttons */}
        </Container>    
    </ThemeProvider>
  )
}

export default CoinInfo