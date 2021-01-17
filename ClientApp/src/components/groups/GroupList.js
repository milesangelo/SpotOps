import React, { Component, useState} from 'react'
import { Link } from 'react-router-dom';
import groupService from './GroupService';
import DeleteButton from '../buttons/DeleteButton'





const GroupList = (props) => {

    const [groups, setGroups] = useState(groupService.getGroupsList())
    
    const deleteGroup = (id) => {
        console.log('grouplist deleteGroup')
        groupService.deleteGroup(id)
        setGroups(groupService.getGroupsList())
    }
    
    
    
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
                                <td>{grp.ownerId}</td>
                                <td>{grp.dateCreated}</td>
                                <td>{grp.dateModified}</td>
                                <td>{grp.numMembers}</td>
                                <td>{grp.numSpots}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <Link to={`${path}/edit/${grp.id}`} className="btn btn-sm btn-primary mr-1" >Edit</Link> 
                                    <DeleteButton 
                                        name="Remove" 
                                        onClick={deleteGroup} 
                                        index={grp.id} />
                                       
                                    
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

export default  GroupList;