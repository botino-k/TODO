/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import stl from './Task.module.less';
import { todoTask } from '../../types';
import remove from '../../assets/big-trash-can-svgrepo-com.svg';

interface Props {
  dataToDo: todoTask | any;
  toggleTODO: (dataToDo: todoTask) => void;
  deleteTODO: (dataToDo: todoTask) => void;
}

function Task({ dataToDo, toggleTODO, deleteTODO }: Props) {
  const getLinksRefArr = () => {
    const arr = [];
    for (const i in dataToDo) {
      i.includes('file') ? arr.push(dataToDo[i]) : null;
    }
    return arr;
  };

  const todoFiles = getLinksRefArr().map((elem: any, index: number) => (
    <div key={index} className={stl.link}>
      <a href={elem[1]}> {elem[0]}</a>
    </div>
  ));

  return (
    <article className={stl.wrapper}>
      <div className={dataToDo.complited ? `${stl.taskBox} ${stl.complited}` : stl.taskBox}>
        <div className={stl.taskBoxCheck}>
          <input
            onChange={() => toggleTODO(dataToDo)}
            type="checkbox"
            name=""
            id=""
            defaultChecked={dataToDo.complited ? true : false}
          />
        </div>
        <div className={stl.taskBoxMain}>
          <h1>{dataToDo.title}</h1>
          <p>{dataToDo.description}</p>
          <p className={stl.taskDeadline}>
            <span>Deadline:</span> {dataToDo.deadline?.toString()}
          </p>
          <div>{todoFiles}</div>
        </div>
        <div className={stl.taskBoxRemove}>
          <button onClick={() => deleteTODO(dataToDo)} className={stl.taskBoxRemoveBtn}>
            <img src={remove} alt="removeIcon" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default Task;
