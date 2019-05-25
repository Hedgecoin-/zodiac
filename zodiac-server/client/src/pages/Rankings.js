import React, { Component } from 'react';
import styled from 'styled-components';

import { withUserContext } from '../context/UserContext';
import PlayerRankItem from '../components/PlayerRankItem';

const PlayerList = styled.div`
  display: flex;
  flex-direction: column;
`


class Rankings extends Component {
  state = {
    players: [],
  }

  componentDidMount() {
    this.props.getRankings()
      .then(data => {
        console.log("Rankings: ", data);
        data.sort((a, b) => {
          if (a.score == b.score) {
            return b.experience - a.experience;
          }
          return b.score - a.score;
        })
        this.setState({ players: data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { players } = this.state;

    if (players.length === 0) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <h1>Rankings</h1>
        <PlayerList>
          {
            players.map((player, i) => {
              return <PlayerRankItem key={i} rank={i + 1} player={player} />
            })
          }
        </PlayerList>

      </div>
    );
  }
}

export default withUserContext(Rankings);