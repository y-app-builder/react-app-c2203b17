import React, { useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  emoji: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('📝');

  const emojis = ['📝', '🔥', '⭐', '🎯', '🚀', '💡', '🎁', '🏆', '🌈', '🍕'];

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        emoji: selectedEmoji
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Todo List with Emojis ✨</h1>
      
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          style={styles.input}
        />
        
        <div style={styles.emojiSelector}>
          {emojis.map(emoji => (
            <button
              key={emoji}
              onClick={() => setSelectedEmoji(emoji)}
              style={{
                ...styles.emojiButton,
                backgroundColor: selectedEmoji === emoji ? '#e0e0e0' : 'transparent'
              }}
            >
              {emoji}
            </button>
          ))}
        </div>
        
        <button onClick={handleAddTodo} style={styles.addButton}>
          Add Task
        </button>
      </div>
      
      <div style={styles.todoList}>
        {todos.length === 0 ? (
          <p style={styles.emptyMessage}>No tasks yet. Add one above! 🎉</p>
        ) : (
          todos.map(todo => (
            <div 
              key={todo.id} 
              style={{
                ...styles.todoItem,
                backgroundColor: todo.completed ? '#f5fff5' : 'white'
              }}
            >
              <div style={styles.todoContent}>
                <span style={styles.todoEmoji}>{todo.emoji}</span>
                <span 
                  style={{
                    ...styles.todoText,
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#888' : '#333'
                  }}
                >
                  {todo.text}
                </span>
              </div>
              <div style={styles.todoActions}>
                <button 
                  onClick={() => handleToggleTodo(todo.id)}
                  style={styles.actionButton}
                >
                  {todo.completed ? '↩️' : '✅'}
                </button>
                <button 
                  onClick={() => handleDeleteTodo(todo.id)}
                  style={styles.actionButton}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div style={styles.footer}>
        <p>You have {todos.filter(todo => !todo.completed).length} tasks remaining</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center' as const,
    color: '#333',
    marginBottom: '30px',
  },
  inputContainer: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginBottom: '10px',
  },
  emojiSelector: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    marginBottom: '10px',
  },
  emojiButton: {
    border: 'none',
    background: 'transparent',
    fontSize: '20px',
    cursor: 'pointer',
    margin: '0 5px',
    padding: '5px',
    borderRadius: '4px',
  },
  addButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  todoList: {
    marginTop: '20px',
  },
  emptyMessage: {
    textAlign: 'center' as const,
    color: '#888',
    fontStyle: 'italic',
  },
  todoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s',
  },
  todoContent: {
    display: 'flex',
    alignItems: 'center',
  },
  todoEmoji: {
    fontSize: '24px',
    marginRight: '15px',
  },
  todoText: {
    fontSize: '16px',
  },
  todoActions: {
    display: 'flex',
  },
  actionButton: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  footer: {
    marginTop: '20px',
    textAlign: 'center' as const,
    color: '#666',
  }
};

export default App;