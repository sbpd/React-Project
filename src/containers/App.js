import React, { Component } from "react";
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js] Inside constructor", props);
    this.state = {
      persons: [
        { id: "4995", name: "Sumeet", age: 26 },
        { id: "4589", name: "Pallav", age: 28 },
        { id: "4785", name: "JJ", age: 23 }
      ],
      otherState: "Some other value",
      showPersons: false
    }
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount()');
  }

  componentDidMount () {
    console.log('[App.js] Inside componentDidMount()');
  }
  // state = {
  //   persons: [
  //     { id: "4995", name: "Sumeet", age: 26 },
  //     { id: "4589", name: "Pallav", age: 28 },
  //     { id: "4785", name: "JJ", age: 23 }
  //   ],
  //   otherState: "Some other value",
  //   showPersons: false
  // }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  /**
   * For 2 Way Binding input will change the value and update the DOM
   */
  nameChangeHandler = (e, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    });

    const person = { ...this.state.persons[personIndex] };

    // const person = Object.assign({}, this.state.persons[personIndex])

    person.name = e.target.value;

    const persons = [...this.state.persons];

    persons[personIndex] = person;

    this.setState({
      persons: persons
    })
  }

  /**
   * For Toggling to show or hide the Persons
   */
  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    });
  }

  render() {
    console.log('[App.js] Inside render()');

    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangeHandler}
      />
    }

    return (
      <div className={classes.App}>
        <Cockpit 
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonHandler}/>
        {persons}
      </div>
    );
  }
}

export default App;

/** More Conventional Way without using list
 *  <Person
            name={this.state.persons[0].name}
            age={this.state.persons[0].age} />
          <Person
            name={this.state.persons[1].name}
            age={this.state.persons[1].age}
            click={this.switchNameHandler.bind(this, 'Samish')}
            changed={this.nameChangeHandler}>My Hobbies: Casino</Person>
          <Person
            name={this.state.persons[2].name}
            age={this.state.persons[2].age} />
 */

  // /**
  //  * onClick method for button --> Fired when button is clicked
  //  */
  // switchNameHandler = (newName) => {
  //   console.log('Was clicked')
  //   this.setState({
  //     persons: [
  //       { name: newName, age: 26 },
  //       { name: "Pallav", age: 28 },
  //       { name: "JJ", age: 24 }
  //     ]
  //   })
  // }

  /**
   * nameChangeHandler -- > For 2 Way Binding
   * 
   * nameChangeHandler = (e) => {
    this.setState({
      persons: [
        { name: "Sam", age: 26 },
        { name: e.target.value, age: 28 },
        { name: "JJ", age: 23 }
      ]
    })
  }
   */

