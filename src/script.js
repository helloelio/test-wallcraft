const burgerButton = document.querySelector('.btn-burger');
const burgerMenu = document.querySelector('.burger');
const defaultTimer = 9000;

burgerButton.addEventListener('click', () => {
  burgerMenu.classList.toggle('opened');
});

const persons = [
  { id: 1, name: 'Mark', voices: 0, percents: 0 },
  { id: 2, name: 'Jacob', voices: 0, percents: 0 },
  { id: 3, name: 'Larry', voices: 0, percents: 0 },
  { id: 4, name: 'ASD', voices: 0, percents: 0 },
];

class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      allVoices: 0,
      winner: {},
      res: false,
    };
  }

  componentWillMount() {
    this.setState({ persons: this.props.persons });

    // добавление голосов
    let intervalId = setInterval(() => {
      let rand = Math.random();
      let randomPerson =
        rand > 1 / this.props.persons.length
          ? Math.floor(rand * this.props.persons.length)
          : false;
      if (randomPerson == false) {
        return;
      } else {
        this.state.persons[randomPerson].voices += 1;
      }
      // if (rand < 1 / this.props.persons.length) {
      //   return;
      // } else {
      //   this.state.persons[randomPerson].voices += 1;
      // }

      // Вариант с циклом где мы поочередно проходим по каждому person
      // и решаем давать ему голос или нет % шанса зависит от колличества person  в массиве

      // this.props.persons.map((person) => {
      //   if (rand < 1 / this.props.persons.length) {
      //     return;
      //   } else {
      //     person.voices += 1;
      //   }
      // }) && this.render();
    }, 10);

    let intervalId2 = setInterval(() => {
      // Сортируем наш массив по убыванию колличества очков
      this.setState({
        persons: this.state.persons.sort((a, b) => b.voices - a.voices),
      });
      // записываем в стейт колличество голосов за 1 сек
      this.state.persons.map((person) => {
        this.setState({
          allVoices: (this.state.allVoices += person.voices),
        });
      });
      // считаем проценты для person
      this.state.persons.map((person) => {
        person.percents = (
          person.voices /
          (this.state.allVoices / 100)
        ).toFixed(2);
      });
      // обнуляем каждый ТИК общее колличество голосов для корректной работы
      this.setState({ allVoices: 0 });
    }, 1000);

    // добавление процентов
    setTimeout(() => {
      clearInterval(intervalId);
      clearInterval(intervalId2);
      this.render();
    }, defaultTimer);

    // Выбираем победителя
    setTimeout(() => {
      const numbers = [];
      this.state.persons.map((person) => {
        numbers.push(person.voices);
      });
      let max = numbers[0];
      for (let i = 0; i < numbers.length; i += 1) {
        if (numbers[i] > max) max = arr[i];
      }
      // добавляем в стейт победителя
      this.state.persons.map((person) => {
        return person.voices == max ? this.setState({ winner: person }) : '';
      });
      // обновляем значение для отображения победителя
      this.setState({ res: true });
    }, 9000);
  }

  render() {
    return (
      <div>
        <h2 className='elections__title'>
          Elections{' '}
          {this.state.res == true ? 'winner - ' + this.state.winner.name : ''}
        </h2>
        <Timer />
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Voices</th>
              <th>percents</th>
            </tr>
          </thead>
          <tbody>
            {this.state.persons.map((person, i) => (
              <PersonItem person={person} key={i} id={i} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

class PersonItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {},
    };
  }
  componentWillMount() {
    // обновляем кажду секунду отображение компонента
    let intervalId = setInterval(
      () => this.setState({ person: this.props.person }) && this.render(),
      1000
    );
    setTimeout(() => clearInterval(intervalId), defaultTimer);
  }

  render() {
    return (
      <tr>
        <th>{this.props.id + 1}</th>
        <th>{this.props.person.name}</th>
        <th>{this.props.person.voices}</th>
        <th>{this.props.person.percents}%</th>
      </tr>
    );
  }
}

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 9,
      timerEnd: false,
    };
  }

  componentWillMount() {
    // обновляем кажду секунду таймер
    let timerId = setInterval(
      () => this.setState({ timer: (this.state.timer -= 1) }),
      1000
    );
    setTimeout(() => {
      clearInterval(timerId);
      this.setState({ timerEnd: true });
    }, 9000);
  }

  render() {
    if (!this.state.timerEnd) {
      return <div className='timer'>Time left: {this.state.timer} sec</div>;
    } else {
      return <div className='timer'>Time is over</div>;
    }
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <React.StrictMode>
          <TableComponent persons={persons} />
        </React.StrictMode>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#elections-main'));
