import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import groupService from './GroupService';

export default class GroupList extends Component {

    /**
     * 
     * @param {*} props 
     */
    constructor(props) {

        super(props);
        
        this.state = {
            groups: groupService.getGroupsList(),
            clickedAddGroup: false,
            buttonTest:false
        }
    }

    /**
     * 
     * 
     */
    renderGroupList(){

        const { path } = this.props.match;

        console.log("GroupList.renderGroupList() ", this.state.groups);

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
                        {this.state.groups && this.state.groups.map(grp =>
                            <tr key={grp.id}>
                                <td>{grp.name}</td>
                                <td>{grp.ownerId}</td>
                                <td>{grp.dateCreated}</td>
                                <td>{grp.dateModified}</td>
                                <td>{grp.numMembers}</td>
                                <td>{grp.numSpots}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <Link to={`${path}/edit/${grp.id}`} className="btn btn-sm btn-primary mr-1" >Edit</Link> 
                                    <button 
                                        onClick={this.deleteGroup} 
                                        className="btn btn-sm btn-danger btn-delete-group" 
                                        name="addGroup"
                                        disabled={grp.isDeleting}>
                                            {grp.isDeleting
                                                ? <span className="spinner-border spinner-border-sm"></span>
                                                : <span>Delete</span>
                                            }
                                    </button>
                                </td>
                            </tr>

                        )}
                        {!this.state.groups &&
                            <tr>
                                <td colSpan="7" className="text-center">
                                    <div className="spinner-border spinner-border-lg align-center"></div>
                                </td>
                            </tr>
                        }
                        {this.state.groups && !this.state.groups.length &&
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

    
    /**
     * 
     * 
     */
    render() {
        const { path } = this.props.match;

        return (
            <div>
                <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2" >Add Group</Link> 
                <p>TESTING GROUPSLIST</p>
                {this.renderGroupList()}
            </div>
        )
    }
    
}
