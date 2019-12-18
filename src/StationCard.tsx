import React, { ReactNode } from 'react';

import { ISecrets } from './interfaces/ISecrets';
import { StationMap } from './StationMap';

interface ICardProps {
    secrets: ISecrets;
    stopName: string;
    latitude: number;
    longitude: number;
    selectionCallback: () => void;
}

export class StationCard extends React.Component<ICardProps, {}> {
    public static defaultProps = {
        selectionCallback: null,
    };

    public constructor(props: ICardProps) {
        super(props);
    }

    public renderButton = (callback: () => void) => {
        if (callback) {
            return <button type="button" onClick={callback}>Select stop</button>;
        }
    };

    public render(): ReactNode {
        const {
            secrets,
            stopName,
            longitude,
            latitude,
            selectionCallback,
        } = this.props;

        return (
            <div>
                <div className="bg-blue">
                    <p>Stop: {stopName}</p>
                    <p>Latitude: {latitude}</p>
                    <p>Longitude: {longitude}</p>
                </div>
                <div style={{ margin: '1em' }}>
                    <StationMap
                        secrets={secrets}
                        latitude={latitude}
                        longitude={longitude}
                        />
                    </div>
                {this.renderButton(selectionCallback)}
            </div>
        );
    }
}
