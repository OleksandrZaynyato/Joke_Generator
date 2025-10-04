import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput
} from 'react-admin';

export const JokeCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="setup" label="Заголовок" fullWidth multiline/>
            <TextInput source="punchline" label="Контент" fullWidth multiline/>
            <BooleanInput source="accepted" label="Підтверджено" />
        </SimpleForm>
    </Create>
);