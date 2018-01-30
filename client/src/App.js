import React, { Component } from 'react';
import './App.css';
import ReactDataGrid from 'react-data-grid';
import 'bootstrap/dist/css/bootstrap.css';

const columns = [{ key: 'id', name: 'ID' }, { key: 'username', name: 'user name' }];
const rows = [{ id: 1, username: 'Title 1' }];
const rowGetter = rowNumber => rows[rowNumber];
 
class App extends Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: 'id',
        name: 'ID',
        locked: true
      },
      {
        key: 'task',
        name: 'Title',
        width: 200,
        sortable: true
      },
      {
        key: 'priority',
        name: 'Priority',
        width: 200,
        sortable: true
      },
      {
        key: 'issueType',
        name: 'Issue Type',
        width: 200,
        sortable: true
      },
      {
        key: 'complete',
        name: '% Complete',
        width: 200,
        sortable: true
      },
      {
        key: 'startDate',
        name: 'Start Date',
        width: 200,
        sortable: true
      },
      {
        key: 'completeDate',
        name: 'Expected Complete',
        width: 200,
        sortable: true
      }
    ];

    let originalRows = this.createRows(1000);
    let rows = originalRows.slice(0);
    this.state = { originalRows, rows };
  }
  
  getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  };

  createRows = () => {
    let rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        task: 'Task ' + i,
        complete: Math.min(100, Math.round(Math.random() * 110)),
        priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
        issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
        startDate: this.getRandomDate(new Date(2015, 3, 1), new Date()),
        completeDate: this.getRandomDate(new Date(), new Date(2016, 0, 1))
      });
    }

    return rows;
  };
  
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }
  
  handleGridSort = (sortColumn, sortDirection) => {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
      } else if (sortDirection === 'DESC') {
        return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
      }
    };

    const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);

    this.setState({ rows });
  };
  
  rowGetter = (i) => {
    return this.state.rows[i];
  };
  render() {
    return (
      <ReactDataGrid
        onGridSort={this.handleGridSort}
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
        minHeight={500} />
    );
  }
}

export default App;
