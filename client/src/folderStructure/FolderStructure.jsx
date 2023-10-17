import React, { useState } from 'react';
import './folderStructure.scss';
// import { TbTriangleInverted } from 'react-icons/tb';
// import { SlControlPlay } from 'react-icons/sl';
import { BiDownArrow } from 'react-icons/bi';
import { BiRightArrow } from 'react-icons/bi';

const folderStructure = () => {
    const [folders, setFolders] = useState([
        {
            id: 1,
            name: 'Folder 1',
            isOpen: false,
            subfolders: [
                {
                    id: 2,
                    name: 'Subfolder 1.1',
                    isOpen: false,
                    subfolders: [
                        {
                            id: 3,
                            name: 'Subfolder 1.1.1',
                            isOpen: false,
                            subfolders: [
                                {
                                    id: 4,
                                    name: 'Subfolder 1.1.1.1',
                                    subfolders: [],
                                },
                                {
                                    id: 5,
                                    name: 'Subfolder 1.1.1.2',
                                    subfolders: [],
                                }
                            ],
                        },
                        {
                            id: 6,
                            name: 'Subfolder 1.1.2',
                            subfolders: [],
                        },
                    ],
                },
                {
                    id: 7,
                    name: 'Subfolder 1.2',
                    subfolders: [],
                },
                {
                    id: 8,
                    name: 'Subfolder 1.3',
                    subfolders: [],
                },
            ],
        },
        {
            id: 9,
            name: 'Folder 2',
            isOpen: false,
            subfolders: [],
        },
        {
            id: 10,
            name: 'Folder 3',
            isOpen: false,
            subfolders: [],
        },
    ]);

    // get folder name from input field
    const [folderName, setFolderName] = useState('');

    // expand parent folder
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

    // for add new folder
    const [folderId, setFolderId] = useState('');
    const [showAddContainer, setShowAddContainer] = useState(false);

    // for delete a folder
    const [folderInfo, setFolderInfo] = useState({
        folderName: '',
        folderId: ''
    });
    const [showDeleteContainer, setShowDeleteContainer] = useState(false);


    // add folder
    const addFolderById = (arr, targetId, newFolder) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === targetId) {
                if (arr[i].subfolders) {
                    arr[i].subfolders.push(newFolder);
                    return true;
                }
            }
            if (arr[i].subfolders) {
                if (addFolderById(arr[i].subfolders, targetId, newFolder)) {
                    return true;
                }
            }
        }
        return false;
    };
    const handleAddFolder = () => {
        if (!folderName) return alert("The folder name cann't be empty!");

        const updatedArray = [...folders];

        const newFolder = {
            id: 55,
            name: folderName,
            subfolders: [],
        }

        if (!folderId) {
            updatedArray.push(newFolder);
            setFolders(updatedArray);
        }

        addFolderById(updatedArray, folderId, newFolder);
        setFolders(updatedArray);
        setShowAddContainer(false);
    };

    // remove folder
    const removeFolderById = (arr, targetId) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === targetId) {
                arr.splice(i, 1);
                return true;
            }
            if (arr[i].subfolders.length > 0) {
                if (removeFolderById(arr[i].subfolders, targetId)) {
                    return true;
                }
            }
        }
        return false;
    }
    const handleDelete = () => {
        const updatedArray = [...folders];

        if (!folderInfo.folderId) return alert('Folder id must be required!')

        removeFolderById(updatedArray, folderInfo.folderId);
        setFolders(updatedArray);
        setShowDeleteContainer(false);
    };

    // render folders
    const renderFolder = (subFolder) => {
        return (
            <ul>
                {
                    subFolder.map(sf => (
                        <li key={sf.id}>
                            <div className="folder">
                                <div className='title' onClick={() => toggleFolder(sf.id)}>
                                    {
                                        isActive(sf.id) ? (
                                            <BiDownArrow className='icon' />
                                        ) : (
                                            <BiRightArrow className='icon' />
                                        )
                                    }
                                    <div className="folder-name">{sf.name}</div>
                                </div>

                                <button onClick={() => {
                                    setFolderId(sf.id)
                                    setShowDeleteContainer(false)
                                    setShowAddContainer(!showAddContainer)
                                }}>+New</button>
                                <button onClick={() => {
                                    setFolderInfo({
                                        folderName: sf.name,
                                        folderId: sf.id
                                    })
                                    setShowAddContainer(false)
                                    setShowDeleteContainer(!showDeleteContainer)
                                }}>Delete</button>
                            </div>
                            {
                                sf.subfolders.length > 0 && isActive(sf.id) ? (
                                    renderFolder(sf.subfolders)
                                ) : (
                                    isActive(sf.id) ? (
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
                    setShowDeleteContainer(false)
                    setShowAddContainer(!showAddContainer)
                }}>+New</button>
            </div>

            <ul>
                {
                    isActive('root') && folders.length > 0 ? (
                        folders.map(folder => (
                            <li key={folder.id}>
                                <div className="folder">
                                    <div className="title" onClick={() => toggleFolder(folder.id)}>
                                        {
                                            isActive(folder.id) ? (
                                                <BiDownArrow className='icon' />
                                            ) : (
                                                <BiRightArrow className='icon' />
                                            )
                                        }
                                        <div className="folder-name">{folder.name}</div>
                                    </div>

                                    <button onClick={() => {
                                        setFolderId(folder.id)
                                        setShowDeleteContainer(false)
                                        setShowAddContainer(!showAddContainer)
                                    }}>+New</button>
                                    <button onClick={() => {
                                        setFolderInfo({
                                            folderName: folder.name,
                                            folderId: folder.id
                                        })
                                        setShowAddContainer(false)
                                        setShowDeleteContainer(!showDeleteContainer)
                                    }}>Delete</button>
                                </div>
                                {
                                    folder.subfolders.length > 0 && isActive(folder.id) ? (
                                        renderFolder(folder.subfolders)
                                    ) : (
                                        isActive(folder.id) ? (
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
                    name='folderName'
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