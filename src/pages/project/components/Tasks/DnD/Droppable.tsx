import React from 'react';
import './Droppable.css';
import { useDroppable } from '@dnd-kit/core';
import '../Task.css';

type DroppableProps = {
  disabled: boolean
  marginLeft?: string,
  width?: string,
  id: string;
};

interface DraggablePresentationProps {
  isOver?: boolean;
}

const DroppablePresentation = React.memo((
  {
    isOver
  }: DraggablePresentationProps
) => {
  return isOver
    ? <>
      <div className={'arrow-right'}/>
      <div className={'arrow-line'}/>
    </>
    : null;
});

export function Droppable(
  {
    disabled,
    marginLeft = '1em',
    width = '2em',
    id,
  }: DroppableProps,
) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    disabled,
  });
  const style = {
    transition: 'padding-top 0.3s ease',
    height: '10px',
    left: marginLeft,
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={setNodeRef}
        style={{
          width,
          position: 'absolute',
          zIndex: 1,
          ...disabled ? {} : style,
        }}
      >
        <DroppablePresentation isOver={isOver}/>
      </div>
    </div>
  );
}

export default Droppable;