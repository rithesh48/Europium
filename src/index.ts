import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { prismaClient } from "./prism";


const app = new Hono()
const prisma = prismaClient




app.get('/contact', async (c) => {
const contacts = await prisma.contact.findMany();
  return c.json(contacts,200)
});

app.post

serve(app);
console.log('Server running on http://localhost:3000') ;