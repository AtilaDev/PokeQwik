import { component$, useSignal, useTask$ } from '@builder.io/qwik';

type Props = {
  id: number;
  size?: number;
  backImage?: boolean;
  isVisible?: boolean;
};

export const PokemonImage = component$(
  ({ id, backImage = false, size = 150, isVisible = false }: Props) => {
    const imageLoaded = useSignal(false);

    useTask$(({ track }) => {
      track(() => id);

      imageLoaded.value = false;
    });

    const pokemonSide = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      backImage ? `back/${id}` : id
    }.png`;

    return (
      <div
        class='flex items-center justify-center'
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {!imageLoaded.value && <span>Loading...</span>}

        <img
          width={size}
          height={size}
          src={pokemonSide}
          alt='Pokemon Sprite'
          onLoad$={() => (imageLoaded.value = true)}
          class={[
            { hidden: !imageLoaded.value, 'brightness-0': !isVisible },
            'transition-all',
          ]}
        />
      </div>
    );
  }
);
