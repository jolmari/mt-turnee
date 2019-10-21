import React, { ReactNode } from 'react';
import Secrets from './secrets/secrets.json';

interface ISecrets {
    here_loc_services: {
        app_id: string;
        app_code: string;
    };
}

export class StationMap extends React.Component<
    { latitude: string; longitude: string },
    {}
> {
    private secrets: ISecrets;

    public constructor(props: { latitude: string; longitude: string }) {
        super(props);
        this.secrets = Secrets;
    }

    public render(): ReactNode {
        const poi = `${this.props.latitude}, ${this.props.longitude}`;

        return (
            <img
                src={
                    'https://image.maps.api.here.com/mia/1.6/mapview?w=200&h=200&z=15&t=5&poitxs=16&poitxc=black&poifc=yellow' +
                    '&app_id=' +
                    this.secrets.here_loc_services.app_id +
                    '&app_code=' +
                    this.secrets.here_loc_services.app_code +
                    '&poi=' +
                    poi
                }
                alt="Todo Map"
            />
        );
    }
}
