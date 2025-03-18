import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { prismaClient } from "./prism";


const app = new Hono()
const prisma = prismaClient




app.get('/contact', async (c) => {
const contacts = await prisma.contact.findMany();
  return c.json(contacts,200)
});

app.post('/contact', async (c) => {
  const { name, email, phone } = await c.req.json();
  const contact = await prisma.contact.create({
    data: {
      name,
      email,
      phone,
    },
  });
  return c.json(contact, 201);
}); 

app.patch('/contact/:id', async (c) => {  
  const { id } = c.req.param();
  const { name, email, phone } = await c.req.json();
  const contact = await prisma.contact.update({
    where: { id: id },
    data: {
      name,
      email,
      phone,
    },
  });
  return c.json(contact, 200);
}
);  

app.delete('/contact/:id', async (c) => {
  const { id } = c.req.param();
  await prisma.contact.delete({
    where: { id: id },
  });
  return c.json({ message: 'Contact deleted' }, 200);
}); 

app.post

serve(app);
console.log('Server running on http://localhost:3000') ;