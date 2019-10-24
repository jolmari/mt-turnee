import React, { ReactNode } from 'react';
import { ISecrets } from './interfaces/ISecrets';
import { FetchGet } from './helpers/api-call-helpers';

interface IProps {
    secrets: ISecrets;
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
        const { secrets } = this.props;

        this.setState({
            isLoading: true,
        });

        FetchGet<any>(
            'https://places.cit.api.here.com/places/v1/autosuggest' +
                `?at=${60.159443},${24.8785}` +
                `&app_id=${secrets.here_loc_services.app_id}` +
                `&app_code=${secrets.here_loc_services.app_code}` +
                '&q=/restaurant/'
        ).then(body => {
            this.setState({
                data: body.results.map((value: any, index: number) => {
                    value.id = index;
                    return value;
                }),
                isLoading: false,
            });
        });
    }

    public render(): ReactNode {
        const { data, isLoading } = this.state;

        if (isLoading) {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            );
        }

        return (
            <div>
                {data ? (
                    data.map(place => <p key={place.id}>{place.title}</p>)
                ) : (
                    <p>No places to display.</p>
                )}
            </div>
        );
    }
}
