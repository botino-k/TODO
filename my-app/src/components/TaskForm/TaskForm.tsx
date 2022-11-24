import React from 'react';
import stl from './TaskForm.module.less';

function TaskForm() {
  return (
    <div className={stl.wrapper}>
      <form className={stl.form} action="#">
        {/* task-imput */}
        <div className={stl.formItem}>
          <label className={stl.formLabel + ' ' + stl.formLabelFix} htmlFor="TODO-title-input">
            Task:
          </label>
          <div className={stl.taskInputBlock}>
            {' '}
            <input
              className={stl.formInput}
              type="text"
              name="title"
              id="TODO-title-input"
              placeholder="What are you working on?"
            />
            <textarea
              className={stl.formInput}
              name="description"
              placeholder="Describe your task"
              id="TODO-description-input"
            ></textarea>
          </div>
        </div>

        {/* deadline-imput */}
        <div className={stl.formItem + ' ' + stl.formItemFix}>
          <div className={stl.dateInputBlock}>
            <label className={stl.formLabel + ' ' + stl.formLabelFix} htmlFor="TODO-deadlineDate">
              Date:
            </label>
            <input
              className={stl.formInput}
              type="date"
              name="deadlineDate"
              id="TODO-deadlineDate"
            />
          </div>
          <div className={stl.dateInputBlock}>
            <label className={stl.formLabel + ' ' + stl.formLabelFix} htmlFor="TODO-deadlineTime">
              Time:
            </label>
            <input
              className={stl.formInput}
              type="time"
              name="deadlineTime"
              id="TODO-deadlineTime"
            />
          </div>
        </div>

        <div className={stl.formItem + ' ' + stl.formItemFix}>
          <p className={stl.formLabel}>Add documents:</p>
          <div className={''}>
            <div className={stl.fileItemContainer}>
              <label className={stl.btnInput}>
                File
                <input
                  className={stl.fileInputItem}
                  id="TODO-documents"
                  type="file"
                  name="documents"
                  multiple
                />
              </label>
            </div>
            <div className={stl.filePreviewBlock}> </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
