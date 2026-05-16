import React, { useRef } from 'react';
import styled from 'styled-components/native';
import {
  Directions,
  FlingGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  PinchGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';

const ObjectBox = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.object};
  justify-content: center;
  shadow-color: #000000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.14;
  shadow-radius: 4px;
  elevation: 3;
`;

const ObjectText = styled.Text`
  color: ${({ theme }) => theme.objectText};
  font-size: 20px;
  font-weight: 900;
`;

const HintText = styled.Text`
  color: ${({ theme }) => theme.objectText};
  font-size: 12px;
  font-weight: 700;
  margin-top: 4px;
`;

export default function GameObject({
  size,
  position,
  onTap,
  onDoubleTap,
  onLongPress,
  onDrag,
  onSwipeRight,
  onSwipeLeft,
  onPinch,
}) {
  const doubleTapRef = useRef(null);

  const handleSingleTapState = (event) => {
    if (event.nativeEvent.state === State.END) {
      onTap();
    }
  };

  const handleDoubleTapState = (event) => {
    if (event.nativeEvent.state === State.END) {
      onDoubleTap();
    }
  };

  const handleLongPressState = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onLongPress();
    }
  };

  const handlePanState = (event) => {
    if (event.nativeEvent.state === State.END) {
      onDrag(event.nativeEvent.translationX, event.nativeEvent.translationY);
    }
  };

  const handleSwipeRightState = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onSwipeRight();
    }
  };

  const handleSwipeLeftState = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onSwipeLeft();
    }
  };

  const handlePinchState = (event) => {
    if (event.nativeEvent.state === State.END) {
      onPinch(event.nativeEvent.scale);
    }
  };

  return (
    <PanGestureHandler onHandlerStateChange={handlePanState}>
      <FlingGestureHandler direction={Directions.RIGHT} onHandlerStateChange={handleSwipeRightState}>
        <FlingGestureHandler direction={Directions.LEFT} onHandlerStateChange={handleSwipeLeftState}>
          <PinchGestureHandler onHandlerStateChange={handlePinchState}>
            <LongPressGestureHandler minDurationMs={3000} onHandlerStateChange={handleLongPressState}>
              <TapGestureHandler
                waitFor={doubleTapRef}
                numberOfTaps={1}
                onHandlerStateChange={handleSingleTapState}
              >
                <TapGestureHandler
                  ref={doubleTapRef}
                  numberOfTaps={2}
                  onHandlerStateChange={handleDoubleTapState}
                >
                  <ObjectBox
                    style={{
                      width: size,
                      height: size,
                      borderRadius: size / 2,
                      transform: [
                        { translateX: position.x },
                        { translateY: position.y },
                      ],
                    }}
                  >
                    <ObjectText>TAP</ObjectText>
                    <HintText>Жест</HintText>
                  </ObjectBox>
                </TapGestureHandler>
              </TapGestureHandler>
            </LongPressGestureHandler>
          </PinchGestureHandler>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </PanGestureHandler>
  );
}
