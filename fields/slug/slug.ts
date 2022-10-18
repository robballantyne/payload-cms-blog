// From @stupidism https://github.com/payloadcms/payload/discussions/584

import { Field } from 'payload/types';
import { merge } from 'lodash';
import { getSlugInput } from './SlugInput';

type Slug = (
  options?: { trackingField?: string },
  overrides?: Partial<Field>
) => Field;

// By dynamically building fields in code configurations are reusable and concise
export const slug: Slug = ({ trackingField = 'title' } = {}, overrides) =>
  merge<Field, Partial<Field> | undefined>(
    {
      name: 'slug',
      unique: true,
      type: 'text',
      admin: {
        components: {
          Field: getSlugInput({ trackingField })
        }
      },
      
    },
    overrides
  );