import { Card, CardContent, Typography } from '@mui/material';

const Dashboard = () => (
    <Card>
        <CardContent>
            <Typography variant="h5" component="h2">
                Панель адміністратора Joke Generator
            </Typography>
            <Typography color="textSecondary">
                Ласкаво просимо до панелі управління
            </Typography>
        </CardContent>
    </Card>
);

export default Dashboard;