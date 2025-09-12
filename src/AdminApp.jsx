import {Admin, Resource, ListGuesser} from 'react-admin';
import jsonSrverProvider from 'ra-datajson-server';
const dataProvider = jsonSrverProvider('http://localhost:3000');

const AdminApp = () =>(
    <Admin dataProvider = {dataProvider}>
        <Resource name = "jokes" list ={ListGuesser}/>
    </Admin>
);

export default AdminApp