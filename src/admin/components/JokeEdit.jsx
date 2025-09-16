import {Edit, SimpleForm, TextInput, NumberInput, BooleanInput} from 'react-admin';

export const JokeEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="setup" label="Setup" fullWidth multiline/>
            <TextInput source="punchline" label="Punchline" fullWidth multiline/>
            <BooleanInput source={"accepted"} label="Accepted" />
        </SimpleForm>
    </Edit>
);