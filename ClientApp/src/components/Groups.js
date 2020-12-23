import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';

const emojis = [
    {
      emoji: '😀',
      name: "test grinning face"
    },
    {
      emoji: '🎉',
      name: "party popper"
    },
    {
      emoji: '💃',
      name: "woman dancing"
    }
  ];

export class Groups extends Component {

    //--
    constructor(props) {
        super(props);
        this.state = { user: authService.getUser(), groups: [], loading: true };
    };
    
    //--
    componentDidMount() {
        this.populateGroupData();
    }

    //--
    static renderGroupsTable(groups) {
        return(
            <div>
            <h2>Welcome {this.state.user}</h2>
            <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
              <tr>
                <th>Group</th>
                <th>Spots</th>
                <th>Owner</th>
                <th>Members</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {groups.map(group =>
                <tr key={group.date}>
                  <td>{group.date}</td>
                  <td>{group.name}</td>
                  <td>{group.owner}</td>
                  <td>{group.lastModified}</td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        );   
    }

    //--
    render() {
        let contents = this.state.loading ? 
            <p><em>Loading...{emojis[0].emoji}</em></p> : 
            Groups.renderGroupsTable(this.state.groups);

        return (
            <div>
                <h1 id="tabelLabel" >Groups {emojis[1].emoji}</h1>
                <p>This area of the website is still under construction...</p>
                {contents}
            </div>
        );
    }

    //--
    async populateGroupData() {
        const token = await authService.getAccessToken();
        const response = await fetch('groups', {
            headers: 
                !token ? 
                {} : 
                { 'Authorization': `Bearer ${token}` }
        });
        try {
            const data = await response.json();
            if (data) {
                this.setState({ groups: data, loading: false });
            }
        } catch {
            //..
        }
    }

}