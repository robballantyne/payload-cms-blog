import { slug } from "../fields/slug/slug.ts";

const Categories = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    slug({ trackingField: 'name' })
  ],
  timestamps: false,
}

export default Categories;