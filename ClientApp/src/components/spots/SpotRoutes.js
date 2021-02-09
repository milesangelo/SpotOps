import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import SpotForm from './SpotForm'
import SpotList from './SpotList'

export default class SpotRoutes extends Component {

    render() {

        const { path } = this.props.match;

        // return (
        //     <Switch>
        //         <Route exact path={`${path}/add`} component={GroupForm} />
        //         <Route path={`${path}/edit/:id`} component={GroupForm} />
        //     </Switch>           
        // )

        console.log('SpotRoutes render(): ')

        return (
                <Switch>
                    <SpotList exact path={path} component={SpotList} />
                    <Route exact path={`${path}/add`} component={SpotForm} />
                    <Route path={`${path}/edit/:id`} component={SpotForm} />
                </Switch>           
            )
    }
}
