import { Admin, Resource } from 'react-admin';
import { authProvider } from './authProvider/authProvider';
import dataProvider from './dataProvider/dataProvider';
import Dashboard from './components/Dashboard';
import { JokeList } from './components/JokeList';
import { JokeEdit } from './components/JokeEdit';
import { JokeCreate } from './components/JokeCreate';

const AdminApp = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    dashboard={Dashboard}
  >
    <Resource
      name="jokes"
      list={JokeList}
      edit={JokeEdit}
      create={JokeCreate}
    />
  </Admin>
);

export default AdminApp;