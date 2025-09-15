import { Edit, SimpleForm, TextInput, NumberInput } from 'react-admin';

export const JokeEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="title" label="Назва" fullWidth />
            <TextInput source="content" label="Зміст" fullWidth multiline />
            <TextInput source="category" label="Категорія" />
            <NumberInput source="likes" label="Лайки" />
        </SimpleForm>
    </Edit>
);