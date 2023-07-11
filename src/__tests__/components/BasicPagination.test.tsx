import userEvent from '@testing-library/user-event';
import { vitest } from 'vitest';
import BasicPagination, { BasicPaginationProps } from '../../components/BasicPagination';
import { renderWithProviders } from '../test-utils';

describe('BasicPagination', () => {
  const onClick = vitest.fn();
  const props: BasicPaginationProps = {
    active: 1,
    total: 1,
    onClick,
    message: 'Message',
  };

  it('should render message', () => {
    const { getByText } = renderWithProviders(<BasicPagination {...props} />);
    expect(getByText(props.message)).toBeInTheDocument();
  });

  it('should render 1 page if total is 1', () => {
    const { getAllByRole } = renderWithProviders(<BasicPagination {...props} />);
    expect(getAllByRole('listitem')).toHaveLength(1);
  });

  it('should render total amount of pages and 4 navigation items if total is lower or equals to 7', () => {
    const newProps = { ...props, total: 6 };
    const { getAllByRole } = renderWithProviders(<BasicPagination {...newProps} />);
    expect(getAllByRole('listitem')).toHaveLength(10);
  });

  it('should render 6 pages, 1 elipsis(More) and 4 navigation items if total is higher than 7 and active is lower than 4', () => {
    const newProps = { ...props, total: 9 };
    const { getAllByRole } = renderWithProviders(<BasicPagination {...newProps} />);
    expect(getAllByRole('listitem')).toHaveLength(11);
    expect(getAllByRole('button', { name: 'More' })).toHaveLength(1);
  });

  it('should render 5 pages, 2 elipsis(More) and 4 navigation items if total is higher than 7 and active is between 5 and total - 4', () => {
    const newProps = { ...props, total: 9, active: 5 };
    const { getAllByRole } = renderWithProviders(<BasicPagination {...newProps} />);
    expect(getAllByRole('listitem')).toHaveLength(11);
    expect(getAllByRole('button', { name: 'More' })).toHaveLength(2);
  });

  it('should render 6 pages, 1 elipsis(More) and 4 navigation items if total is higher than 7 and active is higher than total - 4', () => {
    const newProps = { ...props, total: 9, active: 6 };
    const { getAllByRole } = renderWithProviders(<BasicPagination {...newProps} />);
    expect(getAllByRole('listitem')).toHaveLength(11);
    expect(getAllByRole('button', { name: 'More' })).toHaveLength(1);
  });

  it('should render 2 disabled buttons (first and prev) if total is higher than 1 and active is 1', () => {
    const newProps = { ...props, total: 2 };
    const { getByRole } = renderWithProviders(<BasicPagination {...newProps} />);
    const listChildren = getByRole('list').children;
    expect(listChildren[0]).toHaveClass('disabled');
    expect(listChildren[1]).toHaveClass('disabled');
  });

  it('should render 2 disabled buttons (next and last) if total is higher than 1 and active is equals to total', () => {
    const newProps = { ...props, total: 2, active: 2 };
    const { getByRole } = renderWithProviders(<BasicPagination {...newProps} />);
    const listChildren = getByRole('list').children;
    expect(listChildren[listChildren.length - 1]).toHaveClass('disabled');
    expect(listChildren[listChildren.length - 2]).toHaveClass('disabled');
  });

  it('should call onClick when clicking a page button', async () => {
    const newProps = { ...props, total: 2 };
    const { getByRole } = renderWithProviders(<BasicPagination {...newProps} />);
    await userEvent.click(getByRole('button', { name: '2' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
