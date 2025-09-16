import { Admin, ListGuesser, Resource } from "react-admin";
import { Layout } from "./Layout";
import {dataProvider} from "./dataProvider.ts";

export const App = () => (
    <Admin
        layout={Layout}
        dataProvider={dataProvider}>
        <Resource name={"jokes"} list={ListGuesser}/>
    </Admin>
)