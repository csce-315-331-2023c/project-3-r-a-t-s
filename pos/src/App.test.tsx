import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

/**
 * Test to check if the 'App' component renders without errors.
 * Uses the '@testing-library/react' library to render the component.
 */
test('renders learn react link', () => {
  render(<App />);
});
