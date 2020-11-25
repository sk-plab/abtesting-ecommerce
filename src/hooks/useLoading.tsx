import React from 'react';
import { Container } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

export const useLoading = (): JSX.Element => {
  return (
    <Container fluid>
      <Skeleton height={260} />
      <Skeleton height={24} style={{ marginTop: 22 }} />
      <Skeleton height={20} style={{ marginTop: 10, marginBottom: 22 }} />
    </Container>
  );
};
