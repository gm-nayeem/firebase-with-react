import React, { useEffect, useState } from 'react';
import './folderStructure.scss';
import { BiDownArrow } from 'react-icons/bi';
import { BiRightArrow } from 'react-icons/bi';

import {
    createFolder, deleteFolder, getFolders
} from '../utils/apiCalls';

const folderStructure = () => {
    // initial state 
    const [folders, setFolders] = useState([]);

    // fetch all the folders
    useEffect(() => {
        const fetchFolders = async () => {
            const res = await getFolders();
            res?.success && setFolders(res?.folders);
        }
        fetchFolders();
    }, []);

    // state to get folder name from input field
    const [folderName, setFolderName] = useState('');

    // state for expand parent folder
    const [parentId, setParentId] = useState([]);
    const toggleFolder = (id) => {
        if (parentId.includes(id)) {
            setParentId(prev => {
                return prev.filter(child => child !== id);
            });
        } else {
            setParentId(prev => [...prev, id]);
        }
    };
    const isActive = (id) => {
        if (parentId.includes(id)) return true;

        return false;
    }

    // state for add new folder
    const [folderId, setFolderId] = useState('');
    const [showAddContainer, setShowAddContainer] = useState(false);

    // state for delete a folder
    const [folderInfo, setFolderInfo] = useState({
        folderName: '',
        folderId: ''
    });
    const [showDeleteContainer, setShowDeleteContainer] = useState(false);


    // add folder
    const addFolderById = (arr, targetId, newFolder) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]._id === targetId) {
                if (arr[i].subfname) {
                    arr[i].subfname.push(newFolder);
                    return true;
                }
            }
            if (arr[i].subfname) {
                if (addFolderById(arr[i].subfname, targetId, newFolder)) {
                    return true;
                }
            }
        }
        return false;
    };
    const handleAddFolder = async () => {
        if (!folderName) return alert("The folder name cann't be empty!");
        if (!folderId) return alert("The folder id cann't be empty!");

        setShowAddContainer(false);

        const res = await createFolder(folderId, folderName);

        if (!res?.success) {
            return alert('Something went wrong!');
        }

        const updatedArray = [...folders];

        if (folderId === 'root') {
            updatedArray.push(res?.folder);
            setFolders(updatedArray);
        }
        addFolderById(updatedArray, folderId, res?.folder);
        setFolders(updatedArray);
    };

    // remove folder
    const removeFolderById = (arr, targetId) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]._id === targetId) {
                arr.splice(i, 1);
                return true;
            }
            if (arr[i].subfname.length > 0) {
                if (removeFolderById(arr[i].subfname, targetId)) {
                    return true;
                }
            }
        }
        return false;
    }
    const handleDelete = async () => {
        if (!folderInfo.folderId) return alert('Folder id must be required!');

        setShowDeleteContainer(false);

        const res = await deleteFolder(folderInfo.folderId);
        if (!res?.success) {
            return alert('Something went wrong!');
        }

        const updatedArray = [...folders];

        removeFolderById(updatedArray, folderInfo.folderId);
        setFolders(updatedArray);
    };

    // render folders
    const renderFolder = (subfname) => {
        return (
            <ul>
                {
                    subfname.map(sf => (
                        <li key={sf._id}>
                            <div className="folder">
                                <div className='title' onClick={() => toggleFolder(sf._id)}>
                                    {
                                        isActive(sf._id) ? (
                                            <BiDownArrow className='icon' />
                                        ) : (
                                            <BiRightArrow className='icon' />
                                        )
                                    }
                                    <div className="folder-name">{sf.fname}</div>
                                </div>

                                <button onClick={() => {
                                    setFolderId(sf._id)
                                    setShowDeleteContainer(false)
                                    setShowAddContainer(!showAddContainer)
                                }}>+New</button>
                                <button onClick={() => {
                                    setFolderInfo({
                                        folderName: sf.fname,
                                        folderId: sf._id
                                    })
                                    setShowAddContainer(false)
                                    setShowDeleteContainer(!showDeleteContainer)
                                }}>Delete</button>
                            </div>
                            {
                                sf.subfname?.length > 0 && isActive(sf._id) ? (
                                    renderFolder(sf.subfname)
                                ) : (
                                    isActive(sf._id) ? (
                                        <ul>
                                            <li>- No folders</li>
                                        </ul>
                                    ) : null
                                )
                            }
                        </li>
                    ))
                }
            </ul>
        )
    }

    return (
        <div className='folder-container'>
            <div className="folder">
                <div className="title" onClick={() => toggleFolder('root')}>
                    {
                        isActive('root') ? (
                            <BiDownArrow className='icon' />
                        ) : (
                            <BiRightArrow className='icon' />
                        )
                    }
                    <div className="folder-name">Root</div>
                </div>
                <button onClick={() => {
                    setFolderId('root')
                    setShowDeleteContainer(false)
                    setShowAddContainer(!showAddContainer)
                }}>+New</button>
            </div>

            <ul>
                {
                    isActive('root') && folders.length > 0 ? (
                        folders.map(folder => (
                            <li key={folder._id}>
                                <div className="folder">
                                    <div className="title" onClick={() => toggleFolder(folder._id)}>
                                        {
                                            isActive(folder._id) ? (
                                                <BiDownArrow className='icon' />
                                            ) : (
                                                <BiRightArrow className='icon' />
                                            )
                                        }
                                        <div className="folder-name">{folder.fname}</div>
                                    </div>

                                    <button onClick={() => {
                                        setFolderId(folder._id)
                                        setShowDeleteContainer(false)
                                        setShowAddContainer(!showAddContainer)
                                    }}>+New</button>
                                    <button onClick={() => {
                                        setFolderInfo({
                                            folderName: folder.fname,
                                            folderId: folder._id
                                        })
                                        setShowAddContainer(false)
                                        setShowDeleteContainer(!showDeleteContainer)
                                    }}>Delete</button>
                                </div>
                                {
                                    folder?.subfname?.length > 0 && isActive(folder._id) ? (
                                        renderFolder(folder?.subfname)
                                    ) : (
                                        isActive(folder._id) ? (
                                            <ul>
                                                <li>- No folders</li>
                                            </ul>
                                        ) : null
                                    )
                                }
                            </li>
                        ))
                    ) : (
                        isActive('root') ? (
                            <li>- No folders</li>
                        ) : null
                    )
                }
            </ul>

            <div className={`form ${showAddContainer ? 'active' : ''}`}>
                <input
                    type="text"
                    placeholder='Enter a folder name'
                    onChange={(e) => setFolderName(e.target.value)}
                />
                <div className="btns">
                    <button onClick={() => setShowAddContainer(false)}>Cancel</button>
                    <button onClick={handleAddFolder}>Create</button>
                </div>
            </div>

            <div className={`delete-btns ${showDeleteContainer ? 'active' : ''}`}>
                <h4>Delete {`"${folderInfo.folderName}"`}</h4>
                <div className="btns">
                    <button onClick={() => setShowDeleteContainer(false)}>Cancel</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default folderStructure;





// initial state 
// const [folders, setFolders] = useState([
//     {
//         id: 1,
//         name: 'Folder 1',
//         subfolders: [
//             {
//                 id: 2,
//                 name: 'Subfolder 1.1',
//                 subfolders: [
//                     {
//                         id: 3,
//                         name: 'Subfolder 1.1.1',
//                         subfolders: [
//                             {
//                                 id: 4,
//                                 name: 'Subfolder 1.1.1.1',
//                                 subfolders: [],
//                             },
//                             {
//                                 id: 5,
//                                 name: 'Subfolder 1.1.1.2',
//                                 subfolders: [],
//                             }
//                         ],
//                     },
//                     {
//                         id: 6,
//                         name: 'Subfolder 1.1.2',
//                         subfolders: [],
//                     },
//                 ],
//             },
//             {
//                 id: 7,
//                 name: 'Subfolder 1.2',
//                 subfolders: [],
//             },
//             {
//                 id: 8,
//                 name: 'Subfolder 1.3',
//                 subfolders: [],
//             },
//         ],
//     },
//     {
//         id: 9,
//         name: 'Folder 2',
//         subfolders: [],
//     },
//     {
//         id: 10,
//         name: 'Folder 3',
//         subfolders: [],
//     },
// ]);