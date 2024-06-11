
import ToDoList from "@/components/todoList";
import { Provider } from 'react-redux';
import store from "@/components/store";
const Home = () => {
  return (
    <Provider store={store}>
      <ToDoList />
    </Provider>
  )
}

export default Home;
