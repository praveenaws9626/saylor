import React from 'react';

export default function Gamelogs({turns}) {
    let listItems = <li>No Comments yet</li>
    if(turns && turns.length > 0) {
        listItems = turns.map((turn, index) =>
            <li key={index} className={'list-group-item ' + (turn.isPlayer ? 'player-turn' : 'dragon-turn')}>
                {turn.text}
            </li>
        );
    }
    return(
        <section className="row log">
            <div className="col-sm-12 commentary-box">
            <ul className="list-group">
                {listItems}
            </ul>
            </div>
        </section>
    );
}
