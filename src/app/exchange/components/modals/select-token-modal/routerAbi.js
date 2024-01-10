export const routerabi = [
  {
    members: [
      {
        name: "low",
        offset: 0,
        type: "felt",
      },
      {
        name: "high",
        offset: 1,
        type: "felt",
      },
    ],
    name: "Uint256",
    size: 2,
    type: "struct",
  },
  {
    data: [
      {
        name: "implementation",
        type: "felt",
      },
    ],
    keys: [],
    name: "Upgraded",
    type: "event",
  },
  {
    data: [
      {
        name: "previousAdmin",
        type: "felt",
      },
      {
        name: "newAdmin",
        type: "felt",
      },
    ],
    keys: [],
    name: "AdminChanged",
    type: "event",
  },
  {
    inputs: [
      {
        name: "factory",
        type: "felt",
      },
      {
        name: "proxy_admin",
        type: "felt",
      },
    ],
    name: "initializer",
    outputs: [],
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        name: "address",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "tokenA",
        type: "felt",
      },
      {
        name: "tokenB",
        type: "felt",
      },
    ],
    name: "sort_tokens",
    outputs: [
      {
        name: "token0",
        type: "felt",
      },
      {
        name: "token1",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "amountA",
        type: "Uint256",
      },
      {
        name: "reserveA",
        type: "Uint256",
      },
      {
        name: "reserveB",
        type: "Uint256",
      },
    ],
    name: "quote",
    outputs: [
      {
        name: "amountB",
        type: "Uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "amountIn",
        type: "Uint256",
      },
      {
        name: "reserveIn",
        type: "Uint256",
      },
      {
        name: "reserveOut",
        type: "Uint256",
      },
    ],
    name: "get_amount_out",
    outputs: [
      {
        name: "amountOut",
        type: "Uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "amountOut",
        type: "Uint256",
      },
      {
        name: "reserveIn",
        type: "Uint256",
      },
      {
        name: "reserveOut",
        type: "Uint256",
      },
    ],
    name: "get_amount_in",
    outputs: [
      {
        name: "amountIn",
        type: "Uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "amountIn",
        type: "Uint256",
      },
      {
        name: "path_len",
        type: "felt",
      },
      {
        name: "path",
        type: "felt*",
      },
    ],
    name: "get_amounts_out",
    outputs: [
      {
        name: "amounts_len",
        type: "felt",
      },
      {
        name: "amounts",
        type: "Uint256*",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "amountOut",
        type: "Uint256",
      },
      {
        name: "path_len",
        type: "felt",
      },
      {
        name: "path",
        type: "felt*",
      },
    ],
    name: "get_amounts_in",
    outputs: [
      {
        name: "amounts_len",
        type: "felt",
      },
      {
        name: "amounts",
        type: "Uint256*",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "tokenA",
        type: "felt",
      },
      {
        name: "tokenB",
        type: "felt",
      },
      {
        name: "amountADesired",
        type: "Uint256",
      },
      {
        name: "amountBDesired",
        type: "Uint256",
      },
      {
        name: "amountAMin",
        type: "Uint256",
      },
      {
        name: "amountBMin",
        type: "Uint256",
      },
      {
        name: "to",
        type: "felt",
      },
      {
        name: "deadline",
        type: "felt",
      },
    ],
    name: "add_liquidity",
    outputs: [
      {
        name: "amountA",
        type: "Uint256",
      },
      {
        name: "amountB",
        type: "Uint256",
      },
      {
        name: "liquidity",
        type: "Uint256",
      },
    ],
    type: "function",
  },
  {
    inputs: [
      {
        name: "tokenA",
        type: "felt",
      },
      {
        name: "tokenB",
        type: "felt",
      },
      {
        name: "liquidity",
        type: "Uint256",
      },
      {
        name: "amountAMin",
        type: "Uint256",
      },
      {
        name: "amountBMin",
        type: "Uint256",
      },
      {
        name: "to",
        type: "felt",
      },
      {
        name: "deadline",
        type: "felt",
      },
    ],
    name: "remove_liquidity",
    outputs: [
      {
        name: "amountA",
        type: "Uint256",
      },
      {
        name: "amountB",
        type: "Uint256",
      },
    ],
    type: "function",
  },
  {
    inputs: [
      {
        name: "amountIn",
        type: "Uint256",
      },
      {
        name: "amountOutMin",
        type: "Uint256",
      },
      {
        name: "path_len",
        type: "felt",
      },
      {
        name: "path",
        type: "felt*",
      },
      {
        name: "to",
        type: "felt",
      },
      {
        name: "deadline",
        type: "felt",
      },
    ],
    name: "swap_exact_tokens_for_tokens",
    outputs: [
      {
        name: "amounts_len",
        type: "felt",
      },
      {
        name: "amounts",
        type: "Uint256*",
      },
    ],
    type: "function",
  },
  {
    inputs: [
      {
        name: "amountOut",
        type: "Uint256",
      },
      {
        name: "amountInMax",
        type: "Uint256",
      },
      {
        name: "path_len",
        type: "felt",
      },
      {
        name: "path",
        type: "felt*",
      },
      {
        name: "to",
        type: "felt",
      },
      {
        name: "deadline",
        type: "felt",
      },
    ],
    name: "swap_tokens_for_exact_tokens",
    outputs: [
      {
        name: "amounts_len",
        type: "felt",
      },
      {
        name: "amounts",
        type: "Uint256*",
      },
    ],
    type: "function",
  },
];
