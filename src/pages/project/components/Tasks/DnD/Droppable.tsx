import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import '../Task.css';

type DroppableProps = {
  children: React.ReactNode;
  id: string;
};

export function Droppable(
  {
    children,
    id,
  }: DroppableProps
) {
  const {isOver, setNodeRef} = useDroppable({
    id,
  });
  const style = {
    paddingTop: isOver ? '1.5em' : 0,
    transition: 'padding-top 0.3s ease',
    height: '100%'
  };


  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

export default Droppable;