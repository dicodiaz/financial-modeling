import { FC } from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';

export const LinkWithSearchParams: FC<LinkProps> = ({ children, to, ...props }) => {
  const { search } = useLocation();

  return (
    <Link to={`${to}${search}`} {...props}>
      {children}
    </Link>
  );
};
