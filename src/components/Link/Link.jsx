import { Link as MUILink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const Link = ({ children, ...props }) => {
  return (
    <MUILink {...props} component={RouterLink}>
      {children}
    </MUILink>
  );
};
