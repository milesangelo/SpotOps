import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import { SpotForm } from './SpotForm'
import SpotList from './SpotList';

export default class SpotRoutes extends Component {

    render() {
        //const { path } = this.props.match;
        return (
                <Switch>
                    <Route exact path={'/spots/add'} render={ (routerProps) => <SpotForm { ...routerProps } /> } />
                    <Route path={'/spots/edit/:id'} render={ (routerProps) => <SpotForm { ...routerProps } /> } />
                </Switch>           
        )
    }
};
//<Route exact path={'/spots/edit/:id'} component={SpotForm} />
//
//<SpotForm path={`${path}/add`} name="FDR" type="Park" image={fileRef.current} />
//<SpotList exact path={path} component={SpotList} />
//export default { SpotRoutes };
////imageAsFile={fileRef.current} />
//<Route exact path={`${path}/add`} component={SpotForm} />
//^^ goes about edit/:id route
