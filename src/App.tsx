import { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, Clock, Moon, Star, Cloud } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  time: string;
  completed: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('dreamy_todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [time, setTime] = useState('09:00');

  useEffect(() => {
    localStorage.setItem('dreamy_todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: input.trim(),
      time: time,
      completed: false,
    };

    // Sort logic: add and sort by time
    const updatedTodos = [...todos, newTodo].sort((a, b) => a.time.localeCompare(b.time));
    setTodos(updatedTodos);
    setInput('');
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="min-h-screen font-sans p-6 md:p-12 relative overflow-hidden">
      {/* Decorative Clouds */}
      <div className="absolute top-[10%] left-[-5%] text-white/40 animate-cloud-drift opacity-50">
        <Cloud size={180} fill="currentColor" />
      </div>
      <div className="absolute bottom-[20%] right-[-5%] text-white/30 animate-cloud-drift opacity-40" style={{ animationDirection: 'reverse', animationDuration: '30s' }}>
        <Cloud size={140} fill="currentColor" />
      </div>

      {/* Small Stars */}
      <div className="absolute top-20 right-40 text-dream-peach animate-pulse">
        <Star size={24} fill="currentColor" />
      </div>
      <div className="absolute top-60 left-20 text-white animate-bounce" style={{ animationDuration: '4s' }}>
        <Star size={16} fill="currentColor" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto">
        <header className="mb-12 text-center animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="bg-white/40 p-6 rounded-[2.5rem] animate-float">
              <Moon size={60} className="text-dream-navy" fill="#FFF9F0" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-cute font-bold mb-3 tracking-tight text-dream-navy">
            꿈꾸는 <span className="text-white drop-shadow-md">내일</span>
          </h1>
          <p className="text-dream-navy/60 text-xl font-cute">
            잠들기 전, 반짝이는 내일을 예약하세요 ✨
          </p>
        </header>

        <form onSubmit={addTodo} className="cute-card p-8 mb-12 animate-slide-up-cute space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-bold text-dream-navy/40 mb-2 ml-4 uppercase tracking-widest">무엇을 할까요?</label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="내일의 일과를 적어보세요..."
                className="w-full cute-input py-4 text-lg"
              />
            </div>
            <div className="w-32">
              <label className="block text-sm font-bold text-dream-navy/40 mb-2 ml-4 uppercase tracking-widest">언제?</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full cute-input py-4 text-lg px-4"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full cute-button py-5 text-xl flex items-center justify-center gap-2 group"
          >
            <Plus size={28} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
            <span>내일 계획에 추가하기</span>
          </button>
        </form>

        <div className="space-y-6">
          {todos.length === 0 ? (
            <div className="text-center py-20 bg-white/30 rounded-[3rem] border-4 border-dashed border-white/50 animate-fade-in">
              <span className="text-6xl block mb-6">🧸</span>
              <p className="text-dream-navy/40 text-2xl font-cute">아직 계획된 내일이 없어요.</p>
            </div>
          ) : (
            todos.map((todo, index) => (
              <div
                key={todo.id}
                style={{ animationDelay: `${index * 100}ms` }}
                className={`group flex items-center justify-between p-6 cute-card transition-all duration-500 animate-slide-up-cute hover:-rotate-1 ${todo.completed
                    ? 'opacity-50 grayscale scale-[0.98]'
                    : 'hover:border-dream-peach/40'
                  }`}
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-dream-navy/30 mb-1">TIME</span>
                    <div className="bg-dream-sky/40 px-3 py-1 rounded-full text-dream-navy/80 font-bold text-sm flex items-center gap-1">
                      <Clock size={14} />
                      {todo.time}
                    </div>
                  </div>

                  <div className="h-10 w-[2px] bg-slate-100 mx-2" />

                  <div className="flex items-center gap-4 flex-1">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`size-8 rounded-2xl flex items-center justify-center transition-all duration-300 ${todo.completed
                          ? 'bg-dream-mint text-emerald-600 rotate-12'
                          : 'bg-slate-100 text-slate-300 hover:text-dream-peach hover:bg-dream-cream animate-pulse'
                        }`}
                    >
                      {todo.completed ? <CheckCircle2 size={24} strokeWidth={3} /> : <Circle size={24} strokeWidth={3} />}
                    </button>
                    <span
                      className={`text-xl font-cute transition-all duration-500 ${todo.completed
                          ? 'text-slate-400 line-through'
                          : 'text-dream-navy font-bold'
                        }`}
                    >
                      {todo.text}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 text-rose-300 hover:text-rose-500 p-2 transition-all duration-300"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            ))
          )}
        </div>

        <footer className="mt-20 text-center pb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white/30 px-6 py-2 rounded-full border border-white/50">
            <Star size={16} fill="#FFD8B1" className="text-dream-peach" />
            <span className="text-dream-navy/40 font-cute text-lg">
              오늘 밤도 좋은 꿈 꾸세요
            </span>
            <Moon size={16} fill="#2D3436" className="text-dream-navy" />
          </div>
        </footer>
      </div>
    </div>
  );
}
