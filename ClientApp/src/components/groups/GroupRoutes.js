import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import GroupForm from './GroupForm'
import GroupList from './GroupList'

export default class GroupRoutes extends Component {

    render() {

        const { path } = this.props.match;

        return (
            <Switch>
                <GroupList exact path={path} component={GroupList} />
                <Route exact path={`${path}/add`} component={GroupForm} />
                <Route path={`${path}/edit/:id`} component={GroupForm} />
            </Switch>           
        )
    }
}
