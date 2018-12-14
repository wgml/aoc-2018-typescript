import * as common from './common';

interface Velocity {
  x: number;
  y: number;
}

interface Cart {
  id: number;
  x: number;
  y: number;
  velocity: Velocity;
  counter: number;
}

const velocities = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  stopped: { x: 0, y: 0 },
};

const parseTracks = (
  input: string,
): {
  track: string[][];
  carts: Cart[];
} => {
  const splitInput = input.split('\n').map(line => line.split(''));

  const track: string[][] = [];
  const carts: Cart[] = [];
  let cartId = 0;

  const cartSymbols = ['^', '>', 'v', '<'];
  const velocityMap: Map<string, Velocity> = new Map();
  {
    velocityMap.set('^', velocities.up);
    velocityMap.set('v', velocities.down);
    velocityMap.set('<', velocities.left);
    velocityMap.set('>', velocities.right);
  }

  for (let y = 0; y < splitInput.length; ++y) {
    const line = splitInput[y];
    for (let x = 0; x < line.length; ++x) {
      const symbol = line[x];
      if (cartSymbols.includes(symbol)) {
        const velocity = velocityMap.get(symbol) || velocities.stopped;

        carts.push({ id: cartId++, x, y, velocity, counter: 0 });
        line[x] = 'x';
      }
    }
    track.push(line);
  }

  return { track, carts };
};

const collide = (a: Cart, b: Cart): boolean => {
  if (a.id === b.id) {
    return false;
  }

  return a.x === b.x && a.y === b.y;
};

// next year I'm going to use complex numbers
const tryTurnOnCurve = (cart: Cart, track: string) => {
  const curveMap: Map<string, Map<Velocity, Velocity>> = new Map();
  {
    const velMap1: Map<Velocity, Velocity> = new Map();
    const velMap2: Map<Velocity, Velocity> = new Map();
    // /
    velMap1.set(velocities.right, velocities.up);
    velMap1.set(velocities.left, velocities.down);
    velMap1.set(velocities.down, velocities.left);
    velMap1.set(velocities.up, velocities.right);
    // \
    velMap2.set(velocities.right, velocities.down);
    velMap2.set(velocities.left, velocities.up);
    velMap2.set(velocities.down, velocities.right);
    velMap2.set(velocities.up, velocities.left);

    curveMap.set('/', velMap1);
    curveMap.set('\\', velMap2);
  }

  const curve = curveMap.get(track);
  if (curve) {
    const velocity = curve.get(cart.velocity);
    if (velocity) {
      cart.velocity = velocity;
    }
  }
};

const turnLeft = (cart: Cart) => {
  const v = cart.velocity;
  if (v === velocities.up) {
    cart.velocity = velocities.left;
  } else if (v === velocities.left) {
    cart.velocity = velocities.down;
  } else if (v === velocities.down) {
    cart.velocity = velocities.right;
  } else {
    cart.velocity = velocities.up;
  }
};

const turnRight = (cart: Cart) => {
  const v = cart.velocity;
  if (v === velocities.up) {
    cart.velocity = velocities.right;
  } else if (v === velocities.left) {
    cart.velocity = velocities.up;
  } else if (v === velocities.down) {
    cart.velocity = velocities.left;
  } else {
    cart.velocity = velocities.down;
  }
};

const tryTurnOnIntersection = (cart: Cart, track: string) => {
  if (track !== '+') {
    return;
  }
  if (cart.counter % 3 === 0) {
    turnLeft(cart);
  } else if (cart.counter % 3 === 2) {
    turnRight(cart);
  }
  ++cart.counter;
};

const update = (cart: Cart, track: string[][]) => {
  cart.x += cart.velocity.x;
  cart.y += cart.velocity.y;

  const trackSymbol = track[cart.y][cart.x];
  tryTurnOnCurve(cart, trackSymbol);
  tryTurnOnIntersection(cart, trackSymbol);
};

const cartCompare = (a: Cart, b: Cart): number => {
  if (a.y !== b.y) {
    return a.y - b.y;
  }
  return a.x - b.x;
};

export const first = (input: string) => {
  const parsed = parseTracks(input);
  const track = parsed.track;
  let carts = parsed.carts;

  while (carts.length > 1) {
    carts = carts.sort(cartCompare);

    for (const cart of carts) {
      update(cart, track);

      if (carts.some(c => collide(cart, c))) {
        return `${cart.x},${cart.y}`;
      }
    }
  }
};

export const second = (input: string) => {
  const parsed = parseTracks(input);
  const track = parsed.track;
  let carts = parsed.carts;

  while (carts.length > 1) {
    carts = carts.sort(cartCompare);

    const removable: number[] = [];

    for (const cart of carts) {
      if (removable.includes(cart.id)) {
        continue;
      }
      update(cart, track);

      for (const otherCart of carts) {
        if (collide(cart, otherCart)) {
          removable.push(cart.id);
          removable.push(otherCart.id);
          break;
        }
      }
    }

    carts = carts.filter(c => !removable.includes(c.id));
  }

  return `${carts[0].x},${carts[0].y}`;
};
