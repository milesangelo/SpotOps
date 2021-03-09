import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import { SpotForm } from './SpotForm'
import SpotList from './SpotList';

export const SpotRoutes = ({ path }) => {

    //TODO, wrap a lot of this stuff in a spotView wrapper that controls all handling and rendering of Spot components on page.
    return (
            <Switch>
                <SpotForm />    
                <Route path={`${path}/edit/:id`} component={SpotForm} />
            </Switch>           
        )
};

//<SpotForm path={`${path}/add`} name="FDR" type="Park" image={fileRef.current} />
//<SpotList exact path={path} component={SpotList} />
//export default { SpotRoutes };
////imageAsFile={fileRef.current} />
//<Route exact path={`${path}/add`} component={SpotForm} />
//^^ goes about edit/:id route
