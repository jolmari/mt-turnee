import React, { ReactNode } from 'react';
import Secrets from './secrets/secrets.json';

interface ISecrets {
    here_loc_services: {
        app_id: string;
        app_code: string;
    };
}

interface MapParams {
    width: number;
    height: number;
    zoom: number;
}

interface MapProps {
    params: MapParams;
    latitude: string;
    longitude: string;
}

export class StationMap extends React.Component<MapProps, {}> {
    
    public  static defaultProps = {
        params: {
            height: 200,
            width: 200,
            zoom: 15,
        },
    };

    private secrets: ISecrets;

    public constructor(props: {
        params: MapParams;
        latitude: string;
        longitude: string;
    }) {
        super(props);
        this.secrets = Secrets;
    }

    public render(): ReactNode {
        const poi = `${this.props.latitude}, ${this.props.longitude}`;
        const { width, height, zoom } = this.props.params;

        return (
            <img
                src={
                    'https://image.maps.api.here.com/mia/1.6/mapview' +
                    `?w=${width}` +
                    `&h=${height}` +
                    `&z=${zoom}` +
                    '&t=5&poitxs=16&poitxc=black&poifc=yellow' +
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
