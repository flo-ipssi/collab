import { ListGuesser, FieldGuesser } from '@api-platform/admin';
import { TextField } from 'react-admin';
import { FC } from 'react';

const ProfessionList: FC = (props) => (
  <ListGuesser {...props}>
    <FieldGuesser source="name" />
    <FieldGuesser source="description" />
  </ListGuesser>
);

export default ProfessionList;
