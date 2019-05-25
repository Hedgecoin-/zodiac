import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 10px 0;
  align-items: center;
  border-top: 1px solid #eee;
`
const Rank = styled.div`
  color: #777;
  width: 60px;
  text-align: center;
`

const Score = styled.div`
  font-size: 24px;
  color: #777;
  width: 60px;
  text-align: center;
`
const Details = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`
const Name = styled.div`
  color: #555;
`
const Level = styled.div`
  color: #999
`

function PlayerRankItem({ rank, player: { playerName, score, level } }) {
  return (
    <Container>
      <Rank>{`${rank}.` || 'N/A'}</Rank>
      <Details>
        <Name>
          {playerName}

        </Name>
        <Level>
          {`Level ${level}`}
        </Level>
      </Details>
      <Score>{score}</Score>
    </Container>
  )
}

export default PlayerRankItem;