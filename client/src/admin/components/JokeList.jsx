import { 
    List, 
    Datagrid, 
    TextField, 
    DateField,
    Filter,
    SelectInput,
    FunctionField
} from 'react-admin';

// Простий фільтр
const JokeFilter = (props) => (
    <Filter {...props}>
        <SelectInput
            source="accepted"
            choices={[
                { id: 'all', name: 'Всі жарти' },
                { id: 'true', name: 'Підтверджені' },
                { id: 'false', name: 'Не підтверджені' },
            ]}
            defaultValue="all"
        />
    </Filter>
);

export const JokeList = (props) => (
    <List 
        {...props} 
        filters={<JokeFilter />}
        title="Жарти"
    >
        <Datagrid rowClick="edit">
            <TextField source="id" label="ID" />
            <TextField source="setup" label="Заголовок" />
            <TextField source="punchline" label="Контент" />
            <FunctionField
                label="Статус"
                render={record => (
                    <span style={{
                        color: record.accepted ? '#4CAF50' : '#f44336',
                        fontWeight: 'bold'
                    }}>
                        {record.accepted ? '✅' : '❌'}
                    </span>
                )}
            />
            <TextField source="submittedBy" label="Автор" />
            <DateField source="createdAt" label="Дата" showTime />
        </Datagrid>
    </List>
);