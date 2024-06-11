"use client"
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { addTask, deleteTask, setTasks } from './tasksSlice';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ButtonDemoProps {
  deleteTask?: () => void;
  handleAddTask?: () => void;
}

interface InputDemoProps {
  setTask: (value: string) => void;
  task: string;
}

function InputDemo({ setTask, task }: InputDemoProps) {
  return (
    <Input
      type="text"
      value={task}
      className="flex mr-4"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTask(e.target.value)}
    />
  );
}

function DeleteButton({ deleteTask }: ButtonDemoProps) {
  return <Button onClick={deleteTask}>Delete</Button>;
}

function AddButton({ handleAddTask }: ButtonDemoProps) {
  return <Button onClick={handleAddTask}>Add</Button>;
}

const ToDoList = () => {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      if (parsedTasks.length > 0) {
        dispatch(setTasks(parsedTasks));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.removeItem('tasks');
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask(task));
      setTask('');
    }
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  return (
    <>
     <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">MyLogo</div>
        <div className="hidden md:flex space-x-4">
          <a href="#" className="text-white">Home</a>
          <a href="#" className="text-white">About</a>
          <a href="#" className="text-white">Services</a>
          <a href="#" className="text-white">Contact</a>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <a href="#" className="block px-2 py-1 text-white">Home</a>
        <a href="#" className="block px-2 py-1 text-white">About</a>
        <a href="#" className="block px-2 py-1 text-white">Services</a>
        <a href="#" className="block px-2 py-1 text-white">Contact</a>
      </div>
    </nav>
      <div className="mx-auto p-4 max-w-xl">

        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <div className="flex mb-4">
          <InputDemo setTask={setTask} task={task} />
          <AddButton handleAddTask={handleAddTask} />
        </div>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between p-2 border rounded">
              <span>{task.name}</span>
              <DeleteButton deleteTask={() => handleDeleteTask(task.id)} />
            </li>
          ))}
        </ul>
      </div>
    </>

  );
};

export default ToDoList;
