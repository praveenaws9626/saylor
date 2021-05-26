import React from 'react';

export default function Games(props) {
    const listItems = props.games.map((game, index) =>
        <li key={index} className={'list-group-item ' + (game.winner.toLowerCase() === 'player' ? 'player-turn' : 'dragon-turn')}>
            {game.description ? game.description : game.winner.toLowerCase() === 'player' ? "You won the game" : "You lose the game"}
        </li>
    );
    return(
        <section className="row log">
            <div className="col-12-sm commentary-box">
            <ul className="list-group ">
                {listItems}
            </ul>
            </div>
        </section>
    );
}