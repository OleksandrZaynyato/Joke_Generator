import { fetchUtils } from 'react-admin';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const httpClient = fetchUtils.fetchJson;

const dataProvider = {
    getList: (resource, params) => {
        const url = `${API_URL}/${resource}`;

        return httpClient(url).then(({ headers, json }) => {
            let filteredData = json;

            // Фільтрація за статусом accepted
            if (params.filter && params.filter.accepted && params.filter.accepted !== 'all') {
                const acceptedStatus = params.filter.accepted === 'true';
                filteredData = json.filter(item => item.accepted === acceptedStatus);
            }

            return {
                data: filteredData,
                total: filteredData.length,
            };
        });
    },

    getOne: (resource, params) =>
        httpClient(`${API_URL}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${API_URL}/${resource}?${fetchUtils.queryParameters(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${API_URL}/${resource}?${fetchUtils.queryParameters(query)}`;
        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    update: (resource, params) =>
        httpClient(`${API_URL}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: json,
        })),

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${API_URL}/${resource}?${fetchUtils.queryParameters(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) =>
        httpClient(`${API_URL}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    delete: (resource, params) =>
        httpClient(`${API_URL}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({
            data: json,
        })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${API_URL}/${resource}?${fetchUtils.queryParameters(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    }
};

export default dataProvider;