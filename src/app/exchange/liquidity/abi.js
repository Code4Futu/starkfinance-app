const erc20abi = [
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
        name: "from_",
        type: "felt",
      },
      {
        name: "to",
        type: "felt",
      },
      {
        name: "value",
        type: "Uint256",
      },
    ],
    keys: [],
    name: "Transfer",
    type: "event",
  },
  {
    data: [
      {
        name: "owner",
        type: "felt",
      },
      {
        name: "spender",
        type: "felt",
      },
      {
        name: "value",
        type: "Uint256",
      },
    ],
    keys: [],
    name: "Approval",
    type: "event",
  },
  {
    data: [
      {
        name: "account",
        type: "felt",
      },
    ],
    keys: [],
    name: "Paused",
    type: "event",
  },
  {
    data: [
      {
        name: "account",
        type: "felt",
      },
    ],
    keys: [],
    name: "Unpaused",
    type: "event",
  },
  {
    data: [
      {
        name: "previousOwner",
        type: "felt",
      },
      {
        name: "newOwner",
        type: "felt",
      },
    ],
    keys: [],
    name: "OwnershipTransferred",
    type: "event",
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
        name: "owner",
        type: "felt",
      },
      {
        name: "recipient",
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
    name: "name",
    outputs: [
      {
        name: "name",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "symbol",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "totalSupply",
        type: "Uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "decimals",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "account",
        type: "felt",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "Uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "owner",
        type: "felt",
      },
      {
        name: "spender",
        type: "felt",
      },
    ],
    name: "allowance",
    outputs: [
      {
        name: "remaining",
        type: "Uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        name: "paused",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        name: "owner",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "recipient",
        type: "felt",
      },
      {
        name: "amount",
        type: "Uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "success",
        type: "felt",
      },
    ],
    type: "function",
  },
  {
    inputs: [
      {
        name: "sender",
        type: "felt",
      },
      {
        name: "recipient",
        type: "felt",
      },
      {
        name: "amount",
        type: "Uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "success",
        type: "felt",
      },
    ],
    type: "function",
  },
  {
    inputs: [
      {
        name: "spender",
        type: "felt",
      },
      {
        name: "amount",
        type: "Uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "success",
        type: "felt",
      },
    ],
    type: "function",
  },
  {
    inputs: [
      {
        name: "spender",
        type: "felt",
      },
      {
        name: "added_value",
        type: "Uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        name: "success",
        type: "felt",
      },
    ],
    type: "function",
  },
  {
    inputs: [
      {
        name: "spender",
        type: "felt",
      },
      {
        name: "subtracted_value",
        type: "Uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        name: "success",
        type: "felt",
      },
    ],
    type: "function",
  },
  {
    inputs: [
      {
        name: "newOwner",
        type: "felt",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    type: "function",
  },
  {
    inputs: [
      {
        name: "new_implementation",
        type: "felt",
      },
    ],
    name: "upgrade",
    outputs: [],
    type: "function",
  },
];

const routerabi = [
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

const factoryabi = [
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
    data: [
      {
        name: "token0",
        type: "felt",
      },
      {
        name: "token1",
        type: "felt",
      },
      {
        name: "pair",
        type: "felt",
      },
      {
        name: "total_pairs",
        type: "felt",
      },
    ],
    keys: [],
    name: "PairCreated",
    type: "event",
  },
  {
    inputs: [
      {
        name: "pair_proxy_contract_class_hash",
        type: "felt",
      },
      {
        name: "pair_contract_class_hash",
        type: "felt",
      },
      {
        name: "fee_to_setter",
        type: "felt",
      },
    ],
    name: "initializer",
    outputs: [],
    type: "function",
  },
  {
    inputs: [
      {
        name: "token0",
        type: "felt",
      },
      {
        name: "token1",
        type: "felt",
      },
    ],
    name: "get_pair",
    outputs: [
      {
        name: "pair",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "get_all_pairs",
    outputs: [
      {
        name: "all_pairs_len",
        type: "felt",
      },
      {
        name: "all_pairs",
        type: "felt*",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "get_num_of_pairs",
    outputs: [
      {
        name: "num_of_pairs",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "get_fee_to",
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
    inputs: [],
    name: "get_fee_to_setter",
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
    inputs: [],
    name: "get_pair_contract_class_hash",
    outputs: [
      {
        name: "class_hash",
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
    name: "create_pair",
    outputs: [
      {
        name: "pair",
        type: "felt",
      },
    ],
    type: "function",
  },
  {
    inputs: [
      {
        name: "new_fee_to",
        type: "felt",
      },
    ],
    name: "set_fee_to",
    outputs: [],
    type: "function",
  },
  {
    inputs: [
      {
        name: "new_fee_to_setter",
        type: "felt",
      },
    ],
    name: "set_fee_to_setter",
    outputs: [],
    type: "function",
  },
];

const pairabi = [
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
        name: "from_",
        type: "felt",
      },
      {
        name: "to",
        type: "felt",
      },
      {
        name: "value",
        type: "Uint256",
      },
    ],
    keys: [],
    name: "Transfer",
    type: "event",
  },
  {
    data: [
      {
        name: "owner",
        type: "felt",
      },
      {
        name: "spender",
        type: "felt",
      },
      {
        name: "value",
        type: "Uint256",
      },
    ],
    keys: [],
    name: "Approval",
    type: "event",
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
    data: [
      {
        name: "from_address",
        type: "felt",
      },
      {
        name: "to_address",
        type: "felt",
      },
      {
        name: "amount",
        type: "Uint256",
      },
    ],
    keys: [],
    name: "Transfer",
    type: "event",
  },
  {
    data: [
      {
        name: "owner",
        type: "felt",
      },
      {
        name: "spender",
        type: "felt",
      },
      {
        name: "amount",
        type: "Uint256",
      },
    ],
    keys: [],
    name: "Approval",
    type: "event",
  },
  {
    data: [
      {
        name: "sender",
        type: "felt",
      },
      {
        name: "amount0",
        type: "Uint256",
      },
      {
        name: "amount1",
        type: "Uint256",
      },
    ],
    keys: [],
    name: "Mint",
    type: "event",
  },
  {
    data: [
      {
        name: "sender",
        type: "felt",
      },
      {
        name: "amount0",
        type: "Uint256",
      },
      {
        name: "amount1",
        type: "Uint256",
      },
      {
        name: "to",
        type: "felt",
      },
    ],
    keys: [],
    name: "Burn",
    type: "event",
  },
  {
    data: [
      {
        name: "sender",
        type: "felt",
      },
      {
        name: "amount0In",
        type: "Uint256",
      },
      {
        name: "amount1In",
        type: "Uint256",
      },
      {
        name: "amount0Out",
        type: "Uint256",
      },
      {
        name: "amount1Out",
        type: "Uint256",
      },
      {
        name: "to",
        type: "felt",
      },
    ],
    keys: [],
    name: "Swap",
    type: "event",
  },
  {
    data: [
      {
        name: "reserve0",
        type: "Uint256",
      },
      {
        name: "reserve1",
        type: "Uint256",
      },
    ],
    keys: [],
    name: "Sync",
    type: "event",
  },
  {
    inputs: [
      {
        name: "token0",
        type: "felt",
      },
      {
        name: "token1",
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
    name: "name",
    outputs: [
      {
        name: "name",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "symbol",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "totalSupply",
        type: "Uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "decimals",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "account",
        type: "felt",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "Uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "owner",
        type: "felt",
      },
      {
        name: "spender",
        type: "felt",
      },
    ],
    name: "allowance",
    outputs: [
      {
        name: "remaining",
        type: "Uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token0",
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
    inputs: [],
    name: "token1",
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
    inputs: [],
    name: "get_reserves",
    outputs: [
      {
        name: "reserve0",
        type: "Uint256",
      },
      {
        name: "reserve1",
        type: "Uint256",
      },
      {
        name: "block_timestamp_last",
        type: "felt",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "price_0_cumulative_last",
    outputs: [
      {
        name: "res",
        type: "Uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "price_1_cumulative_last",
    outputs: [
      {
        name: "res",
        type: "Uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "klast",
    outputs: [
      {
        name: "res",
        type: "Uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "recipient",
        type: "felt",
      },
      {
        name: "amount",
        type: "Uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "success",
        type: "felt",
      },
    ],
    type: "function",
  },
  {
    inputs: [
      {
        name: "sender",
        type: "felt",
      },
      {
        name: "recipient",
        type: "felt",
      },
      {
        name: "amount",
        type: "Uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "success",
        type: "felt",
      },
    ],
    type: "function",
  },
  {
    inputs: [
      {
        name: "spender",
        type: "felt",
      },
      {
        name: "amount",
        type: "Uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "success",
        type: "felt",
      },
    ],
    type: "function",
  },
  {
    inputs: [
      {
        name: "spender",
        type: "felt",
      },
      {
        name: "added_value",
        type: "Uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        name: "success",
        type: "felt",
      },
    ],
    type: "function",
  },
  {
    inputs: [
      {
        name: "spender",
        type: "felt",
      },
      {
        name: "subtracted_value",
        type: "Uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        name: "success",
        type: "felt",
      },
    ],
    type: "function",
  },
  {
    inputs: [
      {
        name: "to",
        type: "felt",
      },
    ],
    name: "mint",
    outputs: [
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
        name: "to",
        type: "felt",
      },
    ],
    name: "burn",
    outputs: [
      {
        name: "amount0",
        type: "Uint256",
      },
      {
        name: "amount1",
        type: "Uint256",
      },
    ],
    type: "function",
  },
  {
    inputs: [
      {
        name: "amount0Out",
        type: "Uint256",
      },
      {
        name: "amount1Out",
        type: "Uint256",
      },
      {
        name: "to",
        type: "felt",
      },
      {
        name: "data_len",
        type: "felt",
      },
      {
        name: "data",
        type: "felt*",
      },
    ],
    name: "swap",
    outputs: [],
    type: "function",
  },
  {
    inputs: [
      {
        name: "to",
        type: "felt",
      },
    ],
    name: "skim",
    outputs: [],
    type: "function",
  },
  {
    inputs: [],
    name: "sync",
    outputs: [],
    type: "function",
  },
];

export { erc20abi, routerabi, factoryabi, pairabi };
