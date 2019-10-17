import React, { ReactNode } from 'react';
import stopsData from './data/metro-stops.json';

interface IStop {
    gtfsId: string;
    name: string;
    vehicleMode: string;
    lat: number;
    lon: number;
}

export class RoutePlanner extends React.Component<
    {},
    { availableStops: IStop[]; selectedStops: IStop[] }
> {
    constructor(props: {}) {
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
                            {stop.name} - latitude: {stop.lat} / longitude:{' '}
                            {stop.lon}
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
