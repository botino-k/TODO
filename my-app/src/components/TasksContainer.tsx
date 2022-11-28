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
  getDoc,
} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';
import dayjs from 'dayjs';

function TasksContainer() {
  const [todoData, setTodoData] = React.useState([]);
  const [uploadFiles, setUploadFiles] = React.useState<FileList>();

  //upload files
  const uploadFilesTODO = async (files: FileList, id: string) => {
    const fileList = Object.values(files);
    fileList.map((elem, index) => {
      const storageRef = ref(storage, `todo/${id}${elem.name}`);
      const uploadTask = uploadBytesResumable(storageRef, elem);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateDoc(doc(db, 'todo', id), {
              [`file${index}`]: [`${elem.name}`, downloadURL],
            });
          });
        }
      );
    });
  };

  //create todo task
  const createTODO = async (event: any) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));
    console.log(dayjs());
    console.log(formData);

    const docRef = await addDoc(collection(db, 'todo'), {
      title: formData.title,
      description: formData.description,
      complited: false,
      deadline: {
        date: `${formData.deadlineDate}`,
        time: `${formData.deadlineTime}`,
      },
      //  `${formData.deadlineDate} ${formData.deadlineTime}`,
    });
    if (uploadFiles) {
      await uploadFilesTODO(uploadFiles, docRef.id);
    }
    event.target.reset();
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
      // console.log(todos);
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
    const docRef = doc(db, 'todo', todo.id);
    try {
      const doc = await getDoc(docRef);
      const docData = doc.data();
      const files = [];
      for (const i in docData) {
        i.includes('file') ? files.push(docData[i][0]) : null;
      }
      files.map((elem) => {
        const fileRef = ref(storage, `todo/${todo.id}${elem}`);
        deleteObject(fileRef)
          .then(() => {
            console.log('File deleted successfully');
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
          });
      });
      console.log('Cached document data:', doc.data());
    } catch (e) {
      console.log('Error getting cached document:', e);
    }

    await deleteDoc(doc(db, 'todo', todo.id));
  };

  return (
    <section className={stl.wrapper}>
      <div className={stl.headerWrapper}>
        <h1 className={stl.header}> TODO LIST</h1>
      </div>
      <TaskForm createTODO={createTODO} setFormFilesData={setUploadFiles} />
      <div>
        {todoData.map((elem: any) => (
          <Task key={elem.id} dataToDo={elem} toggleTODO={updateTODO} deleteTODO={deleteTODO} />
        ))}
      </div>
    </section>
  );
}

export default TasksContainer;
