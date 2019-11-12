import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import { PlaceSuggestions } from './PlaceSuggestions';
import { ApiCallHelpers } from './helpers/api-call-helpers';
import { TestHelpers } from './helpers/test/test-helpers';

jest.mock('./helpers/api-call-helpers');
configure({ adapter: new Adapter() });

describe('<PlaceSuggestions />', () => {
    it('should render a notification if no restaurants are found.', async () => {
        // Arrange
        spyOn(ApiCallHelpers, 'FetchGet').and.returnValue(
            Promise.resolve({ body: {} })
        );

        // Act
        const component = shallow(
            <PlaceSuggestions
                secrets={{ here_loc_services: { app_code: '', app_id: '' } }}
                originLatitude={100}
                originLongitude={100}
            />
        );

        await TestHelpers.flushPromises();
        component.update();

        // Assert
        const paragraph = component.find('p');
        expect(paragraph.text()).toEqual('No places to display.');
    });

    it('should render a card on each restaurant category result item.', async () => {
        // Act
        const component = shallow(
            <PlaceSuggestions
                secrets={{ here_loc_services: { app_code: '', app_id: '' } }}
                originLatitude={100}
                originLongitude={100}
            />
        );

        await TestHelpers.flushPromises();
        component.update();

        // Assert
        const container = component.find('div.flex-container');
        expect(container).toBeTruthy();

        const cards = component.find('.card');
        expect(cards.length).toEqual(2);
    });

    it('should render a loading messa when API request is pending.', async () => {
        // Arrange
        spyOn(ApiCallHelpers, 'FetchGet').and.returnValue(
            new Promise(resolve => setTimeout(() => resolve(), 100))
        );

        // Act
        const component = shallow(
            <PlaceSuggestions
                secrets={{ here_loc_services: { app_code: '', app_id: '' } }}
                originLatitude={100}
                originLongitude={100}
            />
        );

        // Assert
        const loadingParagraph = component.find('div p');
        expect(loadingParagraph.text()).toEqual('Loading...');
    });
});
