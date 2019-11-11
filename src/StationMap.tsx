import React, { ReactNode } from 'react';
import { ISecrets } from './interfaces/ISecrets.js';

interface MapParams {
    width: number;
    height: number;
    zoom: number;
}

interface IProps {
    secrets: ISecrets;
    params: MapParams;
    latitude: number;
    longitude: number;
}

export class StationMap extends React.Component<IProps, {}> {
    public static defaultProps = {
        params: {
            height: 200,
            width: 200,
            zoom: 15,
        },
    };

    public constructor(props: IProps) {
        super(props);
    }

    public render(): ReactNode {
        const poi = `${this.props.latitude}, ${this.props.longitude}`;
        const { width, height, zoom } = this.props.params;
        const { secrets } = this.props;

        return (
            <img
                src={
                    'https://image.maps.api.here.com/mia/1.6/mapview' +
                    `?w=${width}` +
                    `&h=${height}` +
                    `&z=${zoom}` +
                    '&t=5&poitxs=16&poitxc=black&poifc=yellow' +
                    '&app_id=' +
                    secrets.here_loc_services.app_id +
                    '&app_code=' +
                    secrets.here_loc_services.app_code +
                    '&poi=' +
                    poi
                }
                alt="Todo Map"
            />
        );
    }
}
