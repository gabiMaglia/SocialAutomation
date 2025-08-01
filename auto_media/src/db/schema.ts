import { pgTable, serial, text, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const socialMediaEnum = pgEnum('social_media', ['facebook', 'linkedin']);

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title'),
  output: text('output').notNull(),
  date: timestamp('date', { withTimezone: true }),
  imageUrl: text('image_url'),
  posted: boolean('posted').notNull().default(false),
  socialNetwor: socialMediaEnum('social_networ').notNull(),
});
