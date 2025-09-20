import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider/dataProvider';
import { JokeList } from './components/JokeList';
import {JokeEdit} from "./components/JokeEdit.jsx";
import {JokeCreate} from "./components/JokeCreate.jsx";
import {authProvider} from "./authProvider/authProvider.js";

const AdminApp = () => (
  <Admin basename="/admin" dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="jokes" list={JokeList} edit={JokeEdit} create={JokeCreate}/>
  </Admin>
);

export default AdminApp;