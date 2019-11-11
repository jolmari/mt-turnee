import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import { PlaceSuggestions } from './PlaceSuggestions';
import { ApiCallHelpers } from './helpers/api-call-helpers';

jest.mock('./helpers/api-call-helpers');
configure({ adapter: new Adapter() });

describe('PlaceSuggestions', () => {
    beforeEach(() => {
        ApiCallHelpers.FetchGet = ApiCallHelpers.FetchGet;
    });

    it('should render a notification if no restaurants are found.', () => {
        // Arrange
        spyOn(ApiCallHelpers, 'FetchGet').and.returnValue(
            Promise.resolve({ body: {} })
        );

        // Act (use mount to enable waiting for render completion)
        const component = mount(
            <PlaceSuggestions
                secrets={{ here_loc_services: { app_code: '', app_id: '' } }}
                originLatitude={100}
                originLongitude={100}
            />
        );

        // Assert
        const paragraph = component.find('p');
        expect(paragraph.text()).toEqual('No places to display.');
    });

    it('should render a card on each restaurant category result item.', () => {

        // Act (use mount to enable waiting for render completion)
        const component = mount(
            <PlaceSuggestions
                secrets={{ here_loc_services: { app_code: '', app_id: '' } }}
                originLatitude={100}
                originLongitude={100}
            />
        );

        // Assert
        const container = component.find('div.flex-container');
        expect(container).toBeTruthy();

        const cards = component.find('.card');
        expect(cards.length).toEqual(2);
    });
});
