import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import LandingPage from '../app/page'; // Adjust path as needed

expect.extend(toHaveNoViolations);

describe('Landing Page Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<LandingPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
