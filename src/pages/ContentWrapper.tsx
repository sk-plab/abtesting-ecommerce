import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface MatchParams {
  id: string;
}
const ContentWrapper: React.FC<RouteComponentProps<MatchParams>> = ({ children, match }) => (
  <div>
    <p>Match id: {match.params.id}</p>
    {children}
  </div>
);
export default withRouter(ContentWrapper);
