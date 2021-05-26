import React from 'react';
import PropTypes from 'prop-types';

export default function Actions(props) {
    return(
        <section className="row controls actions">
            <div className="col-sm-12">
            <button className="btn btn-success" onClick={() => props.attack()}>
                ATTACK
            </button>
            <button className="btn btn-warning" onClick={() => props.specialAttack()}>
                BLAST
            </button>
            <button className="btn btn-light" onClick={() => props.heal()}>
                HEAL
            </button>
            <button className="btn btn-danger" 
                onClick={(e) => { if (window.confirm('Are you sure you wish to GIVE UP this game?')) props.giveUp(false) } }>
                GIVE UP
            </button>
            </div>
        </section>
    );
}

Actions.propTypes = {
    giveUp: PropTypes.func.isRequired,
    specialAttack: PropTypes.func.isRequired,
    attack: PropTypes.func.isRequired,
    heal: PropTypes.func.isRequired
};