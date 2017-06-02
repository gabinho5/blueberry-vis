import React from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const styles = {
  size: {
    fontSize: 12,
  },
}

class Charts extends React.Component{
  constructor(props){
    super(props);

  }

  render() {
    return(
      <ResponsiveContainer height='100%' width='100%'>
        <BarChart style = {styles.size} data={this.props.isProjectView ? this.props.filteredobject.project : this.props.filteredobject.name}
          margin={{top: 60, right: 60, left: 60, bottom: 130}}>
          <XAxis interval={0} angle={-45} textAnchor='end' dataKey={this.props.isProjectView ? 'project' : 'name'} style={{fontSize: 12}}/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend iconSize={8} iconType='circle' verticalAlign='top' height={60}/>
          {this.props.isProjectView ? this.props.namefilters : this.props.projectfilters}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default Charts;
