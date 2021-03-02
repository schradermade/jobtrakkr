import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

class App extends Component {
  state = { 
    isLoading : false,
    jobs : [
      {
        "id" : "1",
        "CompanyName" : "Ebay",
        "Position" : "Sales",
        "Location" : "California"
      },

      {
        "id" : "2",
        "CompanyName" : "Reddit",
        "Position" : "Moderator",
        "Location" : "Washington"
      },

      {
        "id" : "3",
        "CompanyName" : "Amazon",
        "Position" : "Sorter",
        "Location" : "Oregon"
      }
    ]
  }

  render() {
    const isLoading = this.state.isLoading;
    const allJobs = this.state.jobs;

    if (isLoading) {
      return(
        <div>Loading...</div>
      );
    }

    let jobs = allJobs.map(job => {
      <tr key={job.Id}>
        <td>{job.CompanyName}</td>
        <td>{job.Position}</td>
        <td>{job.Location}</td>
      </tr>
    }
    )

    return ( 
      <div className='container border border-secondary rounded center'>
        <div className='row'>
          <div className='col-12'>
            <h4>Pending Application Response</h4>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12 center text-center'>
            <Table dark responsive striped bordered hover>
              <thead>
                <th>Company Name</th>
                <th>Position</th>
                <th>Location</th>
                <th colSpan='4'>Actions</th>
              </thead>

              <tbody>
                { this.state.jobs.length === 0 ? <td colSpan='7'>No pending Applications.</td> : jobs}
              </tbody>
            </Table>
          </div>
        </div>

      </div>
    );
  }
}

export default App;