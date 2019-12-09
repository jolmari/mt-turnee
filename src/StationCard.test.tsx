import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

import { shallow, configure } from 'enzyme';
import { StationMap } from './StationMap';

configure({ adapter: new Adapter() });

describe('<StationMap />', () => {
    it('should render <img /> with map source and default configuration.', () => {
        // Act
        const component = shallow(
            <StationMap
                secrets={{
                    here_loc_services: { app_code: 'code', app_id: 'id' },
                }}
                latitude={100.0}
                longitude={200.0}
            />
        );

        // Assert
        const img = component.find('img');
        expect(img.prop('src')).toEqual(
            'https://image.maps.api.here.com/mia/1.6/mapview?w=200&h=200&z=15&t=5&poitxs=16&poitxc=black&poifc=yellow&app_id=id&app_code=code&poi=100, 200'
        );
    });
});
