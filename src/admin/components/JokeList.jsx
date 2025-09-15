import { List, Datagrid, TextField, NumberField, EditButton } from 'react-admin';

export const JokeList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" label="Назва" />
            <TextField source="content" label="Зміст" />
            <TextField source="category" label="Категорія" />
            <NumberField source="likes" label="Лайки" />
            <EditButton />
        </Datagrid>
    </List>
);