import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const Box = styled.div`
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  width: 360px;
  margin: 40px auto;
`;

const Square = styled.div`
  height: 16px;
  width: 16px;
  border: 1px solid black;
  background-color: ${(props) => props.color}
`;

const randomPosition = () => Math.floor(Math.random() * 399);

const Board = ({ size }) => {
  const [snakePosition, setSnakePosition] = useState(0);
  const [foodPosition, setFoodPosition] = useState(randomPosition);

  useEffect(() => {
    const handleFood = (nextSnakePosition) => {
      let nextFoodPosition = foodPosition;
      while (nextSnakePosition === nextFoodPosition) {
        nextFoodPosition = randomPosition();
      }
      setFoodPosition(nextFoodPosition);
    };

    const handleSnake = (delta) => {
      setSnakePosition(snakePosition + delta);
      handleFood(snakePosition + delta);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' && snakePosition >= size) {
        handleSnake(-size);
      }
      else if (e.key === 'ArrowDown' && snakePosition < size * (size - 1)) {
        handleSnake(size);
      }
      else if (e.key === 'ArrowLeft' && snakePosition % size !== 0) {
        handleSnake(-1);
      }
      else if (e.key === 'ArrowRight' && (snakePosition + 1) % size !== 0) {
        handleSnake(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [snakePosition, foodPosition]);

  const renderSquares = () => {
    const squares = [];

    for (let i = 0; i < size * size; i++) {
      if (i === snakePosition) {
        squares.push(<Square color="red" />);
      } 
      else if (i === foodPosition) {
        squares.push(<Square color="blue" />);
      } 
      else {
        squares.push(<Square />);
      }
    }
    return squares;
  };

  return <Box>{renderSquares()}</Box>;
};

export default Board;
