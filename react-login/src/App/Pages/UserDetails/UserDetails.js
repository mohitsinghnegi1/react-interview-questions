import React from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

class UserDetails extends React.Component {
    state = {
        Results: [],
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Email', field: 'email' }
        ]
    }

    componentDidMount() {
      let user = JSON.parse(sessionStorage.getItem('user'));
      let accessToken = user.accessToken;

      axios.get(`/api/get/user`, { headers: {"Authorization" : `Bearer ${accessToken}`} })
        .then(res => {
          const Results = res.data.recordset;
          this.setState({ Results });
        })
    }

  render() {
    return (
      <div style={{ maxWidth: '100%', padding: '50px' }}>
        <MaterialTable
          columns={this.state.columns}
          data={this.state.Results}
          title="User Details"
        />
      </div>
    )
  }
}
export default UserDetails;
