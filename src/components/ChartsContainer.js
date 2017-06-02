import React from 'react'
import Charts from './Charts'
// import Filtering from './Filtering'
import allprojects from './global.json'
import nameproject from './nameproject.json'
import Radium from 'radium'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import moment from 'moment'
import logo from './logo.png'
import { DropdownButton, MenuItem, Checkbox, Glyphicon, Dropdown } from 'react-bootstrap'
import Select from 'react-select'
import 'react-select/dist/react-select.css';


const styles = {
  containerstyles: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100vh'
  },
  topbar: {
    display: 'block',
    width: '100%',
    height: '150px',
    backgroundColor: '#000021'
  },
  blueberry: {
    display: 'block',
    position: 'absolute',
    width: 'auto',
    marginTop: '50px',
    marginLeft: '20px'
  },
  datepicker: {
    display: 'block',
    margin: 'auto',
    marginTop: '15px',
    width: '300px',
    '@media screen and (max-width:830px)': {
      marginLeft: '270px'
    }
  },
  buttonstyles: {
    borderRadius: '500px',
    minwidth: '250px',
    fontFamily: 'Quicksand',
    textTransform: 'uppercase',
    fontSize: '15px',
    fontWeight: 'normal',
    backgroundColor: 'transparent',
    border: 'solid',
    color: '#fff',
    borderColor: '#fff',
    borderWidth: '2px',
    paddingRight: '48px',
    paddingLeft: '48px',
    paddingTop: '15px',
    paddingBottom: '13px',
    display: 'block',
    margin: 'auto',
    marginBottom: 20,
    ':hover': {
      backgroundColor: '#fff',
      color: '#000021',
      cursor: 'pointer',
    },
    ':focus': {
      outline: 'none'
    }
  }
}
const colors = ['#de0b74','#a4e1f5','#a94402',
'#40deee','#4826df','#9682f3','#82f3a4','#cff32a',
'#fcf523','#7c3b86','#3b4586', '#055789','#3be054',
'#a00f06','#f23529','#f9b707','#0bbd5c','#034b24',
'#4c7780','#ec05bb', '#75022f','#a204fc','#0480fc',
'#85af90','#d4f5ec','#1b1755','#de3909','#f9fa94',
'#73b273','#024ea9']

class ChartsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isProjectView: true,
      date: 'May-5-2017',
      startDate: moment(),
      focused: false,
      true: true,
      filters: {
        sector: [],
        //'distribution','comms', 'public', 'FSS', 'internal', 'healthcare', 'IBM Middle East', 'other'
        ptype: []
        //'pipeline', 'sold', 'internal', 'business development', 'other'
      },
      checkedSectors: {
        'distribution': true,
        'comms': true,
        'internal': true,
        'public': true,
        'FSS':true,
        'healthcare': true,
        'IBM Middle East': true,
        'other': true
      },
      checkedPTypes: {
        'pipeline': true,
        'business development': true,
        'sold': true,
        'internal': true,
        'other': true
      },
      isAllChecked: true,
    }
  }

  handleClick = () => {
    this.setState({isProjectView: !this.state.isProjectView});
    console.log(this.state.startDate.getMonth)
  }
  handleSector = (e) => {
    const filters = this.state.filters
    const checkedSectors = this.state.checkedSectors
    let index

    if (e.target.checked) {
      index = filters.sector.indexOf(e.target.value)
      filters.sector.splice(index, 1)
    } else {
      filters.sector.push(e.target.value)
    }
    checkedSectors[e.target.value] = !checkedSectors[e.target.value]

    this.setState({ filters: filters })
    this.setState({checkedSectors: checkedSectors})

  }
  handlePtype = (e) => {
    const filters = this.state.filters
    const checkedPTypes = this.state.checkedPTypes
    let index

    if (e.target.checked) {
      index = filters.ptype.indexOf(e.target.value)
      filters.ptype.splice(index, 1)
    } else {
      filters.ptype.push(e.target.value)
    }
    checkedPTypes[e.target.value] = !checkedPTypes[e.target.value]

    this.setState({ filters: filters })
    this.setState({ checkedPTypes: checkedPTypes})
    console.log(this.state.checkedPTypes)
    console.log(this.state.filters)

    // if(this.state.isAllChecked === false)
  }

  handleSelectAll = (e) => {
    const checkedSectors = this.state.checkedSectors
    const checkedPTypes = this.state.checkedPTypes
    const filters = this.state.filters
    let index

    Object.keys(checkedSectors).map((key)=>{
      checkedSectors[key] = e.target.checked

      if (checkedSectors[key]) {
        index = filters.sector.indexOf(key)
        filters.sector.splice(index, 1)
      } else {
        filters.sector.push(key)
      }
    })
    Object.keys(checkedPTypes).map((key)=>{
      checkedPTypes[key] = e.target.checked

      if (checkedPTypes[key]) {
        index = filters.ptype.indexOf(key)
        filters.ptype.splice(index, 1)
      } else {
        filters.ptype.push(key)
      }
    })
    this.setState({ checkedPTypes : checkedPTypes})
    this.setState({ checkedSectors : checkedSectors})
  }

  handleChange = (e) => {
    this.setState({value: e.target.value});
  }

  handleCalendar = (date) => {
    this.setState({
      date: date.clone().isoWeekday(5).format('MMM-D-YYYY'),
      startDate: date,
    });
  }

  render() {
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    var projectObj = {};
    var nameObj = {};

    for (var i = 0; i < allprojects[this.state.date].length; i++) { //1 variable
      var currentProject = allprojects[this.state.date][i]
      var currentName = allprojects[this.state.date][i]
      if (!(this.state.filters.sector.includes(currentProject.sector) || this.state.filters.ptype.includes(currentProject.ptype))) { //2 vars
        if (Object.keys(projectObj).includes(currentProject.project)) {
          projectObj[currentProject.project][currentProject.first_name] = currentProject.hours
        } else {
          projectObj[currentProject.project] = {}
          projectObj[currentProject.project][currentProject.first_name] = currentProject.hours
        }
        if (Object.keys(nameObj).includes(currentName.first_name)) {
          nameObj[currentName.first_name][currentName.project] = currentName.hours
        } else {
          nameObj[currentName.first_name] = {}
          nameObj[currentName.first_name][currentName.project] = currentName.hours
        }
      }
    }

    var projectArray = [];
    var nameArray = [];

    Object.keys(projectObj).map( key => {
      projectObj[key].project = key
      projectArray.push(projectObj[key])
    })
    Object.keys(nameObj).map( key => {
      nameObj[key].name = key
      nameArray.push(nameObj[key])
    })
    projectArray.sort(( a, b ) => {
      a = a.project.toLowerCase();
      b = b.project.toLowerCase();

      return a < b ? -1 : a > b ? 1 : 0;
    });

    nameArray.sort(( a, b ) => {
      a = a.name.toLowerCase();
      b = b.name.toLowerCase();

      return a < b ? -1 : a > b ? 1 : 0;
    });
    var nameprojectObj = {
      name : nameArray,
      project : projectArray
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //nameproject[this.state.date] ? do this : do that
    var projectfilters = nameprojectObj.project.map((a, index) =>
    <Bar dataKey={a.project} stackId='stack' fill={colors[index]} isAnimationActive={false}/>)

    var namefilters = nameprojectObj.name.map((a, index) =>
    <Bar key={index} dataKey={a.name} stackId='stack' fill={colors[index]} isAnimationActive={false}/>)

    const Toggle = this.state.isProjectView ? 'Project View' : 'Name View'
    
    var allSectorSelected = []
    var allPTypeSelected = []

    Object.keys(this.state.checkedSectors).map((key, index)=>{
      allSectorSelected[index] = this.state.checkedSectors[key]

    })
    var isSectorChecked = allSectorSelected.filter(function(c) {
    	return c;
    }).length === allSectorSelected.length;

    Object.keys(this.state.checkedPTypes).map((key, index)=>{
      allPTypeSelected[index] = this.state.checkedPTypes[key]

    })
    var isPTypeChecked = allPTypeSelected.filter(function(c) {
    	return c;
    }).length === allPTypeSelected.length;

    var isAllChecked = isSectorChecked&&isPTypeChecked
    this.state.isAllChecked = isAllChecked

    return (

      <div style={styles.containerstyles}>
        <div style ={styles.topbar}>
          <div style= {styles.blueberry}>
            <img src={logo} style={{maxWidth: '260px', height: 'auto', }}/>
          </div>
          <div style={styles.datepicker}>
            <div style={{position: 'absolute', marginTop: '20px', marginLeft:'260px'}}>
              <Dropdown title="Menu" id="menu-nav-dropdown">
                <Dropdown.Toggle>
                  <Glyphicon glyph="filter" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Checkbox style={{margin: '5px', marginLeft: '20px'}} value='selectSector' onClick={this.handleSelectAll} key={0} checked={isAllChecked}>Select All</Checkbox>
                  <MenuItem disabled>Sector</MenuItem>
                  <Checkbox style={{margin: '5px', marginLeft: '20px'}} value='distribution' onClick={this.handleSector} checked={this.state.checkedSectors['distribution']}>Distribution</Checkbox>
                  <Checkbox style={{margin: '5px', marginLeft: '20px'}} value='comms' onClick={this.handleSector} checked={this.state.checkedSectors['comms']}>Comms</Checkbox>
                  <Checkbox style={{margin: '5px', marginLeft: '20px'}} value='internal' onClick={this.handleSector} checked={this.state.checkedSectors['internal']}>Internal</Checkbox>
                  <Checkbox style={{margin: '5px', marginLeft: '20px'}} value='public' onClick={this.handleSector} checked={this.state.checkedSectors['public']}>Public Sector</Checkbox>
                  <Checkbox style={{margin: '5px', marginLeft: '20px'}} value='FSS' onClick={this.handleSector} checked={this.state.checkedSectors['FSS']}>FSS</Checkbox>
                  <Checkbox style={{margin: '5px', marginLeft: '20px'}} value='healthcare' onClick={this.handleSector} checked={this.state.checkedSectors['healthcare']}>Healthcare</Checkbox>
                  <Checkbox style={{margin: '5px', marginLeft: '20px'}} value='IBM Middle East' onClick={this.handleSector} checked={this.state.checkedSectors['IBM Middle East']}>IBM Middle East</Checkbox>
                  <Checkbox style={{margin: '5px', marginLeft: '20px'}} value='other' onClick={this.handleSector} checked={this.state.checkedSectors['other']}>Other</Checkbox>
                  <MenuItem disabled>Project Type</MenuItem>
                  <Checkbox style={{margin: '5px', marginLeft: '20px'}} value='pipeline' onClick={this.handlePtype} checked={this.state.checkedPTypes['pipeline']}>Pipeline</Checkbox>
                  <Checkbox style={{margin: '5px', marginLeft: '20px'}} value='business development' onClick={this.handlePtype} checked={this.state.checkedPTypes['business development']}>Business Development</Checkbox>
                  <Checkbox style={{margin: '5px', marginLeft: '20px'}} value='sold' onClick={this.handlePtype} checked={this.state.checkedPTypes['sold']}>Sold</Checkbox>
                  <Checkbox style={{margin: '5px', marginLeft: '20px'}} value='internal' onClick={this.handlePtype} checked={this.state.checkedPTypes['internal']}>Internal</Checkbox>
                  <Checkbox style={{margin: '5px', marginLeft: '20px'}} value='other' onClick={this.handlePtype} checked={this.state.checkedPTypes['other']}>Other</Checkbox>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div style={{width: '132px', margin: 'auto'}}>
              <SingleDatePicker
                style={{display: 'inline-block', width: '150px'}}
                date={this.state.startDate} // momentPropTypes.momentObj or null
                onDateChange={this.handleCalendar} // PropTypes.func.isRequired
                focused={this.state.focused} // PropTypes.bool
                onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                numberOfMonths = {1}
                isOutsideRange = {() => {true}}
              />
            </div>
            <div style={{display: 'block', marginTop: '10px'}}>
              <button style={styles.buttonstyles} onClick={this.handleClick}>{Toggle}</button>
            </div>

          </div>
        </div>
        <div style={{display: 'block', height: '80%', width: '100%', minHeight: '500px'}}>
          <Charts filteredobject = {nameprojectObj} isProjectView = {this.state.isProjectView} date={this.state.date} projectfilters = {projectfilters} namefilters = {namefilters}/>
        </div>
      </div>
    );
  }
}

export default Radium(ChartsContainer);
