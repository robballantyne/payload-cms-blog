import { slug } from "../fields/slug/slug.ts";

const Categories = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      ({
        data, // incoming data to update or create with
        req, // full express request
        operation, // name of the operation ie. 'create', 'update'
        originalDoc, // original document
      }) => {
        // Add the slug to the assigned slugs array if not already present
        if (!data.slugs.filter(e => e.slug === data.slug).length > 0) {
          data.slugs.unshift({slug: data.slug});
        }
        return data;
      } 
    ]
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    slug({ trackingField: 'name' }),
    {
      name: 'slugs', // required
      type: 'array', // required
      label: 'Assigned Slugs',
      labels: {
        singular: 'Slug',
        plural: 'Slugs',
      },
      admin: {
        description: 'To enable redirects to the current slug',
      },
      fields: [ // required
        {
          name: 'slug',
          type: 'text',
        }
      ],
    }
  ],
  timestamps: false,
}

export default Categories;