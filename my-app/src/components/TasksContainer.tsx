import React from 'react';
import TaskForm from './TaskForm/TaskForm';
import stl from './TasksContainer.module.less';

function TasksContainer() {
  return (
    <section className={stl.wrapper}>
      <h1 className={stl.header}> TODO LIST</h1>
      <TaskForm />
    </section>
  );
}

export default TasksContainer;
