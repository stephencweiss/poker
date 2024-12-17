import { setup, assign } from "xstate";

type Context = { isBroken: boolean; }
export const machine = setup({
  types: {
    context: {} as Context,
    events: {} as
      | { type: "turn on" }
      | { type: "turn_off" }
      | { type: "break" },
  },
  actions: {
    breakBulb: function ({ context, event }, params) {
      if(event.type === 'break'){
        return ({...context, isBroken: true})
      }
    },
  },
  guards: {
    not_broken: function ({ context }: { context: Context }) {
      return !context.isBroken;
    },
  },
}).createMachine({
  context: {},
  id: "light bulb",
  initial: "unlit",
  states: {
    unlit: {
      on: {
        "turn on": {
          target: "lit",
          guard: {
            type: "not_broken",
          },
        },
        break: {
          target: "broken",
        },
      },
    },
    lit: {
      on: {
        turn_off: {
          target: "unlit",
          guard: {
            type: "not_broken",
          },
        },
        break: {
          target: "broken",

        },
      },
    },
    broken: {
      type: "final",
    },
  },
});