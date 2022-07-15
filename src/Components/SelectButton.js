import React from 'react'
import styled from '@emotion/styled'

const SelectedButton = styled.div`
    border: 1px solid gold;
    border-radius: 5px;
    padding: 10px 20px;
    font-family: Montserrat;
    cursor: pointer;
    background-color: ${(props) => props.selected ? 'gold' : ''};
    color: ${(props) => props.selected ? 'black' : ''};
    width: 22%;

    &:hover {
        background-color: black;
        color: gold;
    }
`

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <SelectedButton selected={selected} onClick={onClick}>{children}</SelectedButton>
  )
}

export default SelectButton