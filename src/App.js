import IssueAdd from './IssueAdd';

class IssueFilter extends React.Component {
    render() {
        return (
            <div>This is a placeholder for the Issue Filter.</div>
        );
    }
}

const IssueRow = (props) => {
    const {_id, status, owner, created, effort, completionDate, title} = props.issue;

    return (
        <tr>
            <td>{ _id }</td>
            <td>{ status }</td>
            <td>{ owner }</td>
            <td>{ created.toDateString() }</td>
            <td>{ effort }</td>
            <td>{ completionDate ? completionDate.toDateString() : '' }</td>
            <td>{ title }</td>
        </tr>
    );
}

const IssueTable = (props) => {
    const issueRows = props.issues.map(issue => <IssueRow key={issue._id} issue={issue} />);

    return (
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Created</th>
                    <th>Effort</th>
                    <th>Completion Date</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>{ issueRows }</tbody>
        </table>
    );
}

class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] }
        this.createIssue = this.createIssue.bind(this);
    }

    createIssue(newIssue) {
        fetch('/api/issues', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newIssue)

        }).then( response => {
            if(response.ok){
                response.json().then(updatedIssue => {
                    updatedIssue.created = new Date(updatedIssue.created);
                    if(updatedIssue.completionDate) {
                        updatedIssue.completionDate = new Date(updatedIssue.completionDate);
                    }
    
                    const newIssues = this.state.issues.concat(updatedIssue);
                    this.setState({ issues: newIssues });
                })
                
            } else {
                response.json().then(err => {
                    alert(`Failed to add issue: ${err.message}`);
                });
            }
        })
            
            .catch(err => {
                console.log(`Error in sending data to the server: ${err.message}`)
            })
    }

    loadData() {
        fetch('/api/issues')
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        const {records, _metadata: {total_count}} = data;
                        
                        console.log(`Total count of records: ${total_count}`);
        
                        records.forEach(issue => {
                            issue.created = new Date(issue.created);
                            if (issue.completionDate) {
                                issue.completionDate = new Date(issue.completionDate);
                            }
                        });
        
                        this.setState({ issues: records });
                    });
                } else {
                    response.json().then(err => {
                        alert('Failed to fetch issues: ' + error.message);
                    });
                }
            }).catch(err => {
               alert('Error in fetching data from server:', err);
            });
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        
        return (
            <div>
                <h1>TIssue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues} />
                <hr />
                <IssueAdd createIssue={this.createIssue}/>
            </div>
        );
    }
}

ReactDOM.render(
<IssueList />,
document.getElementById('root')
);
