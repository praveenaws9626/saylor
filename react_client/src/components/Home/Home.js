import React, {useState, useEffect} from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import './Home.css';
import Actions from './Actions';
import Gamelogs from './Gamelogs';
import Games from './Games';
import Header from '../Header/Header';
import { useHistory } from 'react-router-dom';

// custom hooks
import { useGetGames, usePostGame } from '../../hooks';

import { useSelector } from 'react-redux'

import { authHeader } from '../../helpers/authHeader'
import { formatResponse } from '../../helpers/formatResponse'
import { setGameData, setUserData } from '../../store/actions';

async function saveGameResult(payload) {
    try {
      return fetch('http://localhost:8081/api/game-result', {
     method: 'POST',
     headers: authHeader(),
     body: JSON.stringify(payload)
   })
     .then(data => formatResponse(null, data.json()))
    } catch(e) {
        formatResponse(e,null);
    }
  }

export default function Home() {
    const history = useHistory();
    let username = useSelector(state => state.userInfo.name);
    if(!username && !localStorage.getItem('token')) {
        history.push('/login');
    }
    if(!username && localStorage.getItem('token')) {
        username = JSON.parse(localStorage.getItem('token'))?.name
    }
    const defaultPlayerHealth = 100;
    const defaultMonsterHealth = 100;
    const defaultTimer = 60;
    const [timer, setTimer] = useState(10);
    const [gameIsRunning, setGameIsRunning] = useState(false);
    const [turnLogs, setGameLogs] = useState([]);
    const [playerHealth, setPlayerHealth] = useState(100);
    const [monsterHealth, setMonsterHealth] = useState(100);
    const [showModel, setShowModel] = useState(false);
    const [modelText, setModelText] = useState("");
    const [winner, setWinner] = useState();

    useGetGames(gameIsRunning);
    const games = useSelector(state => state.gamesInfo);
    useEffect(() => {
        if(gameIsRunning) {
            if(timer > 0) {
                setTimeout(() => setTimer(sec => sec - 1), 1000)
            } else {
                setModelText('Time out!! You Lost! New Game?');
                setWinner('Dragon');
                setShowModel(true);
            }
        } else {
            defaultValues();
        }
    }, [gameIsRunning, timer]);

    // Log Player Actions
    function logPlayerActions(Damage) {
        let turn = [{
            isPlayer: true,
            text: `${username} hits Draggon for ${Damage}`
        }];
        setGameLogs(turnLogs => [...turn, ...turnLogs]);
    };

    // Log Dragon Actions
    function logMonsterActions(Damage) {
        let turn = [{
            isPlayer: false,
            text: `Dragon hits ${username} for ${Damage}`
        }];
        setGameLogs(turnLogs => [...turn, ...turnLogs]);
    };

    // Start Game
    function startGame() {
        defaultValues();
        setGameIsRunning(true);
    }

    // Reset to default Values
    function defaultValues() {
        setGameIsRunning(false);
        setPlayerHealth(defaultPlayerHealth);
        setMonsterHealth(defaultMonsterHealth);
        setShowModel(false);
        setGameLogs([])
        setTimer(defaultTimer);
    }

    function saveGame(winner, reason = "") {
        setGameIsRunning(false);
        saveGameResult({winner, description: reason});
        defaultValues();
    }

    // get random number by min & max values
    function calculateDamage(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Check Player or Dragon win after every Damager/Action
    function checkWin(monsterHealth, playerHealth) {
        if ( monsterHealth <= 0 ) {
            setModelText("You Won! New Game?");
            setWinner('Player');
            setShowModel(true);
            return true;
        } else if ( playerHealth <= 0 ) {
            setModelText("You Lost! New Game?");
            setWinner('Dragon');
            setShowModel(true);
            return true;
        }
        return false;
    }

    // Damage the Health by Attack or special Attack actions.
    function attackingActions(maxDamage) {
        let monsterHealthDamage = calculateDamage(1, maxDamage);
        let currentMonsterHealth = monsterHealth - monsterHealthDamage;
        setMonsterHealth(currentMonsterHealth);
        logPlayerActions(monsterHealthDamage)
        if (checkWin(currentMonsterHealth, playerHealth)) {
          return;
        }
        let playerHealthDamage = calculateDamage(1, maxDamage);
        let currentPlayerHealth = playerHealth - playerHealthDamage;
        setPlayerHealth(currentPlayerHealth);
        logMonsterActions(playerHealthDamage)
        checkWin(monsterHealth, currentPlayerHealth);
    }

    // Damage Health by Attack
    function attack() {
        attackingActions(10);
    }

    // Damage Health by Special Attach
    function specialAttack() {
        attackingActions(20);
    };

    function giveUp() {
        setModelText('Gived Up!! You Lost! New Game?');
        setWinner('Dragon');
        setShowModel(true);
    }

    function handleModelClose() {
        saveGame(winner);
        defaultValues();
    }

    function handleModelNewGame() {
        saveGame(
            winner,
            modelText
        );
        startGame();
    }
    
    // Heal the health
    function heal() {
        if (playerHealth <= 90) {
            let currentPlayerHealth = playerHealth + 10;
            setPlayerHealth(currentPlayerHealth);
        } else {
            let healPlayerHealth = calculateDamage(1, 20);
            let currentPlayerHealth = playerHealth + healPlayerHealth;
            if(currentPlayerHealth <= 100) {
                setPlayerHealth(currentPlayerHealth);
            }
        }
        
        if (this.monsterHealth <= 90) {
            let currentMonsterHealth = monsterHealth + 10;
            setMonsterHealth(currentMonsterHealth);
        } else {
            let healMonsterHealth = calculateDamage(1, 20);
            let currentMonsterHealth = monsterHealth + healMonsterHealth;
            if(currentMonsterHealth <= 100) {
                setMonsterHealth(currentMonsterHealth);
            }
        }
      }

    if (!gameIsRunning) {
        return(
            <div>
            <Header username = {username}/>
            <div id="app">
                <section className="row">
                    <div className="col-sm-6">
                        <h1 className="text-center">YOU</h1>
                        <div className="healthbar">
                            <div className={'healthbar text-center ' + (playerHealth > 40 ? 'green' : 'red')}
                                style={{width: (playerHealth + '%')}}>
                                {playerHealth}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <h1 className="text-center">DRAGON</h1>
                        <div className="healthbar">
                            <div className={'healthbar text-center ' + (monsterHealth > 40 ? 'green' : 'red')}
                                style={{width: (monsterHealth + '%')}}>
                                {monsterHealth}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="row actions-block">
                    <div className="col-sm-8">
                        <section className="row controls">
                            <div className="col-sm-12">
                                <button className="btn btn-success start-game"
                                    onClick={() => startGame()}>
                                    START NEW GAME
                                </button>
                            </div>
                        </section>
                    </div>
                    <div className="col-sm-4">
                        <section>
                            <h5>Previous Games</h5>
                            {!games || games.length === 0 ? (
                            <p>No Details available</p>
                            ) : (
                                <Games games={games}/>
                            )}
                        </section>
                    </div>
                </section>
            </div>
            </div>
        );
    } else {
        return(
            <div>
                <Header username = {username}/>
                <div id="app">
                <Modal show={showModel}>
                    <Modal.Body> {modelText}</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleModelClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={ handleModelNewGame }>
                        New Game?
                    </Button>
                    </Modal.Footer>
                </Modal>
                    <section className="row">
                        <div className="col-sm-6">
                            <h1 className="text-center">YOU</h1>
                            <div className="healthbar">
                                <div className={'healthbar text-center ' + (playerHealth > 40 ? 'green' : 'red')}
                                    style={{width: (playerHealth + '%')}}>
                                    {playerHealth}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <h1 className="text-center">DRAGON</h1>
                            <div className="healthbar">
                                <div className={'healthbar text-center ' + (monsterHealth > 40 ? 'green' : 'red')}
                                    style={{width: (monsterHealth + '%')}}>
                                    {monsterHealth}
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="row actions-block">
                        <div className="col-sm-8">
                            <section>
                                <span><strong>
                                            Timer: {timer}
                                        </strong></span>
                                <Actions giveUp={giveUp} attack={attack}  specialAttack={specialAttack} heal={heal}/>
                            </section>
                        </div>
                        <div className="col-sm-4">
                            <section>
                                <h5>Commentary  Box</h5>
                                <Gamelogs turns={turnLogs}/>    
                            </section>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}