import { useUpdate, useNotify, useRefresh, Button } from 'react-admin';

export const QuickAcceptButton = ({ record }) => {
    const [update] = useUpdate();
    const notify = useNotify();
    const refresh = useRefresh();

    const handleClick = () => {
        update('jokes', { id: record.id, data: { accepted: true } })
            .then(() => {
                notify('Жарт підтверджено!', { type: 'success' });
                refresh();
            })
            .catch(() => notify('Помилка!', { type: 'error' }));
    };

    return (
        <Button 
            label="Підтвердити"
            onClick={handleClick}
            sx={{ 
                color: '#4CAF50',
                '&:hover': { backgroundColor: 'rgba(76, 175, 80, 0.1)' }
            }}
        >
            ✅
        </Button>
    );
};

export const QuickRejectButton = ({ record }) => {
    const [update] = useUpdate();
    const notify = useNotify();
    const refresh = useRefresh();

    const handleClick = () => {
        update('jokes', { id: record.id, data: { accepted: false } })
            .then(() => {
                notify('Жарт відхилено!', { type: 'warning' });
                refresh();
            })
            .catch(() => notify('Помилка!', { type: 'error' }));
    };

    return (
        <Button 
            label="Відхилити"
            onClick={handleClick}
            sx={{ 
                color: '#f44336',
                '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.1)' }
            }}
        >
            ❌
        </Button>
    );
};