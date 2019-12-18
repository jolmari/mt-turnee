import React from 'react';
import { ISecrets } from '../interfaces/ISecrets';
import { IStop } from '../interfaces/IStop';

export interface IContextProps {
    secrets: ISecrets;
    handleRouteSave: (stops: IStop[]) => void;
}

const RoutePlannerContext = React.createContext<IContextProps>({
    handleRouteSave: (stops: IStop[]) => {},
    secrets: {
        here_loc_services: {
            app_code: '',
            app_id: '',
        },
    },
});

export default RoutePlannerContext;
