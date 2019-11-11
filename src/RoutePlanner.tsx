import React, { ReactNode } from 'react';
import stopsData from './data/metro-stops.json';
import { PlaceSuggestions } from './PlaceSuggestions';
import { ISecrets } from './interfaces/ISecrets';
import { StationMap } from './StationMap';

interface IStop {
    gtfsId: string;
    name: string;
    vehicleMode: string;
    lat: number;
    lon: number;
}

interface IProps {
    secrets: ISecrets;
}

export class RoutePlanner extends React.Component<
    IProps,
    { availableStops: IStop[]; selectedStops: IStop[] }
> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            availableStops: stopsData.data.stops,
            selectedStops: [],
        };
    }

    public selectStop = (newStop: IStop) => {
        if (this.state.selectedStops.indexOf(newStop) < 0) {
            this.setState({
                availableStops: [
                    ...this.state.availableStops.filter(
                        stop => stop.gtfsId !== newStop.gtfsId
                    ),
                ],
                selectedStops: [...this.state.selectedStops, newStop],
            });
        }
    };

    public render(): ReactNode {
        const { availableStops, selectedStops } = this.state;

        return (
            <div>
                <h2>Selected stops</h2>
                <ul>
                    {selectedStops.map(stop => (
                        <li key={stop.gtfsId}>
                            <div
                                className="flex-container flex-vertical flex-centered bg-lighter-gray"
                                style={{ padding: '1em' }}
                            >
                                <div className="flex-container flex-horizontal bg-light-gray">
                                    <div className="bg-blue">
                                        <p>Stop: {stop.name}</p>
                                        <p>Latitude: {stop.lat}</p>
                                        <p>Longitude: {stop.lon}</p>
                                    </div>
                                    <div style={{ margin: '1em' }}>
                                        <StationMap
                                            secrets={this.props.secrets}
                                            latitude={stop.lat}
                                            longitude={stop.lon}
                                        />
                                    </div>
                                </div>
                                <PlaceSuggestions
                                    secrets={this.props.secrets}
                                    originLatitude={stop.lat}
                                    originLongitude={stop.lon}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
                <h2>Available stops</h2>
                <ul>
                    {availableStops
                        .filter(stop => stop.vehicleMode === 'SUBWAY')
                        .map(stop => (
                            <li key={stop.gtfsId}>
                                {stop.name} - latitude: {stop.lat} / longitude:{' '}
                                {stop.lon}
                                <button
                                    type="button"
                                    onClick={event => this.selectStop(stop)}
                                    value="Select"
                                />
                            </li>
                        ))}
                </ul>
            </div>
        );
    }
}
