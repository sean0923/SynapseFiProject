import React from 'react';
import { Table } from 'semantic-ui-react';

const TableOfUsers = ({ allUsers }) => (
  <Table celled selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Notes</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {allUsers.map((user) => {
        return (
          <Table.Row>
            <Table.Cell>{user.legal_names[0]}</Table.Cell>
            <Table.Cell>Approved</Table.Cell>
            <Table.Cell textAlign='right'>None</Table.Cell>
          </Table.Row>
        );
      })}
    </Table.Body>
  </Table>
);

export default TableOfUsers;