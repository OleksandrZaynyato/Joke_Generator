import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider/dataProvider';
import { JokeList } from './components/JokeList';

const AdminApp = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="jokes" list={JokeList} />
  </Admin>
);

export default AdminApp;