import React, { ReactNode } from 'react';
import stopsData from './data/metro-stops.json';
import { PlaceSuggestions } from './PlaceSuggestions';
import { StationCard } from './StationCard';
import RoutePlannerContext from './context/RoutePlannerContext';
import { IStop } from './interfaces/IStop.js';

export class RoutePlanner extends React.Component<
    {},
    {
        availableStops: IStop[];
        selectedStops: IStop[];
    }
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

    public removeStop = (removedStop: IStop) => {
        const updatedStops = this.state.selectedStops.filter(
            stop => stop.gtfsId !== removedStop.gtfsId
        );

        this.setState({
            availableStops: [...this.state.availableStops, removedStop],
            selectedStops: [...updatedStops],
        });
    };

    public render(): ReactNode {
        const { availableStops, selectedStops } = this.state;

        return (
            <RoutePlannerContext.Consumer>
                {context => (
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
                                            <StationCard
                                                secrets={context.secrets}
                                                stopName={stop.name}
                                                latitude={stop.lat}
                                                longitude={stop.lon}
                                            />
                                        </div>
                                        <PlaceSuggestions
                                            secrets={context.secrets}
                                            originLatitude={stop.lat}
                                            originLongitude={stop.lon}
                                        />
                                    </div>
                                </li>
                            ))}
                            <button
                                type="button"
                                onClick={() =>
                                    context.handleRouteSave(selectedStops)
                                }
                            >
                                Save route
                            </button>
                        </ul>
                        <h2>Available stops</h2>
                        <div>
                            {availableStops
                                .filter(stop => stop.vehicleMode === 'SUBWAY')
                                .map(stop => (
                                    <div
                                        key={stop.gtfsId}
                                        className="flex-container flex-horizontal bg-light-gray"
                                    >
                                        <div className="flex-container flex-horizontal bg-light-gray">
                                            <StationCard
                                                secrets={context.secrets}
                                                stopName={stop.name}
                                                latitude={stop.lat}
                                                longitude={stop.lon}
                                                selectionCallback={() =>
                                                    this.selectStop(stop)
                                                }
                                            />
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </RoutePlannerContext.Consumer>
        );
    }
}
