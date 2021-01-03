import React, { Component } from 'react';
import { Route } from 'react-router';
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

    /**
     * 
     * @param {} props 
     */
    constructor(props) {
        super(props);
        this.state = { 
          user: authService.getUser(), 
          userName : [],
          groups: [], 
          loading: true,
          path : props.match,
          wantsToAddGroup : false
         };
        console.log("user ", this.state.user);

        console.log("path: ", this.path);
    };
    
    /**
     * 
     * 
     */
    componentDidMount() {
        this.populateGroupData();
        this.populateUserName();
    }

    /**
     * 
     * 
     */
    async populateUserName() {
        console.log("populatingState")
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
    }
    
    handleSubmit = () => {
      console.log("Groups: handleSubmit");
      this.setState({ wantsToAddGroup: true});
    }


    /**
     * 
     * 
     */
    renderGroupsTable() {


      // console.log("Groups: wantsToAddGroup: ", this.state.wantsToAddGroup);

      //   return(
      //     <div>
      //       <h2>Welcome to {this.state.userName}'s groups</h2>
      //       { 
      //         this.state.wantsToAddGroup ? 
      //           <GroupsForm exact path="/groups/add" component={GroupsForm}/> :
      //           <>
      //             <button onClick={this.handleSubmit} className="btn btn-sm btn-success mb-2" name="addGroup">Add Group</button> 
      //             <GroupsList exact path="/groups" component={GroupsList} />                
      //           </>
      //       }
            
      //     </div>
      //   );   

    }
    
    /**
     * Renders a loading warning if we are waiting for Get response.
     * Otherwise, we render the current users groups.
     */
    render() {
      //
        let contents = this.state.loading ? 
            <p><em>Loading...{emojis[0].emoji}</em></p> : 
            this.renderGroupsTable();

        console.log("Groups: contents: ", contents);
        //console.log("user: ", this.state.user && this.state.user.name);

        return (
            <div>
                <h1 id="tabelLabel" >Groups {emojis[1].emoji}</h1>
                {contents}
            </div>
        );
    }

    /**
     * 
     * 
     */
    async populateGroupData() {   
        console.log("Group: getting authorization"); 
        const token = await authService.getAccessToken();
        const response = await fetch('api/groups', {
            headers: 
                 !token ? 
                 {} : 
                 { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
          if (data) {
            this.setState({ groups: data, loading: false });
        }
    }
}