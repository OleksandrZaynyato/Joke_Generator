import { List, Datagrid, TextField, NumberField, BooleanField, DateField } from 'react-admin';

export const JokeList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="title" label="Заставка" />
      <TextField source="content" label="Кульмінація" />
      <TextField source="category" label="Категорія" />
      <NumberField source="likes" label="Лайки" />
      <BooleanField source="accepted" label="Прийнятий" />
      <TextField source="submittedBy" label="Автор" />
      <DateField source="createdAt" label="Створено" showTime />
    </Datagrid>
  </List>
);