import TodoItem from "./TodoItem";

const TodoBoard = ({ todoList, getTasks }) => {
  return (
    <div className="mb-[40px]">
      <h2 className="font-bold text-[26px]">📝 TODO LIST</h2>
      <div className="flex flex-wrap gap-[15px] p-[10px]">
        {todoList.length > 0 ? (
          todoList.map((item) => (
            <TodoItem key={item._id} item={item} getTasks={getTasks} />
          ))
        ) : (
          <h2>There is no Item to show</h2>
        )}
      </div>
    </div>
  );
};

export default TodoBoard;
