export const factoryabi = [
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
