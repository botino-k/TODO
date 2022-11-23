import React from 'react';
import stl from './App.module.less';
import TasksContainer from './components/TasksContainer';

function App() {
  return (
    <div className={stl.wrapper}>
      <TasksContainer />
    </div>
  );
}

export default App;
