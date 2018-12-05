import * as React from 'react';
import GroupItem from './components/GroupItem';

class App extends React.Component {
  public render() {
    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '900px',
          height: '100%',
          backgroundImage: 'linear-gradient(to bottom, #6675f8, #29a1fd)',
        }}
      >
        <div
          style={{
            height: '40px',
          }}
        />
        <GroupItem itemInitialState={'USUAL'} initialValue={'1 Заголовок'} />
        <GroupItem itemInitialState={'USUAL'} initialValue={'2 Заголовок'} />
        <GroupItem itemInitialState={'USUAL'} initialValue={'3 Заголовок'} />
        <GroupItem itemInitialState={'USUAL'} initialValue={'4 Заголовок'} />
        <GroupItem
          itemInitialState={'USUAL'}
          initialValue={'Это длинное сообщение из сорока двух и более символов'}
        />
        <GroupItem
          itemInitialState={'INITIAL'}
          initialValue={'Все что угодно, все равно проигнорируется'}
        />
      </div>
    );
  }
}

export default App;
