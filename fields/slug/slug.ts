// From @stupidism https://github.com/payloadcms/payload/discussions/584

import payload from 'payload';
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
      validate: (val, args) => {
        return findCategoryBySlug(val, args.data.id).then(function(result) {  
            if (result.totalDocs > 0) {
              return "This slug is already in use by category " + result.docs[0].name;
            } else {
              return true;
            }
        }).then(function(result) {
            if (result !== true) {
              // already matched a category so early return - cannot use this slug
              console.log (result);
              return result
            } else {
              return findPostBySlug(val, args.data.id).then(function(result) {  
                if (result.totalDocs > 0) {
                  return "This slug is already in use by post " + result.docs[0].name;
                } else {
                  return true;
                }
            })  
            }
        });
      },
      admin: {
        components: {
          Field: getSlugInput({ trackingField })
        }
      },
      
    },
    overrides
  );
  async function findCategoryBySlug(slug: String, notId: String) {
    const result = await payload.find({
      collection: 'categories',
      where: {
        and: [{
          or: [
            {
              "slug": {
                equals: slug.toLowerCase()
              },
            },
            {
              "slugs.slug": {
                equals: slug.toLowerCase()
              },
            },
          ]
        },
        {
          id: {
            not_equals: notId
          }
        }
      ]
    }
    });
   return result;
  }
  
  async function findPostBySlug(slug: String, notId: String) {
    const result = await payload.find({
      collection: 'posts',
      where: {
        and: [{
          or: [
            {
              "slug": {
                equals: slug.toLowerCase()
              },
            },
            {
              "slugs.slug": {
                equals: slug.toLowerCase()
              },
            },
          ]
        },
        {
          id: {
            not_equals: notId
          }
        }
      ]
    }
    });
   return result;
  }