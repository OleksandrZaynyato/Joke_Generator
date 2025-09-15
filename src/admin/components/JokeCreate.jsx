import { Create, SimpleForm, TextInput, NumberInput } from 'react-admin';

export const JokeCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" label="Назва" fullWidth />
            <TextInput source="content" label="Зміст" fullWidth multiline />
            <TextInput source="category" label="Категорія" />
            <NumberInput source="likes" label="Лайки" defaultValue={0} />
        </SimpleForm>
    </Create>
);