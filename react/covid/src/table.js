import React from 'react';
import MaterialTable from 'material-table';

export default class Table extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        { title: 'Name', field: 'name' },
        { title: 'Cases', field: 'value' }
      ],
      data: props.data[0],

    }
  }

  render() {
    console.log(this.props.data)
    var sample = [{
      "name": "Erode",
      "value": 19
    }]


    return (
      <MaterialTable
        title="District wise cases"
        columns={this.state.columns}
        data={this.props.data}

      />
    );
  }
}