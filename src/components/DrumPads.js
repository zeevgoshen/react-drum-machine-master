import React from 'react'
import styled from 'styled-components'
import Flex from 'styled-flex-component'

const PadWrapper = styled.div`
  border: 1px solid ${props => props.theme.color.drumSection};
  border-radius: 5px;
  margin: 10px;
  width: 100px;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`

const PadLabel = styled.p`
background-color: ${props => props.theme.color.drumSection};
text-align: center;
color: ${props => props.theme.color.black};
margin: 0;
width: 100%;

`

const PadButton = styled.button`
  width: 50px;
  height: 30px;
  background-color: ${props => props.current ? props.theme.color.selectedDrum : props.theme.color.button};
  border: 1px solid ${props => props.current ? props.theme.color.selectedDrum : props.theme.color.button};
  border-radius: 3px;
  margin: 15px auto;
`
  

const DrumPads = ({ drums, onPadClick, currentDrum }) => {

  return <Flex>
    {drums.map((drum, i) => {
        const onClick = () => onPadClick(i)

        return (
          <PadWrapper key={drum.label}>
            <PadLabel>{drum.label}</PadLabel>
            <PadButton onClick={onClick} current={currentDrum === i}/>
          </PadWrapper>
        )
      }
    )}
  </Flex>
}

export default DrumPads