import React from 'react';
import './Droppable.css';
import { useDroppable } from '@dnd-kit/core';
import '../Task.css';

type DroppableProps = {
  disabled: boolean
  marginLeft?: string,
  children?: React.ReactNode,
  id: string;
};

export function Droppable(
  {
    disabled,
    children,
    marginLeft = '1em',
    id,
  }: DroppableProps
) {
  const {isOver, setNodeRef} = useDroppable({
    id,
    disabled,
  });
  const style = {
    transition: 'padding-top 0.3s ease',
    height: '20px',
    left: marginLeft,
  };

  return (
    <div style={{position: 'relative'}}>
      {children}
      <div
        ref={setNodeRef}
        style={{
          width: '100vw',
          position: 'absolute',
          zIndex: 1,
          ...disabled ? {} : style
        }}
      >
        {isOver
          ? <>
            <div className={'arrow-right'}/>
            <div className={'arrow-line'}/>
          </>
          : null
        }
      </div>
    </div>
  );
}

export default Droppable;