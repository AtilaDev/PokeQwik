import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return <>Hola Mundo - Client</>;
});

export const head: DocumentHead = {
  title: 'PokeQwik - Client',
  meta: [
    {
      name: 'description',
      content: 'Client site',
    },
  ],
};
