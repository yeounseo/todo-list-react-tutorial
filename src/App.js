import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';

class App extends Component {

  id = 3 // 이미 0,1,2 가 존재하므로 3으로 설정한다.

  state = {
    input: '',
    todos: [
      {id:0, text: '리액트 소개', checked: false},
      {id:1, text: '리액트 소개', checked: true},
      {id:2, text: '리액트 소개', checked: false},
    ]
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value //input의 다음 바뀔 값
    });
  }

  // javascript로 보통 배열안에 새 데이터를 집어넣을떄 주로 push를 사용하는데
  // 리액트 state에서 배열을 다룰때 절대 push를 사용하면 안된다.
  // push를 통하여 데이터를 추가하면 배열에 값이 추가되긴 하지만, 가르키고 있는 배열은 똑같기 때문에
  // 비교를 할 수 없다. 나중에 최적화를 하게 될때, 배열을 비교하여 리렌더링을 방지하는데, push를 사용하면 최적화를 할수 없게 된다.
  // concat의 경우엔 새 배열을 만들어서 괜찮다.
  handleCreate = () => {
    const {input, todos } = this.state;
    this.setState({
      input: '', //인풋 비우고
      // concat을 사용하여 배열에 추가
      todos: todos.concat({
        id:this.id++,
        text:input,
        checked: false
      })
    });
  }

  handleKeyPress = (e) => {
    //눌러진 키가 Enter면 handleCreate 호출
    if(e.key === 'Enter'){
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const { todos } = this.state;

    //파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
    const index = todos.findIndex(todo=>todo.id === id);
    const selected = todos[index]; //선택한 객체

    // 전개 연산자 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_operator
    const nextTodos = [...todos]; //배열을 복사

    //기존의 값들을 복사하고, checked 값을 덮어쓴다.
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState ({
      todos:nextTodos
    });
  }

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todos => todos.id !== id)
    });
  }

  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove
    } = this;

    return (
      <TodoListTemplate form={(
        <Form
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
        />
      )}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
      </TodoListTemplate>
    );
  }
}

export default App;
