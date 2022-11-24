/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import TaskForm from './TaskForm/TaskForm';
import Task from './Task/Task';
import stl from './TasksContainer.module.less';
import plus from '../assets/plus-svgrepo-com.svg';
import { collection, query, onSnapshot } from 'firebase/firestore';
import db from '../firebase';
import { todoTask } from '../types';

function TasksContainer() {
  const [todoData, setTodoData] = React.useState([]);

  //create todo task
  //read todo task
  React.useEffect(() => {
    const q = query(collection(db, 'todo'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // const todos: todoTask[] | [] = [];
      const todos: any = [];
      querySnapshot.forEach((doc) => {
        todos.push({ ...doc.data(), id: doc.id });
      });
      setTodoData(todos);
      console.log(todos);
    });
    return () => unsubscribe();
  }, []);

  //update todo task
  //delete todo task
  return (
    <section className={stl.wrapper}>
      <div className={stl.headerWrapper}>
        <h1 className={stl.header}> TODO LIST</h1>
        <button className={stl.btnAdd}>
          <img src={plus} alt="addTask" />
        </button>
      </div>

      <TaskForm />
      <div>
        {todoData.map((elem: any) => (
          <Task key={elem.id} dataToDo={elem} />
        ))}
        {/* {todoData.length ? todoData.map((elem) => <Task key={elem.id} dataToDo={elem} />) : ''} */}
      </div>
    </section>
  );
}

export default TasksContainer;
