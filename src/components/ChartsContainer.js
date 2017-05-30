import React from 'react'
import Charts from './Charts'
import nameproject from './nameproject.json'
import Radium from 'radium'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment'
import logo from './logo.png'



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
      isPipeline: false,
      isProjectView: true,
      date: 'May-5-2017',
      startDate: moment(),
      focused: false,
      true: true,
    }
  }
  handleClick = () => {
    this.setState({isProjectView: !this.state.isProjectView});
    console.log(this.state.startDate.getMonth)
  }
  handleChange = (e) => {
    this.setState({value: e.target.value});
  }
  handleSubmit = (e) => {
    this.setState({ date: this.state.value})
    e.preventDefault()
  }
  handleCalendar = (date) => {
    this.setState({
      date: date.clone().isoWeekday(5).format('MMM-D-YYYY'),
      startDate: date,
    });
  }
  render() {
    var projectfilters = nameproject[this.state.date].project.map((a, index) =>
    <Bar dataKey={a.project} stackId='stack' fill={colors[index]} isAnimationActive={false}/>
  );
  var namefilters = nameproject[this.state.date].name.map((a, index) =>
  <Bar key={index} dataKey={a.name} stackId='stack' fill={colors[index]} isAnimationActive={false}/>
);
const Toggle = this.state.isProjectView ? 'Project View' : 'Name View'

return (

  <div style={styles.containerstyles}>
    <div style ={styles.topbar}>
      <div style= {styles.blueberry}>
        <img src={logo} style={{maxWidth: '260px', height: 'auto', }}/>
      </div>
      <div style={styles.datepicker}>
        <div style={{width: '150px', margin: 'auto'}}>
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
      <Charts isProjectView = {this.state.isProjectView} date={this.state.date} projectfilters = {projectfilters} namefilters = {namefilters}/>
    </div>
  </div>
);
}
}

export default Radium(ChartsContainer);
