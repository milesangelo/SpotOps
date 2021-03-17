import React from 'react';
import { render } from "@testing-library/react";
import { SpotsPage } from '../../SpotsPage';

describe('<SpotsPage />', () => {

    it('renders without failure', () => {
        render(<SpotsPage />);
    });

    it('renders an Add button', () => {
        const { getByTestId } = render(<SpotsPage />);

        const addButton = getByTestId('add-button');

        expect(addButton).toBeInTheDocument();
        expect(addButton.getAttribute("type")).toEqual("button");
        expect(addButton.textContent).toEqual('Add');
    });

    it.skip('renders SpotForm in "create mode" when Add button is clicked', () => {});

});