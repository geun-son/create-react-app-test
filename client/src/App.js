import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import './react-data-grid-toolbar.css'
import 'bootstrap/dist/css/bootstrap.css';
const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: 'id',
        name: '회차',
        locked: true,
        width: 40,
        resizable: true
      },
      {
        key: 'botName',
        name: 'Bot Name',
        width: 120,
        sortable: true,
        resizable: true,
        filterable: true
      },
      {
        key: 'race',
        name: 'Race',
        width: 100,
        sortable: true,
        resizable: true,
        filterable: true
      },
      {
        key: 'BWAPIver',
        name: 'BWAPI',
        width: 100,
        sortable: true,
        resizable: true,
        filterable: true
      },
      {
        key: 'winCount',
        name: 'Win',
        width: 60,
        sortable: true,
        resizable: true
      },
      {
        key: 'loseCount',
        name: 'Lose',
        width: 60,
        sortable: true,
        resizable: true
      },
      {
        key: 'drawCount',
        name: 'Draw',
        width: 60,
        sortable: true,
        resizable: true
      },
      {
        key: 'battleTime',
        name: 'Battle Time',
        width: 200,
        sortable: true,
        resizable: true,
        filterable: true
      }
    ];
    this.state = { rows: this.createRows(10), filters: {}, sortColumn: null, sortDirection: null};
  }
  
  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(inputs => {
        Object.keys(inputs).map((key) => {
          inputs[key]
          this.state.rows.push(inputs[key]);
        });
        this.forceUpdate();
      })    
  };
  
  getRandomDate = (start, end) => {
    var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  createRows = (numberOfRows) => {
    let rows = [];
    for (let i = 1; i < numberOfRows; i++) {
      rows.push({
        id: i,
        botName: 'BOT ' + i,
        race: ['Protoss', 'Terran', 'Zerg'][Math.floor((Math.random() * 3))],
        BWAPIver: ['4.1', '4.2', '4.3'][Math.floor((Math.random() * 3))],
        winCount: Math.min(100, Math.round(Math.random() * 110)),
        loseCount: Math.min(100, Math.round(Math.random() * 110)),
        drawCount: Math.min(100, Math.round(Math.random() * 110)),
        battleTime: this.getRandomDate(new Date(2015, 3, 1), new Date())
      });
    }

    return rows;
  };
  
  getRows = () => {
    return Selectors.getRows(this.state);
  };

  getSize = () => {
    return this.getRows().length;
  };

  rowGetter = (i) => {
    const rows = this.getRows();
    return rows[i];
  };
  
  handleGridSort = (sortColumn, sortDirection) => {
    this.setState({ sortColumn: sortColumn, sortDirection: sortDirection });
  };
  
  handleFilterChange = (filter) => {
    let newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    this.setState({ filters: newFilters });
  };

  onClearFilters = () => {
    // all filters removed
    this.setState({filters: {} });
  };
  
  render() {
    return (
      <ReactDataGrid
        onGridSort={this.handleGridSort}
        enableCellSelect={true}
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this.getSize()}
        minHeight={500}
        toolbar={<Toolbar enableFilter={true}/>}
        onAddFilter={this.handleFilterChange}
        onClearFilters={this.onClearFilters}/>
    );
  }
}

export default App;
