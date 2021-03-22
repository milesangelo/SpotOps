import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import groupService from './GroupService';
import DeleteButton from '../buttons/DeleteButton'

const GroupList = (props) => {
    const [groups, setGroups] = useState(null)
    const [deletingGroup, setDeletingGroup] = useState({
        isDeleting: false,
        id: 0
    })

    /**
     * 
     * @param {*} id 
     */
    const deleteGroup = (id) => {
        setDeletingGroup({
            isDeleting : true,
            id : id
        })
    }
    
    /**
     * 
     */
    useEffect(() => {
        if (deletingGroup.isDeleting === true) {
            groupService.deleteGroup(deletingGroup.id)
            .then(() => {
                setDeletingGroup({ 
                    isDeleting : false,
                    id : 0
                })
            })
        }
       
        getAllGroups()
        
    }, [deletingGroup])
 
    const getAllGroups = () => {
        groupService.getAll()
            .then(grps => {
                setGroups(grps);
            })
    }


    /**
     * 
     * @param {*} props 
     */
    const render = (props) => {
        const { path } = props
        return (
            <div>
                <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2" >Add Group</Link> 
                {renderGroupList(props)}
            </div>
        )
    }

    /**
     * 
     * 
     */
    const renderGroupList = (props) => {
        const { path } = props

        console.log("GroupList.renderGroupList() ", groups);

        return (
            <div>
               <table className="table table-striped">
                    <thead>
                        <tr>
                            <th style={{ width: '25% '}}>Name</th>
                            <th style={{ width: '20% '}}>Owner</th>
                            <th style={{ width: '15% '}}>Date Created</th>
                            <th style={{ width: '15% '}}>Date Modified</th>
                            <th style={{ width: '12.5%'}}># of Members</th>
                            <th style={{ width: '12.5%' }}># of Spots</th>
                            <th style={{ width: '10%' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups && groups.map(grp =>
                            <tr key={grp.id}>
                                <td>{grp.name}</td>
                                <td>{grp.owner}</td>
                                <td>{new Date(grp.dateCreated).toUTCString()}</td>
                                <td>{new Date(grp.dateModified).toUTCString()}</td>
                                <td>{grp.numMembers}</td>
                                <td>{grp.numSpots}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <Link to={`${path}/edit/${grp.id}`} className="btn btn-sm btn-primary mr-1" >Edit</Link> 
                                    <DeleteButton 
                                        name="Remove" 
                                        onClick={deleteGroup} 
                                        index={grp.id}
                                        isDeleting={deletingGroup.isDeleting} />
                                </td>
                            </tr>
                        )}
                        {!groups &&
                            <tr>
                                <td colSpan="7" className="text-center">
                                    <div className="spinner-border spinner-border-lg align-center"></div>
                                </td>
                            </tr>
                        }
                        {groups && !groups.length &&
                            <tr>
                                <td colSpan="7" className="text-center">
                                    <div className="p-2">No Groups to Display</div>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        );
    }

    return(
        render(props)
    )
}

export default GroupList;