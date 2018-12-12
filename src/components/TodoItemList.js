import React, { Component } from 'react';
import TodoItem from './TodoItem';

// todos : todo 객체들이 들어가있는 배열
// onToggle : 체크박스를 키고 끄는 함수
// onRemove : 아이템을 삭제 시키는 함수

class TodoItemList extends Component {

    //TodoItemList 최적화
    shouldComponentUpdate(nextProps, nextState){
        return this.props.todos !== nextProps.todos;
    }

    render() {
        const { todos, onToggle, onRemove} = this.props;

        const todoList = todos.map(
            ({id, text, checked}) => (
                <TodoItem
                    id={id}
                    text={text}
                    checked={checked}
                    onToggle={onToggle}
                    onRemove={onRemove}
                    key={id}
                />
            )
        );

        return (
            <div>
                {todoList}
            </div>
        );
    }
}

export default TodoItemList;