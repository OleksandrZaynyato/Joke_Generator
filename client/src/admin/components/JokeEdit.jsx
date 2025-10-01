import {
    Edit,
    SimpleForm,
    TextInput,
    BooleanInput
} from 'react-admin';

export const JokeEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="setup" label="Заголовок" fullWidth multiline/>
            <TextInput source="punchline" label="Контент" fullWidth multiline/>
            <BooleanInput source="accepted" label="Підтверджено" />
        </SimpleForm>
    </Edit>
);