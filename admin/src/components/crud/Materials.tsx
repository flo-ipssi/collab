import { ListGuesser, FieldGuesser } from '@api-platform/admin';
import { TextField } from 'react-admin';
import { FC } from 'react';

const MaterialList: FC = (props) => (
  <ListGuesser {...props}>
    {/* <TextField source="id" /> */}
    <FieldGuesser source="name" />
    <FieldGuesser source="description" />
  </ListGuesser>
);

export default MaterialList;
