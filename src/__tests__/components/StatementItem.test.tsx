import StatementItem, { StatementItemProps } from '../../components/StatementItem';
import { renderWithProviders } from '../test-utils';

describe('StatementItem', () => {
  const props: StatementItemProps = {
    name: 'link',
    value: 'https://www.test.com/',
    reportedCurrency: 'USD',
  };

  it("should render a link if name includes 'link' and value is a string", () => {
    const { getByRole } = renderWithProviders(<StatementItem {...props} />);
    expect(getByRole('link', { name: 'Link' })).toHaveAttribute('href', props.value);
  });

  it("should render null if name includes 'link' and value is a number", () => {
    const newProps = { ...props, value: 1 };
    const { container } = renderWithProviders(<StatementItem {...newProps} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render formatted name and unformatted value if value is a string', () => {
    const newProps = { ...props, name: 'propLabel' };
    const { getByText } = renderWithProviders(<StatementItem {...newProps} />);
    expect(getByText('Prop Label')).toBeInTheDocument();
    expect(getByText(newProps.value)).toBeInTheDocument();
  });

  it('should render formatted name and formatted value if value is a ratio', () => {
    const newProps = { ...props, name: 'ratio', value: 0.123456 };
    const { getByText } = renderWithProviders(<StatementItem {...newProps} />);
    expect(getByText('Ratio')).toBeInTheDocument();
    expect(getByText('12.345600%')).toBeInTheDocument();
  });

  it('should render formatted name and formatted value if value is a currency', () => {
    const newProps = { ...props, name: 'propLabel', value: 0.123456 };
    const { getByText } = renderWithProviders(<StatementItem {...newProps} />);
    expect(getByText('Prop Label')).toBeInTheDocument();
    expect(getByText('US$ 0,123456')).toBeInTheDocument();
  });
});
