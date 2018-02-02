import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import './react-data-grid-toolbar.css'
import 'bootstrap/dist/css/bootstrap.css';
const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');
const round = 'id';
const bot1_name = 'botName';
const bot2_name = 'vsbotName';
const race = 'race';
const mapCd = 'mapCd';
const rsltCd  = 'rsltCd';
const game_date = 'battleTime';
class App extends Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: round,
        name: '회차',
        locked: true,
        width: 50,
        resizable: true
      },
      {
        key: bot1_name,
        name: '봇 버전',
        width: 65,
        sortable: true,
        resizable: true,
        filterable: true
      },
      {
        key: bot2_name,
        name: '상대 봇',
        width: 70,
        sortable: true,
        resizable: true,
        filterable: true
      },
      {
        key: race,
        name: '종족',
        width: 70,
        sortable: true,
        resizable: true,
        filterable: true
      },
      {
        key: mapCd,
        name: '맵',
        width: 100,
        sortable: true,
        resizable: true,
        filterable: true
      },
      {
        key:rsltCd,
        name: '결과',
        width: 80,
        sortable: true,
        resizable: true,
        filterable: true
      },
      {
        key: 'BWAPIver',
        name: 'BWAPI',
        width: 80,
        sortable: true,
        resizable: true,
        filterable: true
      },
      {
        key: game_date,
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
    fetch('/board/0')
      .then(function(response){
        if(response.status == 200)
          console.log(response.json());
          Object.keys(response.json()).map((key) => {
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
  };
  
  getRandomDate = (start, end) => {
    var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  convertRsltCd = (rsltCd) => {
    switch(rsltCd){
      case "01":
          return "정상 승리";
      case "02":
          return "오류 승리";
      case "03":
          return "타임아웃 승리";
      case "04":
          return "정상 패배";
      case "05":
          return "오류 패배";
      case "06":
          return "타임아웃 패배";
      }
  };
  
  convertMapCd = (rsltCd) => {
    switch(rsltCd){
      case "01":
          return "(2)Benzene.scx";
      case "02":
          return "(2)Destination.scx";
      case "03":
          return "(2)HeartbreakRidge.scx";
      case "04":
          return "(3)Aztec.scx";
      case "05":
          return "(3)TauCross.scx";
      case "06":
          return "(4)Andromeda.scx";
      case "07":
          return "(4)CircuitBreaker.scx";
      case "08":
          return "(4)EmpireoftheSun.scm";
      case "09":
          return "(4)Fortress.scx";
      case "10":
          return "(4)Python.scx";
      }
  };
  
  createRows = (numberOfRows) => {
    let rows = [];
    for (let i = 1; i < numberOfRows; i++) {
      rows.push({
        id: i,
        botName: 'BOT ' + i,
        vsbotName: 'vs BOT ' + i,
        race: ['Protoss', 'Terran', 'Zerg', 'Random'][Math.floor((Math.random() * 4))],
        mapCd: ['(2)Benzene.scx', '(2)Destination.scx', '(2)HeartbreakRidge.scx','(3)Aztec.scx', '(3)TauCross.scx', '(4)Andromeda.scx','(4)CircuitBreaker.scx','(4)EmpireoftheSun.scm','(4)Fortress.scx','(4)Python.scx'][Math.floor((Math.random() * 10))],
        rsltCd: ['정상 승리', '오류 승리', '타임아웃 승리', '정상 패배', '오류 패배', '타임아웃 패배'][Math.floor((Math.random() * 6))],
        BWAPIver: ['4.1', '4.2', '4.3'][Math.floor((Math.random() * 3))],
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
        minHeight={300}
        minWidth={750}
        toolbar={<Toolbar enableFilter={true}/>}
        onAddFilter={this.handleFilterChange}
        onClearFilters={this.onClearFilters}/>
    );
  }
}

export default App;
