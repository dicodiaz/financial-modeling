import Stock from '../../components/Stock';
import { mockStock } from '../../__mocks__/mock-stocks';
import { renderWithProviders } from '../test-utils';

describe('Stock', () => {
  it('should render a clickable card with the expected content', () => {
    const { container } = renderWithProviders(<Stock data={mockStock} />);
    expect(container).toMatchSnapshot();
  });
});
