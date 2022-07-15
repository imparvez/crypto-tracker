import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CoinList } from '../Config/api'
import { CryptoState } from '../CryptoContext'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container } from '@mui/system'
import { LinearProgress, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Table, TableBody, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled'
import { numberWithCommas } from '../util';

const CoinListTableRow = styled(TableRow)`
    background-color: #16171a;
    cursor: pointer;
    font-family: Montserrat;
    &:hover {
        background-color: #131111;
    }
`

const CoinsTable = () => {
    const navigate = useNavigate();
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [ search, setSearch ] = useState('')
    const [page, setPage] = useState(1)

    const { currency, symbol } = CryptoState()

    const fetchCoins = async () => {
        setLoading(true)
        const { data } =  await axios(CoinList(currency))
        setCoins(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchCoins()
    }, [currency])

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const handleSearch = () => {
        return coins.filter((coin) => 
            coin.name.toLowerCase().includes(search) || 
            coin.symbol.toLowerCase().includes(search)
        ) 
    }

    const handlePaginationChange = (_, value) => {
        setPage(value)
        window.scroll(0, 450)
    }

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: 'center'}}>
            <Typography
                variant="h4"
                style={{
                    margin: 18,
                    fontFamily: 'Montserrat'
                }}
            >
                Cryptocurrency Prices by Market Cap
            </Typography>
            <TextField
                label='Search for Crypto Currency...'
                variant='outlined'
                style={{
                    marginBottom: 20,
                    width: '100%'
                }}
                onChange={(e) => setSearch(e.target.value)}
            />

            <TableContainer>
                {
                    loading ? (
                        <LinearProgress style={{ backgroundColor: 'gold' }} />
                    ) : (
                        <Table>
                            <TableHead style={{ backgroundColor: '#eebc1d'}}>
                                <TableRow>
                                    {['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (
                                        <TableCell
                                            key={head}
                                            style={{
                                                fontFamily: 'Montserrat',
                                                fontWeight: 700,
                                                color: 'black'
                                            }}
                                            align={head === 'Coin' ? 'left' : 'right'}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>    
                            </TableHead>

                            <TableBody>
                                {handleSearch()
                                    .slice((page-1) * 10, (page-1)*10+10)
                                    .map((row) => {
                                    const profit = row.price_change_percentage_24h > 0;

                                    return (
                                        <CoinListTableRow
                                            onClick={() => navigate(`/coins/${row.id}`)}
                                            key={row.name}
                                        >
                                            <TableCell component='th' scope='row' style={{ display: 'flex', gap: 15 }}>
                                                <img
                                                    src={row.image}
                                                    alt={row.name}
                                                    height='50px'
                                                    style={{ marginBottom: 10 }}
                                                />
                                                <div
                                                    style={{ display: 'flex', flexDirection: 'column' }}
                                                >
                                                    <span style={{ textTransform: 'uppercase', fontSize: 12 }}>{row.symbol}</span>
                                                    <span style={{ color: 'darkgrey' }}>{row.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell align='right'>
                                                {symbol} {' '}
                                                {numberWithCommas(row.current_price.toFixed(2))}
                                            </TableCell>
                                            <TableCell align='right' style={{ color: profit > 0 ? 'rgb(14, 203, 129)' : 'red', fontWeight: 500}}>
                                                {profit && '+'}
                                                {row.price_change_percentage_24h.toFixed(2)}% 
                                            </TableCell>

                                            <TableCell align='right'>
                                                {symbol} {' '}
                                                {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                                            </TableCell>
                                        </CoinListTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    )
                }
            </TableContainer>

            <Pagination
                style={{
                    padding: 20,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}
                count={(handleSearch().length / 10).toFixed(0)}
                onChange={handlePaginationChange}
            />
        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable