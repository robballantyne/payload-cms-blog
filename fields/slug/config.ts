import { Field } from 'payload/types';
import InputField from './InputField';
import Cell from './Cell';


const slugField: Field = {
  name: 'slug',
  type: 'text',
  //validate: validateHexColor,
  required: true,
  admin: {
    components: {
      Field: InputField,
    },
    placeholder: 'A unique identifier for the title',
  }
};

export default slugField;
