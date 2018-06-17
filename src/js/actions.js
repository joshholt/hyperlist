const actions = {
  setStateFromLocalStorage: () => {
    if (localStorage.getItem('items')) {
      return state => ({
        input: '',
        items: JSON.parse(localStorage.getItem('items'))
      });
    } else {
      return state => ({
        input: '',
        items: []
      });
    }
  },
  add: () => (state,actions) => {
    let st = {
      input: '',
      items: state.items.concat({
        value: state.input,
        completed: false,
        id: Date.now()
      })
    };

    localStorage.setItem('items', JSON.stringify(st.items));
    return st;
  },
  input: ({ value }) => ({ input: value }),
  toggle: id => state => {
    let st = {
      items: state.items.map(item => (
        id === item.id ? Object.assign({}, item, { completed: !item.completed }) : item
      ))
    };
    localStorage.setItem('items', JSON.stringify(st.items));
    return st;
  },
  destroy: id => state => {
    let st = {
      items: state.items.filter(item => item.id !== id)
    };
    localStorage.setItem('items', JSON.stringify(st.items));
    return st;

  },
  clearAllCompleted: ({ items }) => {
    let st = {
      items: items.filter(item => !item.completed)
    };
    localStorage.setItem('items', JSON.stringify(st.items));
    return st;
  }
};

export default actions;