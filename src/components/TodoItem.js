import { useRef, useState } from "react";
import api from "../utils/api";

const buttonStyle =
  "rounded-[4px] text-white text-[12px] px-[8px] py-[4px] h-fit w-fit";

const TodoItem = ({ item, getTasks }) => {
  const [editTitle, setEditTitle] = useState(item.title);
  const [editContent, setEditContent] = useState(item.content);
  const [editIsComplete, setEditIsComplete] = useState(item.isComplete);
  const [editPriority, setEditPriority] = useState(item.priority);
  const [priorityEdit, setPriorityEdit] = useState(false);
  const selectRef = useRef(null);

  const handleDeleteTask = async () => {
    const yes = window.confirm("정말 삭제하시겠습니까?");
    if (!yes) return;
    try {
      const response = await api.delete(`/tasks/${item._id}`);
      console.log(response);
      getTasks();
    } catch (error) {
      console.log("error", error);
      alert("할 일을 삭제하지 못했습니다.");
    }
  };

  const handleModifyTaskContent = async () => {
    try {
      const response = await api.put(`/tasks/${item._id}`, {
        title: editTitle,
        content: editContent,
        priority: editPriority,
      });
      console.log(response);
      item.title = editTitle;
      item.content = editContent;
      item.priority = editPriority;
      getTasks();
      alert("할 일을 성공적으로 수정했습니다.");
    } catch (error) {
      console.log("error", error);
      alert("할 일을 수정하지 못했습니다.");
    }
  };

  const handleModifyTaskStatus = async () => {
    const nextStatus = !editIsComplete;
    setEditIsComplete(nextStatus);
    try {
      const response = await api.put(`/tasks/${item._id}`, {
        isComplete: nextStatus,
      });
      console.log(response);
      getTasks();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="min-w-[340px]">
      <div className="bg-white flex flex-col gap-[30px] px-[12px] py-[9px] shadow-md rounded-[4px]">
        <div className="relative">
          <div className="flex flex-col gap-[3px]">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="font-bold text-[18px] outline-none border-none focus:ring-0"
            />

            <input
              type="text"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="text-[15px] outline-none border-none focus:ring-0"
            />
            <div>
              {priorityEdit ? (
                <select
                  ref={selectRef}
                  value={editPriority}
                  onChange={(e) => setEditPriority(Number(e.target.value))}
                  onBlur={() => setPriorityEdit(false)}
                  className="outline-none border-none bg-transparent text-[11px]
                           text-lg cursor-pointer appearance-none"
                  autoFocus
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {"⭐".repeat(n)}
                    </option>
                  ))}
                </select>
              ) : (
                <span
                  className="text-[11px] text-yellow-400 cursor-pointer select-none"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setPriorityEdit(true);
                    requestAnimationFrame(() => {
                      const sel = selectRef.current;
                      if (!sel) return;
                      if (sel.showPicker) sel.showPicker();
                      else
                        sel.dispatchEvent(
                          new MouseEvent("mousedown", { bubbles: true })
                        );
                    });
                  }}
                >
                  {"⭐".repeat(editPriority)}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={handleModifyTaskStatus}
            className="absolute top-[0px] right-[-3px] text-[13px] bg-blue-100 rounded-full pl-[5px] pr-[8px] py-[2px]"
          >
            {editIsComplete ? "✅완료" : "⏳진행 중"}
          </button>
        </div>

        <div className="flex gap-[5px]">
          <button
            onClick={handleDeleteTask}
            className={`bg-red-300 hover:bg-red-400 ${buttonStyle}`}
          >
            삭제
          </button>
          <button
            onClick={handleModifyTaskContent}
            className={`bg-purple-300 hover:bg-purple-400 ${buttonStyle}`}
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
