import { defineField, defineType } from 'sanity'

export const openRoleType = defineType({
  name: 'openRole',
  title: 'Open Role',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'available',
      title: 'Available',
      type: 'boolean',
      description: 'Green dot if available, red dot if not',
      initialValue: true,
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      options: {
        list: [
          { title: 'Remote', value: 'remote' },
          { title: 'On-site', value: 'onsite' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'remote',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      available: 'available',
    },
    prepare({ title, available }) {
      return {
        title,
        subtitle: available ? '🟢 Available' : '🔴 Not available',
      }
    },
  },
})
