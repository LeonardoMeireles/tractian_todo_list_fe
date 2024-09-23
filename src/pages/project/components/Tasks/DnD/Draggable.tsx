import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import DragIcon from '../../../../../assets/Icons/DragIcon.svg';

interface DraggableProps {
  id: string
}

function Draggable(
  {
    id
  }: DraggableProps
) {

  const {
    attributes,
    listeners,
    setNodeRef,
  } = useDraggable({
    id
  });

  return (
    <img
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      width={16}
      height={16}
      src={DragIcon}
      alt={'Drag Icon'}
    />
  );
}

export default Draggable;