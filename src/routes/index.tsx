import { $, component$, useSignal } from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export default component$(() => {
  const pokemonId = useSignal<number>(1);
  const voltearPokemon = useSignal<boolean>(false);
  const pokemonReveal = useSignal<boolean>(false);
  const nav = useNavigate();

  const changePokemonId = $((value: number) => {
    if (pokemonId.value + value <= 0) return;
    pokemonId.value += value;
    pokemonReveal.value = false;
  });

  const changeVoltearPokemon = $(() => {
    voltearPokemon.value = !voltearPokemon.value;
  });

  const handlePokemonReveal = $(() => {
    pokemonReveal.value = !pokemonReveal.value;
  });

  const goToPokemon = $(() => {
    nav(`/pokemon/${pokemonId.value}`);
  });

  return (
    <>
      <span class='text-2xl'>Buscador simple</span>
      <div class='text-9xl'>{pokemonId}</div>

      <div onClick$={goToPokemon}>
        <PokemonImage
          id={pokemonId.value}
          backImage={voltearPokemon.value}
          isVisible={pokemonReveal.value}
        />
      </div>

      <div class='mt-2'>
        <button
          onClick$={() => changePokemonId(-1)}
          class='btn btn-primary mr-2'
        >
          Prev
        </button>
        <button
          onClick$={() => changePokemonId(1)}
          class='btn btn-primary mr-2'
        >
          Next
        </button>
        <button onClick$={changeVoltearPokemon} class='btn btn-primary mr-2'>
          Flip
        </button>
        <button onClick$={handlePokemonReveal} class='btn btn-primary'>
          Reveal
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'PokeQwik site',
    },
  ],
};
