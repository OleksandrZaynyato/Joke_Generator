import { List, Datagrid, TextField, NumberField, BooleanField, DateField } from 'react-admin';

export const JokeList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="setup" label="Setup" />
      <TextField source="punchline" label="Punchline" />
      <BooleanField source="accepted" label="Accepted" />
      <TextField source="submittedBy" label="Author" />
      <DateField source="createdAt" label="Created" showTime />
    </Datagrid>
  </List>
);