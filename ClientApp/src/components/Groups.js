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
    renderGroupsTable() {
        return(
            <div>
            <h2>Welcome</h2>
            <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
              <tr>
                <th>Group</th>
              </tr>
            </thead>
            <tbody>
              {this.state.groups.map(group =>
                <tr key={group.id}>
                  
                  <td>{group.name}</td>
                 
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
            this.renderGroupsTable();

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
        const response = await fetch('api/groups', {
            headers: 
                !token ? 
                {} : 
                { 'Authorization': `Bearer ${token}` }
        });
        
        const data = await response.json();
        console.log("data: ", data);
        if (data) {
            this.setState({ groups: data, loading: false });
        }
    }

}