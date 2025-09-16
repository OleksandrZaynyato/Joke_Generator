// src/dataProvider.ts
import { DataProvider, fetchUtils } from "ra-data-simple-rest";

const apiUrl = "http://localhost:3000/api";
const httpClient = fetchUtils.fetchJson;

export const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;
        const { json } = await httpClient(url);

        const data = json.map((item: any) => ({
            ...item,
            id: item._id, // обов’язкове поле для React Admin
        }));

        return {
            data,
            total: data.length, // поки що рахуємо просто довжину масиву
        };
    },

    getOne: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        const { json } = await httpClient(url);

        return {
            data: {
                ...json,
                id: json._id,
            },
        };
    },

    create: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;
        const { json } = await httpClient(url, {
            method: "POST",
            body: JSON.stringify(params.data),
        });

        return {
            data: {
                ...json,
                id: json._id,
            },
        };
    },

    update: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        const { json } = await httpClient(url, {
            method: "PUT",
            body: JSON.stringify(params.data),
        });

        return {
            data: {
                ...json,
                id: json._id,
            },
        };
    },

    delete: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        const { json } = await httpClient(url, {
            method: "DELETE",
        });

        return {
            data: {
                ...json,
                id: json._id,
            },
        };
    },

    // поки можна повернути "заглушки" для інших методів
    getMany: () => Promise.resolve({ data: [] }),
    getManyReference: () => Promise.resolve({ data: [], total: 0 }),
    deleteMany: () => Promise.resolve({ data: [] }),
    updateMany: () => Promise.resolve({ data: [] }),
};
