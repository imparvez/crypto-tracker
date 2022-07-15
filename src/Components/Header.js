import { AppBar, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import { Container } from '@mui/system'
import styled from '@emotion/styled'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CryptoState } from '../CryptoContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Title = styled.div`
    flex: 1;
    color: gold;
    font-family: Montserrat;
    font-weight: bold;
    cursor: pointer;
`

const Header = () => {
    const navigate = useNavigate();
    const { currency, setCurrency } = CryptoState()
    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar onClick={() =>navigate('/') } className='toolbar'>
                        <Typography variant='h6'>
                            <Title>Crypto Tracker</Title>
                        </Typography>

                        <Select
                            className='select-currency'
                            variant='outlined' 
                            style={{
                                width: 100,
                                height: 40,
                                marginRight: 15
                            }}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={'USD'}>USD</MenuItem>
                            <MenuItem value={'INR'}>INR</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header