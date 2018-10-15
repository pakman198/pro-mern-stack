import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormControl, Button } from 'react-bootstrap';

class IssueAdd extends React.Component {
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.issueAdd;
    const { createIssue } = this.props;

    createIssue({
      owner: form.owner.value,
      title: form.title.value,
      status: 'New',
      created: new Date()
    });

    form.owner.value = "";
    form.title.value = "";
  }
  render() {
    return (
      <Form inline name="issueAdd" onSubmit={this.handleSubmit}>
        <FormControl name="owner" placeholder="Owner" />
        { ' ' }
        <FormControl name="title" placeholder="Title" />
        { ' ' }
        <Button type="submit" bsStyle="primary">Add</Button>
      </Form>
    );
  }
}

IssueAdd.propTypes = {
  createIssue: PropTypes.func.isRequired
}

export default IssueAdd;