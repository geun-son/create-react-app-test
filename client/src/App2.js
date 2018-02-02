import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import 'bootstrap/dist/css/bootstrap.css';

class App2 extends Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: 'round',
        name: '회차',
        locked: true,
        width: 50,
        sortable: true,
        resizable: true
      },
      {
        key: 'bot1_name',
        name: '봇 버전',
        width: 80,
        sortable: true,
        resizable: true,
      },
      {
        key: 'vsTerranWinningRate',
        name: 'vs테란',
        width: 80,
        sortable: true,
        resizable: true,
      },
      {
        key: 'vsProtossWinningRate',
        name: 'vs프토',
        width: 80,
        sortable: true,
        resizable: true,
      },
      {
        key: 'vsZergWinningRate',
        name: 'vs저그',
        width: 80,
        sortable: true,
        resizable: true,
      },
      {
        key: 'vsRandomWinningRate',
        name: 'vs랜덤',
        width: 80,
        sortable: true,
        resizable: true,
      },
      {
        key: 'totalWinningRate',
        name: '총 승률',
        width: 80,
        sortable: true,
        resizable: true
      },
      {
        key: 'turnDate',
        name: '회차 일시',
        width: 150,
        sortable: true,
        resizable: true,
      }
    ];
    this.state = { rows: this.createRows(10), sortColumn: null, sortDirection: null};
  }
  
/*  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(inputs => {
        Object.keys(inputs).map((key) => {
          console.log(inputs[key]);
          Object.keys(inputs[key]).map(function(jsonKey){
            if(jsonKey === 'mapCd'){
              inputs[key][jsonKey] = this.convertMapCd(inputs[key][jsonKey]);
            }
            else if(jsonKey === 'rsltCd'){
              inputs[key][jsonKey] = this.convertRsltCd(inputs[key][jsonKey]);
            }
          },this)
          this.state.rows.push(inputs[key]);
        });
        this.forceUpdate();
      })    
  };*/
  
  getRandomDate = (start, end) => {
    var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  
  createRows = (numberOfRows) => {
    let rows = [];
    for (let i = 1; i < numberOfRows; i++) {
      rows.push({
        round: 1,
        bot1_name: 'BOT ' + i,
        vsTerranWinningRate: [(Math.random() * 100).toFixed(2)],
        vsProtossWinningRate: [(Math.random() * 100).toFixed(2)],
        vsZergWinningRate: [(Math.random() * 100).toFixed(2)],
        vsRandomWinningRate: [(Math.random() * 100).toFixed(2)],
        totalWinningRate: [(Math.random() * 100).toFixed(2)],
        turnDate: this.getRandomDate(new Date(2015, 3, 1), new Date())
      });
    }

    return rows;
  };

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
    return  (
      <ReactDataGrid
        onGridSort={this.handleGridSort}
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
        minHeight={300}
        minWidth={700} />);
  }
}

export default App2;
