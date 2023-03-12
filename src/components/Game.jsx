import React, { useEffect, useState } from "react";
import styled from "styled-components";

const BIRD_SIZE = 20;
const GAME_WIDTH = 500;
const GAME_HEIGHT = 500;
const GRAVITY = 6;
const JUMP_HEIGHT = 100;
const OBSTACLE_WIDTH = 40;
const OBSTACLE_GAP = 200;

function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [birdPosition, setBirdPosition] = useState(250);
  const [obstacleHeight, setObstacleHeight] = useState(200);
  const [obstacleLeft, setObstacleLeft] = useState(GAME_WIDTH - OBSTACLE_WIDTH);
  const [score, setScore] = useState(0);

  const bottomObstacleHeight = GAME_HEIGHT - OBSTACLE_GAP - obstacleHeight;

  useEffect(() => {
    let timeId;

    if (gameStarted && birdPosition < GAME_HEIGHT - BIRD_SIZE) {
      timeId = setInterval(() => {
        setBirdPosition((birdPosition) => birdPosition + GRAVITY);
      }, 24);

      return () => clearInterval(timeId);
    }
  }, [birdPosition, gameStarted]);

  const handleClick = () => {
    let newBirdPosition = birdPosition - JUMP_HEIGHT;
    if (!gameStarted) {
      setGameStarted(true);
    } else if (newBirdPosition < 0) {
      setBirdPosition(0);
    } else {
      setBirdPosition(newBirdPosition);
    }
  };

  useEffect(() => {
    let obstacleId;
    if (gameStarted && obstacleLeft >= -OBSTACLE_WIDTH) {
      obstacleId = setInterval(() => {
        setObstacleLeft((obstacleLeft) => obstacleLeft - 5);
      }, 24);
      return () => clearInterval(obstacleId);
    } else {
      const randomHeight = Math.floor(
        Math.random() * (GAME_HEIGHT - OBSTACLE_GAP)
      );
      setObstacleLeft(GAME_WIDTH - OBSTACLE_WIDTH);
      setObstacleHeight(randomHeight);
      setScore((score) => score + 1);
    }
  }, [gameStarted, obstacleLeft]);

  useEffect(() => {
    const TopObstacleCollided =
      birdPosition >= 0 && birdPosition < obstacleHeight;
    const BottomObstacleCollided =
      birdPosition <= 500 && birdPosition >= 500 - bottomObstacleHeight;

    if (
      obstacleLeft >= 0 &&
      obstacleLeft <= OBSTACLE_WIDTH &&
      (TopObstacleCollided || BottomObstacleCollided)
    ) {
      setGameStarted(false);
    }
  }, [birdPosition, obstacleHeight, bottomObstacleHeight, obstacleLeft]);

  return (
    <Div onClick={handleClick}>
      <ScoreDisplay>{score}</ScoreDisplay>
      <GameBox width={GAME_WIDTH} height={GAME_HEIGHT}>
        <Obstacle
          top={0}
          width={OBSTACLE_WIDTH}
          height={obstacleHeight}
          left={obstacleLeft}
        />
        <Obstacle
          top={GAME_HEIGHT - (obstacleHeight + bottomObstacleHeight)}
          width={OBSTACLE_WIDTH}
          height={bottomObstacleHeight}
          left={obstacleLeft}
        />
        <Bird size={BIRD_SIZE} top={birdPosition}></Bird>
      </GameBox>
    </Div>
  );
}

export default Game;

const Bird = styled.div`
  position: absolute;
  background-color: red;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  top: ${(props) => props.top}px;
  border-radius: 50%;
`;

const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GameBox = styled.div`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-color: green;
  overflow: hidden;
`;

const Obstacle = styled.div`
  position: relative;
  background-color: blue;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

const ScoreDisplay = styled.span`
  color: white;
  font-size: 24px;
  position: absolute;
`;
