(() => {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');
  const summary = document.getElementById('summary');
  const footer = document.getElementById('footer');
  const clearBtn = document.getElementById('clear-completed');

  let todos = JSON.parse(localStorage.getItem('todos') || '[]');

  function save() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function updateSummary() {
    const remaining = todos.filter(t => !t.done).length;
    summary.textContent = `${remaining} task${remaining !== 1 ? 's' : ''} remaining`;
    const hasCompleted = todos.some(t => t.done);
    footer.hidden = !hasCompleted;
  }

  function render() {
    list.innerHTML = '';
    todos.forEach((todo, i) => {
      const li = document.createElement('li');
      li.className = `todo-item${todo.done ? ' done' : ''}`;

      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = todo.done;
      cb.id = `todo-${i}`;
      cb.addEventListener('change', () => {
        todos[i].done = cb.checked;
        save();
        render();
      });

      const label = document.createElement('label');
      label.htmlFor = `todo-${i}`;
      label.textContent = todo.text;

      const del = document.createElement('button');
      del.className = 'delete-btn';
      del.textContent = '×';
      del.title = 'Delete';
      del.addEventListener('click', () => {
        todos.splice(i, 1);
        save();
        render();
      });

      li.append(cb, label, del);
      list.appendChild(li);
    });

    updateSummary();
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    todos.push({ text, done: false });
    input.value = '';
    save();
    render();
  });

  clearBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.done);
    save();
    render();
  });

  render();
})();
