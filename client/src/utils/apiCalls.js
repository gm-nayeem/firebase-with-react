import {publicRequest} from './makeRequest';

export const createFolder = async (parentId, foldername) => {
    try {
        const res = await publicRequest.post('/folders/create', {
            parentId,
            foldername
        });
        console.log("create: ", res.data);
        return res.data;
    } catch (err) {
        console.log('Create error: ', err?.response?.data?.message);
    }
};

export const getFolders = async () => {
    try {
        const res = await publicRequest.get('/folders/all');
        return res.data;
    } catch (err) {
        console.log('Fetch error', err);
    }
};

export const deleteFolder = async () => {
    try {
        const res = await publicRequest.delete(`/folders/${id}`);
        console.log("delete: ", res.data);
    } catch (err) {
        console.log('Delete error', err);
    }
};
