

class IssueFilter extends React.Component {
    render() {
        return (
            <div>This is a placeholder for the Issue Filter.</div>
        );
    }
}

class IssueRow extends React.Component {
    render() {
        const {id, status, owner, created, effort, completionDate, title} = this.props.issue;

        return (
            <tr>
                <td>{ id }</td>
                <td>{ status }</td>
                <td>{ owner }</td>
                <td>{ created.toDateString() }</td>
                <td>{ effort }</td>
                <td>{ completionDate ? completionDate.toDateString() : '' }</td>
                <td>{ title }</td>
            </tr>
        );
    }
}

class IssueTable extends React.Component {
    render() {
        const issueRows = this.props.issues.map(issue => <IssueRow key={issue.id} issue={issue} />);

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
}

class IssueAdd extends React.Component {
    render() {
        return (
            <div>This is a placeholder for the Issue Add entry form.</div>
        );
    }
}

class IssueList extends React.Component {
    render() {
        const issues = [
            {
                id: 1,
                status: 'Open',
                owner: 'Ravan',
                created: new Date('2016-08-15'),
                effort: 5,
                completionDate: undefined,
                title: 'Error in console when clicking Add'
            },
            {
                id: 2,
                status: 'Assigned',
                owner: 'Eddie',
                created: new Date('2016-08-16'),
                effort: 14,
                completionDate: new Date('2016-08-30'),
                title: 'Missing bottom border on panel'
            }
        ];
        return (
            <div>
                <h1>TIssue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={issues} />
                <hr />
                <IssueAdd />
            </div>
        );
    }
}

ReactDOM.render(
<IssueList />,
document.getElementById('root')
);
