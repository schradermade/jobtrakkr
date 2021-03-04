import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faGlobe, faMoneyCheckAlt, faSearchDollar, faFileContract, faBuilding } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
  state = {
    isLoading : false,
    jobs : []
  }
      // {
      //   "id" : "1",
      //   "CompanyName" : "Ebay",
      //   "JobTitle" : "Sales",
      //   "Location" : "California",
      //   "WhereWork": "remote",
      //   "JobLink" : "https://www.ebay.com",
      //   "CoverLetterLink" : "https://docs.google.com/document/d/1kreMCCgfnh947-n8DB29ExRcF3MeL29ZCQmodDn3ltk/edit?usp=sharing",
      //   "ResumeLink" : "https://www.google.com",
      //   "Status" : "pending"
      // },

      // {
      //   "id" : "2",
      //   "CompanyName" : "Reddit",
      //   "JobTitle" : "Moderator",
      //   "Location" : "Washington",
      //   "WhereWork": "onsite",
      //   "JobLink" : "https://www.reddit.com",
      //   "CoverLetterLink" : "https://docs.google.com/document/d/1kreMCCgfnh947-n8DB29ExRcF3MeL29ZCQmodDn3ltk/edit?usp=sharing",
      //   "ResumeLink" : "https://www.google.com",
      //   "Status" : "pending"
      // },

      // {
      //   "id" : "3",
      //   "CompanyName" : "Amazon",
      //   "JobTitle" : "Sorter",
      //   "Location" : "Oregon",
      //   "WhereWork": "remote",
      //   "JobLink" : "https://www.amazon.com",
      //   "CoverLetterLink" : "https://docs.google.com/document/d/1kreMCCgfnh947-n8DB29ExRcF3MeL29ZCQmodDn3ltk/edit?usp=sharing",
      //   "ResumeLink" : "https://www.google.com",
      //   "Status" : "pending"
      // }
    
  

  remove(id) {
    let updatedJobs = [...this.state.jobs].filter (i => i.id !== id)
    this.setState({jobs : updatedJobs });
  }

  redirect(id) {
    let job = [...this.state.jobs].filter (i => i.id === id);
    let url = job[0].JobLink;
    window.open(url);
  }

  redirectCoverLetter(id) {
    let job = [...this.state.jobs].filter (i => i.id === id);
    let url = job[0].CoverLetterLink;
    window.open(url);
  }

  redirectResume(id) {
    let job = [...this.state.jobs].filter (i => i.id === id);
    let url = job[0].ResumeLink;
    window.open(url);
  }

  firstRound(id) {
    let job = this.state.jobs.filter (i => i.id === id);
    job[0].Status = "firstRound";
    let updatedJobs = [...this.state.jobs];
    this.setState({jobs : updatedJobs });
  }

  secondRound(id) {
    let job = this.state.jobs.filter (i => i.id === id);
    job[0].Status = "secondRound";
    let updatedJobs = [...this.state.jobs];
    this.setState({jobs : updatedJobs });
  }

  async componentDidMount() {
    const response = await fetch('https://ykj97o48ek.execute-api.us-west-2.amazonaws.com/development');
    const body = await response.json();
    this.setState({ jobs:body, isLoading:false })
  }

  render() {
    const isLoading = this.state.isLoading;
    const allJobs = this.state.jobs;
    const firstRoundJobs = this.state.jobs;
    const secondRoundJobs = this.state.jobs;
  
    if (isLoading) {
      return(
        <div>Loading...</div>
      );
    }
    <h1>jobtrakkr - a place to track your job applications.</h1>
    // Applied jobs - No Response
    let jobs = 
    allJobs.map(job => {
      if (job.Status === "pending") {
        return <tr key={job.Id}>
                  <td>{job.CompanyName}</td>
                  <td>{job.JobTitle}</td>
                  <td>{job.Location}</td>
                  { job.WhereWork === "remote" ? <td><FontAwesomeIcon icon={faGlobe} /> Remote</td> : <td><FontAwesomeIcon icon={faBuilding} /> <br/>OnSite</td>}
                  <td><Button className='btn btn-lg btn-success' onClick={() => this.firstRound(job.id)}> <FontAwesomeIcon icon={faThumbsUp} /> <br/></Button></td>
                  <td><Button className='btn btn-lg btn-danger' onClick={() => this.remove(job.id)}> <FontAwesomeIcon icon={faThumbsDown} /> </Button></td>
                  <td><Button className='btn btn-lg btn-warning' onClick={() => this.redirect(job.id)}> <FontAwesomeIcon icon={faMoneyCheckAlt} /> </Button></td>
                  <td><Button className='btn btn-lg btn-info' onClick={() => this.redirectResume(job.id)}> <FontAwesomeIcon icon={faFileContract} /> </Button></td>
                  <td><Button className='btn btn-lg btn-info' onClick={() => this.redirectCoverLetter(job.id)}> <FontAwesomeIcon icon={faFileContract} /> </Button></td>
                </tr>
        }
      }
    )
    // Applied jobs - first round interview
    let jobs2 = 
    firstRoundJobs.map(job => {
      if (job.Status === "firstRound") {
        return <tr key={job.Id}>
                  <td>{job.CompanyName}</td>
                  <td>{job.JobTitle}</td>
                  <td>{job.Location}</td>
                  { job.WhereWork === "remote" ? <td><FontAwesomeIcon icon={faGlobe} /> Remote</td> : <td><FontAwesomeIcon icon={faBuilding} /> OnSite</td>}
                  <td><Button className='btn btn-lg btn-success' onClick={() => this.secondRound(job.id)}> <FontAwesomeIcon icon={faThumbsUp} /> <br/> </Button></td>
                  <td><Button className='btn btn-lg btn-danger' onClick={() => this.remove(job.id)}> <FontAwesomeIcon icon={faThumbsDown} /> </Button></td>
                  <td><Button className='btn btn-lg btn-warning' onClick={() => this.redirect(job.id)}> <FontAwesomeIcon icon={faMoneyCheckAlt} /> </Button></td>
                  <td><Button className='btn btn-lg btn-info' onClick={() => this.redirectResume(job.id)}> <FontAwesomeIcon icon={faFileContract} /> </Button></td>
                  <td><Button className='btn btn-lg btn-info' onClick={() => this.redirectCoverLetter(job.id)}> <FontAwesomeIcon icon={faFileContract} /> </Button></td>
                </tr>
        }
      }
    )
    // Applied jobs - second round interview
    let jobs3 = 
    secondRoundJobs.map(job => {
      if (job.Status === "secondRound") {
        return <tr key={job.Id}>
                  <td>{job.CompanyName}</td>
                  <td>{job.JobTitle}</td>
                  <td>{job.Location}</td>
                  { job.WhereWork === "remote" ? <td><FontAwesomeIcon icon={faGlobe} /> Remote</td> : <td><FontAwesomeIcon icon={faBuilding} /> OnSite </td>}
                  <td><Button className='btn btn-lg btn-success' onClick={() => this.remove(job.id)}> <FontAwesomeIcon icon={faThumbsUp} /><br/></Button></td>
                  <td><Button className='btn btn-lg btn-danger' onClick={() => this.remove(job.id)}> <FontAwesomeIcon icon={faThumbsDown} /></Button></td>
                  <td><Button className='btn btn-lg btn-warning' onClick={() => this.redirect(job.id)}> <FontAwesomeIcon icon={faMoneyCheckAlt} /> </Button></td>
                  <td><Button className='btn btn-lg btn-info' onClick={() => this.redirectResume(job.id)}> <FontAwesomeIcon icon={faFileContract} /> </Button></td>
                  <td><Button className='btn btn-lg btn-info' onClick={() => this.redirectCoverLetter(job.id)}> <FontAwesomeIcon icon={faFileContract} /> </Button></td>
                </tr>
        }
      }
    )

    return ( 
      <>
        {/* Applied jobs - No Response */}
        <div className='container border border-secondary rounded center'>
          <div className='row'>
            <div className='col-12'>
              <h4>Jobs I've Applied to</h4>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-12 center text-center'>
              <Table dark responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>Job Title</th>
                    <th>Location</th>
                    <th>Work From</th>
                    <th>Advance<br/> First Round</th>
                    <th>Denial</th>
                    <th>Job Posting</th>
                    <th>Resume</th>
                    <th>Cover<br/> Letter URL</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.jobs.length === 0 ? <td colSpan='8'>No pending Applications.</td> : jobs}
                </tbody>
              </Table>
            </div>
          </div>
        </div>

        <hr/>
        {/* Applied jobs - first round interview */}
        <div className='container border border-secondary rounded center'>
          <div className='row'>
            <div className='col-12'>
              <h4>Accepted for First Round</h4>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-12 center text-center'>
              <Table dark responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>Job Title</th>
                    <th>Location</th>
                    <th>Work From</th>
                    <th>Advance<br/> Second Round</th>
                    <th>Denial</th>
                    <th>Job Posting</th>
                    <th>Resume</th>
                    <th>Cover<br/>Letter URL</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.jobs.length === 0 ? <td colSpan='8'>No pending Applications.</td> : jobs2}
                </tbody>
              </Table>
            </div>
          </div>
        </div>

        <hr/>
        {/* Applied jobs - second round interview */}
        <div className='container border border-secondary rounded center'>
          <div className='row'>
            <div className='col-12'>
              <h4>Accepted for Second Round</h4>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-12 center text-center'>
              <Table dark responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>Job Title</th>
                    <th>Location</th>
                    <th>Work From</th>
                    <th>Advance<br/> Third Round</th>
                    <th>Denial</th>
                    <th>Job Posting</th>
                    <th>Resume</th>
                    <th>Cover<br/>Letter URL</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.jobs.length === 0 ? <td colSpan='8'>No pending Applications.</td> : jobs3}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;