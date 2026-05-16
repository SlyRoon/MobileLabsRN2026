import React, { createContext, useContext, useMemo, useState } from 'react';

const DEFAULT_OBJECT_SIZE = 120;

const initialState = {
  score: 0,
  tapCount: 0,
  doubleTapCount: 0,
  longPressDone: false,
  dragDone: false,
  swipeRightDone: false,
  swipeLeftDone: false,
  pinchDone: false,
  customTaskDone: false,
  themeMode: 'light',
  objectSize: DEFAULT_OBJECT_SIZE,
  lastAction: 'Спробуй натиснути на об’єкт',
};

const GameContext = createContext(null);

function getRandomPoints() {
  return Math.floor(Math.random() * 5) + 1;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function GameProvider({ children }) {
  const [state, setState] = useState(initialState);

  const addScore = (points, message) => {
    setState((current) => ({
      ...current,
      score: current.score + points,
      lastAction: message,
    }));
  };

  const handleTap = () => {
    setState((current) => ({
      ...current,
      score: current.score + 1,
      tapCount: current.tapCount + 1,
      lastAction: '+1 за натискання',
    }));
  };

  const handleDoubleTap = () => {
    setState((current) => ({
      ...current,
      score: current.score + 2,
      doubleTapCount: current.doubleTapCount + 1,
      lastAction: '+2 за подвійне натискання',
    }));
  };

  const handleLongPress = () => {
    setState((current) => ({
      ...current,
      score: current.longPressDone ? current.score : current.score + 5,
      longPressDone: true,
      lastAction: current.longPressDone ? 'Утримання вже зараховано' : '+5 за утримання',
    }));
  };

  const handleDrag = () => {
    setState((current) => ({
      ...current,
      score: current.dragDone ? current.score : current.score + 3,
      dragDone: true,
      lastAction: current.dragDone ? 'Об’єкт переміщено' : '+3 за перетягування',
    }));
  };

  const handleSwipeRight = () => {
    const points = getRandomPoints();

    setState((current) => ({
      ...current,
      score: current.score + points,
      swipeRightDone: true,
      lastAction: `+${points} за свайп вправо`,
    }));
  };

  const handleSwipeLeft = () => {
    const points = getRandomPoints();

    setState((current) => ({
      ...current,
      score: current.score + points,
      swipeLeftDone: true,
      lastAction: `+${points} за свайп вліво`,
    }));
  };

  const handlePinch = (scale) => {
    setState((current) => {
      const nextSize = clamp(Math.round(DEFAULT_OBJECT_SIZE * scale), 80, 180);
      const firstPinch = !current.pinchDone;

      return {
        ...current,
        score: firstPinch ? current.score + 3 : current.score,
        pinchDone: true,
        objectSize: nextSize,
        lastAction: firstPinch ? '+3 за зміну розміру' : 'Розмір об’єкта змінено',
      };
    });
  };

  const completeCustomTask = () => {
    setState((current) => ({
      ...current,
      score: current.customTaskDone ? current.score : current.score + 10,
      customTaskDone: true,
      lastAction: current.customTaskDone
        ? 'Бонусне завдання вже виконано'
        : '+10 за бонусне завдання',
    }));
  };

  const resetProgress = () => {
    setState((current) => ({
      ...initialState,
      themeMode: current.themeMode,
      lastAction: 'Прогрес скинуто',
    }));
  };

  const toggleTheme = () => {
    setState((current) => ({
      ...current,
      themeMode: current.themeMode === 'light' ? 'dark' : 'light',
    }));
  };

  const value = useMemo(
    () => ({
      ...state,
      addScore,
      handleTap,
      handleDoubleTap,
      handleLongPress,
      handleDrag,
      handleSwipeRight,
      handleSwipeLeft,
      handlePinch,
      completeCustomTask,
      resetProgress,
      toggleTheme,
    }),
    [state],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGame must be used inside GameProvider');
  }

  return context;
}
