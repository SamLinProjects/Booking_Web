import React, { useState, useEffect, useCallback, useRef } from 'react';

// Type definitions
interface Position {
  x: number;
  y: number;
}

interface GameState {
  snake: Position[];
  direction: Position;
}

type SnakeGameProp = {bgcolor?:string}
const SnakeGame: React.FC<SnakeGameProp> = ({
  bgcolor='#111811',
}) => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const CELL_SIZE = 50;
  const BOARD_SIZEX = Math.floor(screenSize.width/CELL_SIZE);
  const BOARD_SIZEY = Math.floor(screenSize.height/CELL_SIZE);
  const INITIAL_SNAKE = [{ x: 3, y: 0 },{ x: 2, y: 0 },{ x: 1, y: 0}];
  const INITIAL_DIRECTION = { x: 1, y: 0 };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    direction: INITIAL_DIRECTION,
  });


  // Draw game on canvas
  const draw = useCallback((ctx: CanvasRenderingContext2D, state: GameState, bgcolor:string) => {
    // Clear canvas
    ctx.fillStyle = bgcolor;
    ctx.fillRect(0, 0, BOARD_SIZEX * CELL_SIZE, BOARD_SIZEY * CELL_SIZE);

    // Draw snake
    ctx.fillStyle = '#22bf22';
    state.snake.forEach((segment, index) => {
      ctx.fillRect(
        segment.x * CELL_SIZE, segment.y * CELL_SIZE,
        CELL_SIZE - 1,  CELL_SIZE - 1
      );

      // Snake head highlight
      if (index === 0) {
        ctx.fillStyle = '#1ea61e';
        ctx.fillRect(
          segment.x * CELL_SIZE + 2,
          segment.y * CELL_SIZE + 2,
          CELL_SIZE - 5,
          CELL_SIZE - 5
        );
        ctx.fillStyle = '#22bf22';
      }
    });

  }, []);

  // Game logic
  const moveSnake = useCallback(() => {
    setGameState(prevState => {
      const newSnake = [...prevState.snake];
      const head = { ...newSnake[0] };

      // Move head
      head.x += prevState.direction.x;
      head.y += prevState.direction.y;

      // Check wall collision
      if (head.x < 0) {return { ...prevState, direction: {x: 0,y: 1}, }};
      if (head.x >= BOARD_SIZEX) {return { ...prevState, direction: {x: 0,y: -1}, }};
      if (head.y < 0) {return { ...prevState, direction: {x: -1,y: 0}, }};
      if ( head.y >= BOARD_SIZEY) {return { ...prevState, direction: {x: 1,y: 0}, }};
      newSnake.unshift(head);
      newSnake.pop();
      return { ...prevState, snake: newSnake };
    });
  },[]);

  // Handle keyboard input
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    e.preventDefault();

    setGameState(prevState => {
      let newDirection = { ...prevState.direction };

      switch (e.key) {
        case 'ArrowUp':   case 'w':   case 'W':
          if (prevState.direction.y === 0) newDirection = { x: 0, y: -1 };  break;
        case 'ArrowDown':   case 's':   case 'S':
          if (prevState.direction.y === 0) newDirection = { x: 0, y: 1 }; break;
        case 'ArrowLeft':   case 'a':   case 'A':
          if (prevState.direction.x === 0) newDirection = { x: -1, y: 0 };  break;
        case 'ArrowRight':      case 'd':   case 'D':
          if (prevState.direction.x === 0) newDirection = { x: 1, y: 0 }; break;
      }
      return { ...prevState, direction: newDirection };
    })}, []);

  // Game loop
  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 150);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    draw(ctx, gameState,bgcolor);
  }, [gameState, draw]);

  // Keyboard event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className={`flex flex-col items-center bg-${bgcolor} text-white`}>
      <div className="rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={BOARD_SIZEX * CELL_SIZE}
          height={BOARD_SIZEY * CELL_SIZE}
          className="block"
          tabIndex={0}
        />
      </div>
    </div>
  );
};

export default SnakeGame;