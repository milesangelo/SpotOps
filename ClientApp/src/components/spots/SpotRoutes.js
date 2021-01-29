import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import SpotForm from './SpotForm'

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
                    <Route exact path={path} component={SpotForm} />
                </Switch>           
            )
    }
}
