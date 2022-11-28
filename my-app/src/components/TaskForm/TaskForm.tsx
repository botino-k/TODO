/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import stl from './TaskForm.module.less';
import plus from '../../assets/plus-svgrepo-com.svg';

interface Props {
  createTODO: (event: any) => void;
  setFormFilesData: (prop: FileList) => void;
}

function TaskForm({ createTODO, setFormFilesData }: Props) {
  const [nameFiles, setNameFiles] = React.useState<string[]>([]);

  const getFilesData = async (event: React.FormEvent<HTMLInputElement>) => {
    const fls = (event.target as HTMLInputElement).files;
    const fileNameArr: string[] = [];
    if (fls) {
      setFormFilesData(fls);
      for (let i = 0; i < fls.length; i++) {
        fileNameArr.push(fls[i].name);
      }
    }
    setNameFiles(fileNameArr);
  };

  const fileCollectionBlock = nameFiles.map((el, index) => (
    <span className={stl.fileName} key={index}>{`${index + 1})  ${el}`}</span>
  ));

  return (
    <div className={stl.wrapper}>
      <form onSubmit={createTODO} className={stl.form} action="#">
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

        {/* file-imput */}
        <div className={stl.formItem + ' ' + stl.formItemFix}>
          <p className={stl.formLabel}>Add documents:</p>
          <div className={stl.fileBlock}>
            <div className={stl.fileItemContainer}>
              <label className={stl.btnInput}>
                File
                <input
                  onChange={getFilesData}
                  className={stl.fileInputItem}
                  id="TODO-documents"
                  type="file"
                  name="documents"
                  multiple
                />
              </label>
            </div>
            <div>{fileCollectionBlock}</div>
          </div>
        </div>

        <button className={stl.btnAdd}>
          <img src={plus} alt="addTask" />
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
