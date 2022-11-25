/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import TaskForm from './TaskForm/TaskForm';
import Task from './Task/Task';
import stl from './TasksContainer.module.less';
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase';
import { todoTask } from '../types';

function TasksContainer() {
  const [todoData, setTodoData] = React.useState([]);
  const [formData, setFormData] = React.useState({});

  //create todo task
  const createTODO = async (event: any) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));
    await addDoc(collection(db, 'todo'), {
      title: formData.title,
      description: formData.description,
      complited: false,
      deadline: `${formData.deadlineDate} ${formData.deadlineTime}`,
      file: typeof formData.documents,
    });
    console.dir(formData);
  };

  //read todo tasks
  React.useEffect(() => {
    const q = query(collection(db, 'todo'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
  const updateTODO = async (todo: any) => {
    await updateDoc(doc(db, 'todo', todo.id), {
      complited: !todo.complited,
    });
  };

  //delete todo task
  const deleteTODO = async (todo: any) => {
    await deleteDoc(doc(db, 'todo', todo.id));
  };

  return (
    <section className={stl.wrapper}>
      <div className={stl.headerWrapper}>
        <h1 className={stl.header}> TODO LIST</h1>
      </div>

      <TaskForm createTODO={createTODO} />

      <div>
        {todoData.map((elem: any) => (
          <Task key={elem.id} dataToDo={elem} toggleTODO={updateTODO} deleteTODO={deleteTODO} />
        ))}
      </div>
    </section>
  );
}

export default TasksContainer;
