import React from 'react'
import ReactDOM from 'react-dom'
import { Spot } from '../../components/spots/Spot';

describe('Spot', () => {
    let spot;
    let container;

    beforeEach(() => {
        container = document.createElement('div');
    });

    const render = component => ReactDOM.render(component, container);

    it('renders a spot name', () => {
        spot = { name: 'Denver Skatepark' };
        render(<Spot spot={spot} />);
        expect(container.textContent).toMatch('Denver Skatepark');
    });

    it('renders a different spot name', () => {
        spot = { name: 'FDR' };
        render(<Spot spot={spot} />);
        expect(container.textContent).toMatch('FDR');
    });
});

