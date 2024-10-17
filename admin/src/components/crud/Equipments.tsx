import { ListGuesser, FieldGuesser } from '@api-platform/admin';
import { FC } from 'react';
import { ReferenceField, TextField } from 'react-admin';

const EquipmentList: FC = (props) => (
  <ListGuesser {...props}>
    <FieldGuesser source="brand" />
    <FieldGuesser source="model" />
    {/* Utiliser ReferenceField pour récupérer le nom du Material lié */}
    <ReferenceField source="material.@id" reference="materials">
      <TextField source="name" />
    </ReferenceField>
  </ListGuesser>
);

export default EquipmentList;
