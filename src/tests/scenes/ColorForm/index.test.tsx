import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ColorForm from '../../../scenes/ColorForm';
import userEvent from '@testing-library/user-event';

test('renders learn react link', () => {
  render(<ColorForm />);
  const linkElement = screen.getByText('New Color');
  expect(linkElement).toBeInTheDocument();
});
