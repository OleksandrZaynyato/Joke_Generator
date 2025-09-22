import {Create, SimpleForm, TextInput, NumberInput, BooleanInput} from 'react-admin';

export const JokeCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="setup" label="Setup" fullWidth multiline/>
            <TextInput source="punchline" label="Punchline" fullWidth multiline/>
            <BooleanInput source={"accepted"} label="Accepted" />
        </SimpleForm>
    </Create>
);