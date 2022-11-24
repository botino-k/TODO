import React from 'react';
import stl from './Task.module.less';
import { todoTask } from '../../types';

interface Props {
  dataToDo: todoTask;
}

function Task({ dataToDo }: Props) {
  return (
    <article className={stl.wrapper}>
      <input type="checkbox" name="" id="" />
      <h1>{dataToDo.title}</h1>
      <p>{dataToDo.description}</p>
      <p>Deadline: {dataToDo.deadline}</p>
    </article>
  );
}

export default Task;
