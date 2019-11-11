import React, { ReactNode } from 'react';
import { ISecrets } from './interfaces/ISecrets';
import { ApiCallHelpers } from './helpers/api-call-helpers';

interface IProps {
    secrets: ISecrets;
    originLatitude: number;
    originLongitude: number;
}

interface IState {
    data: any[];
    isLoading: boolean;
}

export class PlaceSuggestions extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
        };
    }

    public componentDidMount(): void {
        const { secrets, originLatitude, originLongitude } = this.props;

        this.setState({
            isLoading: true,
        });

        ApiCallHelpers.FetchGet<any>(
            'https://places.cit.api.here.com/places/v1/discover/around' +
                `?at=${originLatitude},${originLongitude}` +
                `&r=300` +
                `&app_id=${secrets.here_loc_services.app_id}` +
                `&app_code=${secrets.here_loc_services.app_code}`
        ).then(response => {
            if (
                response.body &&
                response.body.results &&
                response.body.results.items
            ) {
                this.setState({
                    data: response.body.results.items
                        .filter((i: any) => i.category.id === 'restaurant')
                        .map((value: any, index: number) => {
                            value.id = index;
                            return value;
                        }),
                    isLoading: false,
                });
            } else {
                this.setState({
                    data: [],
                    isLoading: false,
                });
            }
        });
    }

    public render(): ReactNode {
        const { data, isLoading } = this.state;

        // TODO: Breaks unit tests, replace with a loading component.
        // if (isLoading) {
        //     return (
        //         <div>
        //             <p>Loading...</p>
        //         </div>
        //     );
        // }

        return (
            <div className="flex-container flex-horizontal">
                {data.length > 0 ? (
                    data.map(place => (
                        <div key={place.id} className="card">
                            <p key={place.id}>{place.title}</p>
                        </div>
                    ))
                ) : (
                    <p>No places to display.</p>
                )}
            </div>
        );
    }
}
