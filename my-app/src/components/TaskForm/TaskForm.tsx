import React from 'react';
import stl from './TaskForm.module.less';

function TaskForm() {
  return (
    <form action="#">
      <div className={stl.formItem}>
        <label className={stl.formLabel} htmlFor="TODO-title-input">
          Task:
        </label>
        <input
          type="text"
          name="title"
          id="TODO-title-input"
          placeholder="What are you working on?"
        />
      </div>

      <div className={stl.formItem}>
        <textarea
          name="description"
          placeholder="Describe your task"
          id="TODO-description-input"
        ></textarea>
      </div>

      <div className={stl.formItem}>
        <p className={stl.formLabel}>Deadline:</p>
        <label className={stl.formLabel} htmlFor="TODO-deadlineDate">
          Date:
        </label>
        <input type="date" name="deadlineDate" id="TODO-deadlineDate" />
        <label className={stl.formLabel} htmlFor="TODO-deadlineTime">
          Time:
        </label>
        <input type="time" name="deadlineTime" id="TODO-deadlineTime" />
      </div>

      <div className={stl.formItem}>
        <p className={stl.formLabel}>Add documents:</p>
        <div className={''}>
          <div className={''}>
            <label className={''}>
              Documents
              <input className={''} id="TODO-documents" type="file" name="documents" multiple />
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}

export default TaskForm;
