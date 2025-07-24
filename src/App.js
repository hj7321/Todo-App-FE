import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Container from "react-bootstrap/Container";
import { useEffect, useRef, useState } from "react";
import api from "./utils/api";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState(3);

  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const getTasks = async () => {
    const response = await api.get("/tasks");
    const data = response.data.data;
    setTodoList(data);
  };

  const handleAddTask = async () => {
    if (!title || !title.trim()) {
      alert("제목을 입력해주세요.");
      titleRef.current.focus();
      return;
    } else if (!content || !content.trim()) {
      alert("내용을 입력해주세요.");
      contentRef.current.focus();
      return;
    }

    try {
      const response = await api.post("/tasks", {
        title,
        content,
        priority,
        isComplete: false,
      });
      if (response.status === 201) {
        setTitle("");
        setContent("");
        setPriority(3);
        getTasks();
      } else {
        throw new Error("task can not be added");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container>
      <div className="flex flex-col gap-[10px] my-[30px] max-w-[600px] rounded-[6px] bg-white px-[20px] pt-[12px] pb-[20px] shadow-md">
        <h3 className="font-bold text-[20px]">TODO를 작성해 주세요</h3>
        <div className="flex flex-col gap-[5px]">
          <div>
            <label htmlFor="title" className="text-gray-600 text-[14px]">
              제목
            </label>
            <input
              type="text"
              id="title"
              className="input-box"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              ref={titleRef}
            />
          </div>
          <div>
            <label htmlFor="content" className="text-gray-600 text-[14px]">
              내용
            </label>
            <textarea
              type="text"
              id="content"
              className="input-box h-[15vh] resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              ref={contentRef}
            />
          </div>
          <div className="flex gap-[10px] items-center">
            <label htmlFor="priority" className="text-gray-600 text-[14px]">
              중요도
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value))}
              className="h-[28px] w-[130px] border border-lightblue text-[14px] outline-none cursor-pointer rounded-[4px]"
            >
              <option value={1}>⭐</option>
              <option value={2}>⭐⭐</option>
              <option value={3}>⭐⭐⭐</option>
              <option value={4}>⭐⭐⭐⭐</option>
              <option value={5}>⭐⭐⭐⭐⭐</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleAddTask}
          className="rounded-[4px] bg-green-400 hover:bg-green-500 text-white text-[13px] px-[10px] py-[6px] h-fit w-fit"
        >
          추가하기
        </button>
      </div>

      <TodoBoard todoList={todoList} getTasks={getTasks} />
    </Container>
  );
}

export default App;
