import { render } from '@testing-library/react';

import ContentGrid from './content-grid';

describe('ContentGrid', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ContentGrid />);
    expect(baseElement).toBeTruthy();
  });
});
