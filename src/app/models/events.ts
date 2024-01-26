import { CollectionChain } from "./collections";

export type EventStatus = "Live" | "Upcoming" | "Ended";

export enum EVENT_STATUS {
  LIVE = "Live",
  UPCOMING = "Upcoming",
  ENDED = "Ended",
}

export interface IEventRelated {
  link: string;
  avatar: string;
}

export interface IEvent {
  address: string;

  chainKey: CollectionChain;

  name: string;

  owner: string;

  status: EventStatus;

  totalItem: string | number;

  totalVolume: number;

  floorPrice: number;

  bestOffer: number;

  listed: number;

  logo: string;

  avatar: string;

  banner: string;

  minted: number;

  price: number;

  related: IEventRelated[];
}

export const mocktEvent = (): IEvent[] => [
  {
    address: "123456",

    chainKey: "starknet",

    name: "Starksport NFT",

    owner: "STARKFINANCE",

    status: "Live",

    totalItem: 3000,

    totalVolume: 68.68,

    floorPrice: 0.02,

    bestOffer: 0.01,

    listed: 5,

    logo: "https://s3-alpha-sig.figma.com/img/fc25/37b4/00ca88bf9525bbc787d7f8144150c712?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MrT4gEJmYxUBU2CjGQhIlOqY-bG6QQ5~7ws7NUWREFVMAHJW8Y~VZLrhGbBKqgDYbqAPKAUZ6U2c2LnZ-1NikwIP4l1W9gmP4depTHDE1PGrC1DQk1sL1mpB-aG-ClHrxspWgqQTHhWoIltywR28ChAYYNxJ-Bb~P1s7V-u1RiWT2FpMHzn0GMDJCCgPsXAjm1-~jLdXexstIXy9gtsGR2YbZC~59WuudapbxKVwTCx8J75Wdpn730eJMh5TeVmOPZ3Cw89mNiKSC2~-nIrsDdKMHYQ-eo4hsNhBu-D5Svp8mAjT2crdrtCr-MVe7wZGHjRqv20Qf3cEy5jTomsMfA__",

    avatar:
      "https://s3-alpha-sig.figma.com/img/a023/b262/dffbb7236b4be3ff377f2d134b804d77?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BgGq4igGeAn3xNBst69nJXDu75yjs-N19qBF4Jp9pV7JWstplLRRTMnu7oEiCEr53cvPlF~5g6CuZKJh1PmGO0GU4C1ueorCDgeV~xX3sE5SSwTgu774hxz1TPNabibpy~Wy4rhBStFKMU4ydsV70D1yPJtMP~K-tW42CVT6OGHahT9tfm3H2tX83XQ6Wh-3ObeVKOyJXPoz3NsfSvGbmjaV0tHZSCyLbMOU2FjWaRV17ZUUT8sqgAhNLCqykYw-M1BXwAf5RwN7mT0~AnEGdcgEuGGEW7Yl79VL-mB9tqshBdOmTbEKMb04JASQGC-YQnmuaWv7OjjB88YRxpl71w__",

    banner:
      "https://s3-alpha-sig.figma.com/img/6156/f287/516944adfc3402c5f4db978e1c99abee?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ex12NL4bnBKVefByFfjCrX1uY6uNiJ--f5NQsJrRhDjtiWIdUv3dLKIL4lBHJINPqHGb834xR8MYpPZfu~tSS3seKSHJN-ZHvbQj8NWSI1OlI-x59Qyqw7i3ZDEGtXMDtM9xMaA5CgUo5igTXFq2Fu9xf6HUaoo9xPbkSDlogAF1RwAyKQkKY5xlVdYnj27oGphKQpehOvkWupWYyI545KUQ0fcZzHuP8WMbjDLn16QzmNljLGl5fS9b~YPLHFTCgpMd2AmY4DxjzQQlZl2LlOPnSc7emHAVIh7g6BYtPiaU7aCyVqojDu4i7LGoYAZj-n5EszKE0B9YseaLvvPnQg__",

    minted: 810,

    price: 0.0013,

    related: [
      {
        link: "",
        avatar:
          "https://s3-alpha-sig.figma.com/img/c4c9/e0a8/b0f0580c66137e005ffaa74725d2d2fa?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ol7GNAB4M~OYiJq4aOzfFc05XRk0r30HeHO8gTdEvpH2shQbQ9a0wluABbYlBYxAmSn9XS-kiXkbputVwz976WR85HBrfveELiTQSDnHu-KylBBYQfw-EbJ9kAwS9cidQ4dPts1xM7yFv~H6U8MDpxvI4i8TNiVUk-GLlDC1WnEnJG9z6yE6ZyPkuIfX7Fc7lB-ZUJzp8AovWV7rjoZMJ6aScYbMcf6W45hV~kox3Lt3EMLTdqRPQ9smZCIqGcC86NLccq83cd0s2Uh2Et7kAKWYNDLcOmqtymr0ES6ibTifC4hKIZ6ueGkjiW4V1sumCbGxhH62fFFAogqXcDLgdg__",
      },
      {
        link: "",
        avatar:
          "https://s3-alpha-sig.figma.com/img/5352/61cd/05f112c424b6fb6a64f28056732f4891?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i61WZuXwPCerOc9rjM1iYGB1HgQgz-qK~TAS63Gs-L8w~VgQ2EqVnd6mtlVQvY8jz6vWNPv3-JbAqR2p~2dwjX5v3gaJznkQScQJybLenGAgun79Rh5AdlUhu9H-zaTIVCUtZ3-XutyDDVkuPCk2FPcUJc5UG9Jea9RA220Cs3HBt0U552COxU7KoFSoSrs3dwaGvySXecdu9eA~W~hzRfqdOjQePrl~dnHPJcLWYu64dgCaF-bIaIUqCv3cHNQE09I5xpPfPC1Ou0PySWETzGecJPV8NdsGY9HwwQBHH1VuqmWZz~OYBXEiYsaUyBPbEvG-psjWrmJUHsLklPahrA__",
      },
      {
        link: "",
        avatar:
          "https://s3-alpha-sig.figma.com/img/de25/8391/363705c18ad9476cc435db1c441956e4?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E8GJWbOjeILTeiIcDGccRWynE-lPHBTBCtf6bqmhjAZhw8MG~Mi7eFAulmWlJYVAoJMDZmC8wLplSck-kBN79FYH5qWRHqZrwfj8-pBkK-PEh~em9q9h2MEkVYjJjsEeIrlIgzVVagF5P-txnzEhCaf3KQcb6tDQ8XbS3RoBO1JgCWi3rpQgbZvReA4L3d8lnjQmu1jIlg1YDBlIPmzCoJRQoNTL426nv-4BRGQuElbLj3j9lc~m6uoDuY3g8EbTSgRV745OPmcmEavybVwarcy8FI6cEQKZqKjpscCm-Y~Q8hltY1NOWv3YsQPEaVBOZt2vBS8IPUFWqfKCqPNZEw__",
      },
      {
        link: "",
        avatar:
          "https://s3-alpha-sig.figma.com/img/395a/fe82/3af0fe479dbc9dce8c13a3fc1e46ae08?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=V~bTrAZmkZzInZSHdQI~9Cn0Wp9dxErAKaxQxLMfcPBQxleTEOHwt5i2ynS9AJ1-jnaDdGrX2gHU-Q2igolPmAXYonFdawH8sg-oXfQHrDjRQNgJblnj5P1dLNTkELfXmx4Yz0YGNbpoSOZvX~9fI9eHLFdPM6g22zGmndkSHD5boQ2ohwxMIy4WGHtWSifIIJSAro6V3en6IkQ6JvHgFrq90klMULh~ySM7RX00g7a7a~kohieYXCg~h3fLgTOUsEopphSFWqo8rMCU2NR4z4tPWqf~s1UZ8VZKnNRFBFayCPBT-yYFdQxUmdqAI8hkcSDMo9qJFrDe3-2904hn6Q__",
      },
    ],
  },
  {
    address: "123457",

    chainKey: "starknet",

    name: "Premier League 2023 - 2024",

    owner: "STARKFINANCE",

    status: "Live",

    totalItem: "No limit",

    totalVolume: 3.45,

    floorPrice: 0.0005,

    bestOffer: 0.0004,

    listed: 5,

    logo: "https://s3-alpha-sig.figma.com/img/37e0/0de4/f38d3e505d89000826e82cdabebd26db?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bXyG0zqPHxQmm-JYg85GJShI7Fn2RpKGG4XjmTJvFZlhyGq0Rq-DZL3qJA4FEgtAGvfkop3ABWdjrSFh-oi8mIpODpD0uUqwdTq7KFU-GNiCyo4k3miF~YHRfKEWVUTdWa9cuBLoIwCNSmr0IqRSQuQas9W7IxO5R3pq~2c4O28fEIu4L3nD9UDl-9Hnicgnd1Q2eZCGY4kDWrdkC7J4Zko-wXwCtVg-NXoOvSxfqn~JdjcE8v2GFFxg1-ZFsqaRTmB39rTfDefX0XnPnGcqLRweJncahIThPfbA92dELrfFd2t75QgDyUK1KSfU2HpNUkteXITskXPGmTrfiL37Rg__",

    avatar:
      "https://s3-alpha-sig.figma.com/img/37e0/0de4/f38d3e505d89000826e82cdabebd26db?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bXyG0zqPHxQmm-JYg85GJShI7Fn2RpKGG4XjmTJvFZlhyGq0Rq-DZL3qJA4FEgtAGvfkop3ABWdjrSFh-oi8mIpODpD0uUqwdTq7KFU-GNiCyo4k3miF~YHRfKEWVUTdWa9cuBLoIwCNSmr0IqRSQuQas9W7IxO5R3pq~2c4O28fEIu4L3nD9UDl-9Hnicgnd1Q2eZCGY4kDWrdkC7J4Zko-wXwCtVg-NXoOvSxfqn~JdjcE8v2GFFxg1-ZFsqaRTmB39rTfDefX0XnPnGcqLRweJncahIThPfbA92dELrfFd2t75QgDyUK1KSfU2HpNUkteXITskXPGmTrfiL37Rg__",

    banner:
      "https://s3-alpha-sig.figma.com/img/ee0a/e21a/2af99c091dc3aba6e5a343334dbefb94?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Iae7cWd-qBfORJo96Tx7bI0h91Y7w5jdsVumBywVgBeVLMSm-tU2azxb3qq3D-cjMFo8CE9v5Hz53Cp7KQTM1wuhTVe8kRPkGu0giQNQDWqMufIeELKgVnRg7ULJDFz2l4ezCc4rQRfpfYVMqWj5NtSMAaUE~TD-9ggd90bhuwXI~ccMl~cg4FZ5tWw3re6hYVzKD5QWPJPoQxPyl6-rM4etHFEjF7x9CVdBlh78pEh-oJCZE1TSKoO99ZiyXtCeGf2zFaK8rkH4qtz1uwT-psoojGMEKvob2-Wo7GQscLqUiz8vaZL~~3~3oU61TyPoXnO1IL6f4VVp4SpJHWKzEQ__",

    minted: 810,

    price: 0.0013,

    related: [
      {
        link: "",
        avatar:
          "https://s3-alpha-sig.figma.com/img/743b/c20c/f180708d9e9a1cdfeb4488fc3eaa04a6?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=h5aOqkfnJ8W-ZAoMSxM2WqmXF9a2HeHFpmVr14Z6VA5qnF-0vIM54pESiQ2GiMu9o8wx2RKGb0t5WNlz5neLezDCmsVcQzv8Cw0CGZCmwAekKu66QFgGU--2nKQ18w8EglDGgIKFhGOa9KBrdhsTnk1Js0r~Zt4VecmtssPfZLIQdWV~ctGz2A8x15DtmIu5tIW3kpK2aCIohCMcR36T7esMyNflizSQWyVNG2E3zN6K8rW14zK7y0bvY7KvPA53e9QA2aFnkeLPYkWGs7msOBG~wCkX~qFo6GbbQKU4vxqm6UYYxOyfPOkjX5fOHEs3YRSQ1Or5bYxrJpmPFThmyw__",
      },
      {
        link: "",
        avatar:
          "https://s3-alpha-sig.figma.com/img/ee0a/e21a/2af99c091dc3aba6e5a343334dbefb94?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Iae7cWd-qBfORJo96Tx7bI0h91Y7w5jdsVumBywVgBeVLMSm-tU2azxb3qq3D-cjMFo8CE9v5Hz53Cp7KQTM1wuhTVe8kRPkGu0giQNQDWqMufIeELKgVnRg7ULJDFz2l4ezCc4rQRfpfYVMqWj5NtSMAaUE~TD-9ggd90bhuwXI~ccMl~cg4FZ5tWw3re6hYVzKD5QWPJPoQxPyl6-rM4etHFEjF7x9CVdBlh78pEh-oJCZE1TSKoO99ZiyXtCeGf2zFaK8rkH4qtz1uwT-psoojGMEKvob2-Wo7GQscLqUiz8vaZL~~3~3oU61TyPoXnO1IL6f4VVp4SpJHWKzEQ__",
      },
      {
        link: "",
        avatar:
          "https://s3-alpha-sig.figma.com/img/c7d4/3e92/ff517e1db3c3935e04e74dbdac121cbc?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=f3DSUDsEMP~sUWeImpgmJ3DvKCCLG0gBWYfsFiMOxWcCO1USCsCr42eUGRp~BMFKEfpH4u1g-XDvLqp~GD~iYvtQ5nMTtadip6EmgE02WOR22PXbC0X71sMO4mntqqYc5L0HmJhUjrSCZ-qp1yXoWgaqVwV1UsOgAWRcrjEr81maaaiFfIxKWUM8RKrj3BAy~Q4a5jeXnxGdd5AKJKqGCC5ucGOZ7mLr92HQyKPM-zxtG-gNuiJe2pQj7KLF1t2FL1dfpAON5SZ4EkaECPE275pieaCtzMNiLbkDkxdvgkR~sIckxXw6DSYZuejRHk2tsSj6nocsRw8GpRvh0Wx0nw__",
      },
      {
        link: "",
        avatar:
          "https://s3-alpha-sig.figma.com/img/7074/e674/71ce0015165dc132f24f28d7a138b512?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MS~WPTGCW8fwWFf0afJfLRlgtDTu96JuRBRm~NIL8NjScclJFV1lbXmnlyeadHmNmMyx7yp8uXnj5tdSv8R5xMFUjOMwjmnSEKrdCLlYHUbom23M5kyEYMxlhwQ402EPZpxJf~L9ggAoo34OYA7CdV6CK85ZfgQnXka3LEpOnNt0gu50gCqt2VRHIMyU2HUr5fKixJEbJsI8LuAYwZrEnrQWhihLK4JYMTsnvjvwkZSm8njOTYFGFTmVwcJloVV-wQDOdyhNTrVmqeouOwfEcdVq2PRFslfc5YhrB5WMXsbslbRbKSVKPxC8Rn0JoEDOsBQyytrnTdhtJKjgZN0EXA__",
      },
    ],
  },
  {
    address: "123458",

    chainKey: "starknet",

    name: "UEFA Champions League 2023 - 2024",

    owner: "STARKFINANCE",

    status: "Live",

    totalItem: "No limit",

    totalVolume: 3.45,

    floorPrice: 0.0005,

    bestOffer: 0.0004,

    listed: 5,

    logo: "https://s3-alpha-sig.figma.com/img/bf8b/81a9/7398455ddf9eade1fa54d6af844ba542?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hicgd03ywGA8SWbcPzOZw~tXH6tlsajWhbDy-woP-3ZahM9VYDwAxtnp8Bkh2IKK6JFG4X-pDKr068s6jG-bSJG0kwtl8yupud-W9hqH~YxgWr-TJdzx6czRZZDnZLg8FlHfK68LLTKzDt-JRCtyM3Nk7--BAiLVEWrDSk~iwcdocLCZPM-bOyfumus23a-eQn7OzmQwgExO2u~Jzzn-JJSdYw1RlEoeAe5y3kk0eHuBpGm8YGCX14W2MMee~f8C~psTHwfmI9sCF~xcIs~IFBoqB1l-Zi80G6O-j148Ynaeu8CjKM2O807EyopcJBPnFzZrFXXHhNgXaRtnGtq8Jw__",

    avatar:
      "https://s3-alpha-sig.figma.com/img/a023/b262/dffbb7236b4be3ff377f2d134b804d77?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BgGq4igGeAn3xNBst69nJXDu75yjs-N19qBF4Jp9pV7JWstplLRRTMnu7oEiCEr53cvPlF~5g6CuZKJh1PmGO0GU4C1ueorCDgeV~xX3sE5SSwTgu774hxz1TPNabibpy~Wy4rhBStFKMU4ydsV70D1yPJtMP~K-tW42CVT6OGHahT9tfm3H2tX83XQ6Wh-3ObeVKOyJXPoz3NsfSvGbmjaV0tHZSCyLbMOU2FjWaRV17ZUUT8sqgAhNLCqykYw-M1BXwAf5RwN7mT0~AnEGdcgEuGGEW7Yl79VL-mB9tqshBdOmTbEKMb04JASQGC-YQnmuaWv7OjjB88YRxpl71w__",

    banner:
      "https://s3-alpha-sig.figma.com/img/f0e8/83ea/59aa7c99ebf2d74d7642b9ebe63e0cd9?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=T3CH3mJdCBVYu0dlrksuZ-xe0Ch3-K2E21aLEO0TcXhd~trNB4Tz7J1bHIVJs~1yZZQ7spR8WKBUqsH5hm4g36XizV8IHitUlPmwH7-nWXyK7ODKsy48b9YD~XWOoiztu7ZUMcT3cAdRqXwZq3bHmbJewnvWqTkbLGg75-MRv~zi1AnOaI7zpOIYKtUmPkPc3LM9p1CA68A9j0L3WqZbYJuIO5NZc3dkqGQoSUutVVa3v2duj44b-MyKQZl4ZvDKfDieX~oeNSK8yznfajUy4mdRH-LiHBRulgrLHBZyVvAKGRTktK1Ru8iXchj1rHF2bnW5Y~Jie7GmkvngvikgIw__",

    minted: 1622,

    price: 0.0013,

    related: [
      {
        link: "",
        avatar:
          "https://s3-alpha-sig.figma.com/img/c4c9/e0a8/b0f0580c66137e005ffaa74725d2d2fa?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ol7GNAB4M~OYiJq4aOzfFc05XRk0r30HeHO8gTdEvpH2shQbQ9a0wluABbYlBYxAmSn9XS-kiXkbputVwz976WR85HBrfveELiTQSDnHu-KylBBYQfw-EbJ9kAwS9cidQ4dPts1xM7yFv~H6U8MDpxvI4i8TNiVUk-GLlDC1WnEnJG9z6yE6ZyPkuIfX7Fc7lB-ZUJzp8AovWV7rjoZMJ6aScYbMcf6W45hV~kox3Lt3EMLTdqRPQ9smZCIqGcC86NLccq83cd0s2Uh2Et7kAKWYNDLcOmqtymr0ES6ibTifC4hKIZ6ueGkjiW4V1sumCbGxhH62fFFAogqXcDLgdg__",
      },
      {
        link: "",
        avatar:
          "https://s3-alpha-sig.figma.com/img/5352/61cd/05f112c424b6fb6a64f28056732f4891?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i61WZuXwPCerOc9rjM1iYGB1HgQgz-qK~TAS63Gs-L8w~VgQ2EqVnd6mtlVQvY8jz6vWNPv3-JbAqR2p~2dwjX5v3gaJznkQScQJybLenGAgun79Rh5AdlUhu9H-zaTIVCUtZ3-XutyDDVkuPCk2FPcUJc5UG9Jea9RA220Cs3HBt0U552COxU7KoFSoSrs3dwaGvySXecdu9eA~W~hzRfqdOjQePrl~dnHPJcLWYu64dgCaF-bIaIUqCv3cHNQE09I5xpPfPC1Ou0PySWETzGecJPV8NdsGY9HwwQBHH1VuqmWZz~OYBXEiYsaUyBPbEvG-psjWrmJUHsLklPahrA__",
      },
      {
        link: "",
        avatar:
          "https://s3-alpha-sig.figma.com/img/de25/8391/363705c18ad9476cc435db1c441956e4?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E8GJWbOjeILTeiIcDGccRWynE-lPHBTBCtf6bqmhjAZhw8MG~Mi7eFAulmWlJYVAoJMDZmC8wLplSck-kBN79FYH5qWRHqZrwfj8-pBkK-PEh~em9q9h2MEkVYjJjsEeIrlIgzVVagF5P-txnzEhCaf3KQcb6tDQ8XbS3RoBO1JgCWi3rpQgbZvReA4L3d8lnjQmu1jIlg1YDBlIPmzCoJRQoNTL426nv-4BRGQuElbLj3j9lc~m6uoDuY3g8EbTSgRV745OPmcmEavybVwarcy8FI6cEQKZqKjpscCm-Y~Q8hltY1NOWv3YsQPEaVBOZt2vBS8IPUFWqfKCqPNZEw__",
      },
      {
        link: "",
        avatar:
          "https://s3-alpha-sig.figma.com/img/395a/fe82/3af0fe479dbc9dce8c13a3fc1e46ae08?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=V~bTrAZmkZzInZSHdQI~9Cn0Wp9dxErAKaxQxLMfcPBQxleTEOHwt5i2ynS9AJ1-jnaDdGrX2gHU-Q2igolPmAXYonFdawH8sg-oXfQHrDjRQNgJblnj5P1dLNTkELfXmx4Yz0YGNbpoSOZvX~9fI9eHLFdPM6g22zGmndkSHD5boQ2ohwxMIy4WGHtWSifIIJSAro6V3en6IkQ6JvHgFrq90klMULh~ySM7RX00g7a7a~kohieYXCg~h3fLgTOUsEopphSFWqo8rMCU2NR4z4tPWqf~s1UZ8VZKnNRFBFayCPBT-yYFdQxUmdqAI8hkcSDMo9qJFrDe3-2904hn6Q__",
      },
    ],
  },
  {
    address: "123456",

    chainKey: "starknet",

    name: "Starksport NFT",

    owner: "STARKFINANCE",

    status: "Live",

    totalItem: 3000,

    totalVolume: 68.68,

    floorPrice: 0.02,

    bestOffer: 0.01,

    listed: 5,

    logo: "https://s3-alpha-sig.figma.com/img/fc25/37b4/00ca88bf9525bbc787d7f8144150c712?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MrT4gEJmYxUBU2CjGQhIlOqY-bG6QQ5~7ws7NUWREFVMAHJW8Y~VZLrhGbBKqgDYbqAPKAUZ6U2c2LnZ-1NikwIP4l1W9gmP4depTHDE1PGrC1DQk1sL1mpB-aG-ClHrxspWgqQTHhWoIltywR28ChAYYNxJ-Bb~P1s7V-u1RiWT2FpMHzn0GMDJCCgPsXAjm1-~jLdXexstIXy9gtsGR2YbZC~59WuudapbxKVwTCx8J75Wdpn730eJMh5TeVmOPZ3Cw89mNiKSC2~-nIrsDdKMHYQ-eo4hsNhBu-D5Svp8mAjT2crdrtCr-MVe7wZGHjRqv20Qf3cEy5jTomsMfA__",

    avatar:
      "https://s3-alpha-sig.figma.com/img/a023/b262/dffbb7236b4be3ff377f2d134b804d77?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BgGq4igGeAn3xNBst69nJXDu75yjs-N19qBF4Jp9pV7JWstplLRRTMnu7oEiCEr53cvPlF~5g6CuZKJh1PmGO0GU4C1ueorCDgeV~xX3sE5SSwTgu774hxz1TPNabibpy~Wy4rhBStFKMU4ydsV70D1yPJtMP~K-tW42CVT6OGHahT9tfm3H2tX83XQ6Wh-3ObeVKOyJXPoz3NsfSvGbmjaV0tHZSCyLbMOU2FjWaRV17ZUUT8sqgAhNLCqykYw-M1BXwAf5RwN7mT0~AnEGdcgEuGGEW7Yl79VL-mB9tqshBdOmTbEKMb04JASQGC-YQnmuaWv7OjjB88YRxpl71w__",

    banner:
      "https://s3-alpha-sig.figma.com/img/6156/f287/516944adfc3402c5f4db978e1c99abee?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ex12NL4bnBKVefByFfjCrX1uY6uNiJ--f5NQsJrRhDjtiWIdUv3dLKIL4lBHJINPqHGb834xR8MYpPZfu~tSS3seKSHJN-ZHvbQj8NWSI1OlI-x59Qyqw7i3ZDEGtXMDtM9xMaA5CgUo5igTXFq2Fu9xf6HUaoo9xPbkSDlogAF1RwAyKQkKY5xlVdYnj27oGphKQpehOvkWupWYyI545KUQ0fcZzHuP8WMbjDLn16QzmNljLGl5fS9b~YPLHFTCgpMd2AmY4DxjzQQlZl2LlOPnSc7emHAVIh7g6BYtPiaU7aCyVqojDu4i7LGoYAZj-n5EszKE0B9YseaLvvPnQg__",

    minted: 810,

    price: 0.0013,

    related: [
      {
        link: "",
        avatar:
          "https://s3-alpha-sig.figma.com/img/c4c9/e0a8/b0f0580c66137e005ffaa74725d2d2fa?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ol7GNAB4M~OYiJq4aOzfFc05XRk0r30HeHO8gTdEvpH2shQbQ9a0wluABbYlBYxAmSn9XS-kiXkbputVwz976WR85HBrfveELiTQSDnHu-KylBBYQfw-EbJ9kAwS9cidQ4dPts1xM7yFv~H6U8MDpxvI4i8TNiVUk-GLlDC1WnEnJG9z6yE6ZyPkuIfX7Fc7lB-ZUJzp8AovWV7rjoZMJ6aScYbMcf6W45hV~kox3Lt3EMLTdqRPQ9smZCIqGcC86NLccq83cd0s2Uh2Et7kAKWYNDLcOmqtymr0ES6ibTifC4hKIZ6ueGkjiW4V1sumCbGxhH62fFFAogqXcDLgdg__",
      },
      {
        link: "",
        avatar:
          "https://s3-alpha-sig.figma.com/img/5352/61cd/05f112c424b6fb6a64f28056732f4891?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i61WZuXwPCerOc9rjM1iYGB1HgQgz-qK~TAS63Gs-L8w~VgQ2EqVnd6mtlVQvY8jz6vWNPv3-JbAqR2p~2dwjX5v3gaJznkQScQJybLenGAgun79Rh5AdlUhu9H-zaTIVCUtZ3-XutyDDVkuPCk2FPcUJc5UG9Jea9RA220Cs3HBt0U552COxU7KoFSoSrs3dwaGvySXecdu9eA~W~hzRfqdOjQePrl~dnHPJcLWYu64dgCaF-bIaIUqCv3cHNQE09I5xpPfPC1Ou0PySWETzGecJPV8NdsGY9HwwQBHH1VuqmWZz~OYBXEiYsaUyBPbEvG-psjWrmJUHsLklPahrA__",
      },
      {
        link: "",
        avatar:
          "https://s3-alpha-sig.figma.com/img/de25/8391/363705c18ad9476cc435db1c441956e4?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E8GJWbOjeILTeiIcDGccRWynE-lPHBTBCtf6bqmhjAZhw8MG~Mi7eFAulmWlJYVAoJMDZmC8wLplSck-kBN79FYH5qWRHqZrwfj8-pBkK-PEh~em9q9h2MEkVYjJjsEeIrlIgzVVagF5P-txnzEhCaf3KQcb6tDQ8XbS3RoBO1JgCWi3rpQgbZvReA4L3d8lnjQmu1jIlg1YDBlIPmzCoJRQoNTL426nv-4BRGQuElbLj3j9lc~m6uoDuY3g8EbTSgRV745OPmcmEavybVwarcy8FI6cEQKZqKjpscCm-Y~Q8hltY1NOWv3YsQPEaVBOZt2vBS8IPUFWqfKCqPNZEw__",
      },
      {
        link: "",
        avatar:
          "https://s3-alpha-sig.figma.com/img/395a/fe82/3af0fe479dbc9dce8c13a3fc1e46ae08?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=V~bTrAZmkZzInZSHdQI~9Cn0Wp9dxErAKaxQxLMfcPBQxleTEOHwt5i2ynS9AJ1-jnaDdGrX2gHU-Q2igolPmAXYonFdawH8sg-oXfQHrDjRQNgJblnj5P1dLNTkELfXmx4Yz0YGNbpoSOZvX~9fI9eHLFdPM6g22zGmndkSHD5boQ2ohwxMIy4WGHtWSifIIJSAro6V3en6IkQ6JvHgFrq90klMULh~ySM7RX00g7a7a~kohieYXCg~h3fLgTOUsEopphSFWqo8rMCU2NR4z4tPWqf~s1UZ8VZKnNRFBFayCPBT-yYFdQxUmdqAI8hkcSDMo9qJFrDe3-2904hn6Q__",
      },
    ],
  },
  {
    address: "123456",

    chainKey: "starknet",

    name: "Starksport NFT",

    owner: "STARKFINANCE",

    status: "Live",

    totalItem: 3000,

    totalVolume: 68.68,

    floorPrice: 0.02,

    bestOffer: 0.01,

    listed: 5,

    logo: "https://s3-alpha-sig.figma.com/img/fc25/37b4/00ca88bf9525bbc787d7f8144150c712?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MrT4gEJmYxUBU2CjGQhIlOqY-bG6QQ5~7ws7NUWREFVMAHJW8Y~VZLrhGbBKqgDYbqAPKAUZ6U2c2LnZ-1NikwIP4l1W9gmP4depTHDE1PGrC1DQk1sL1mpB-aG-ClHrxspWgqQTHhWoIltywR28ChAYYNxJ-Bb~P1s7V-u1RiWT2FpMHzn0GMDJCCgPsXAjm1-~jLdXexstIXy9gtsGR2YbZC~59WuudapbxKVwTCx8J75Wdpn730eJMh5TeVmOPZ3Cw89mNiKSC2~-nIrsDdKMHYQ-eo4hsNhBu-D5Svp8mAjT2crdrtCr-MVe7wZGHjRqv20Qf3cEy5jTomsMfA__",

    avatar:
      "https://s3-alpha-sig.figma.com/img/a023/b262/dffbb7236b4be3ff377f2d134b804d77?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BgGq4igGeAn3xNBst69nJXDu75yjs-N19qBF4Jp9pV7JWstplLRRTMnu7oEiCEr53cvPlF~5g6CuZKJh1PmGO0GU4C1ueorCDgeV~xX3sE5SSwTgu774hxz1TPNabibpy~Wy4rhBStFKMU4ydsV70D1yPJtMP~K-tW42CVT6OGHahT9tfm3H2tX83XQ6Wh-3ObeVKOyJXPoz3NsfSvGbmjaV0tHZSCyLbMOU2FjWaRV17ZUUT8sqgAhNLCqykYw-M1BXwAf5RwN7mT0~AnEGdcgEuGGEW7Yl79VL-mB9tqshBdOmTbEKMb04JASQGC-YQnmuaWv7OjjB88YRxpl71w__",

    banner:
      "https://s3-alpha-sig.figma.com/img/6156/f287/516944adfc3402c5f4db978e1c99abee?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ex12NL4bnBKVefByFfjCrX1uY6uNiJ--f5NQsJrRhDjtiWIdUv3dLKIL4lBHJINPqHGb834xR8MYpPZfu~tSS3seKSHJN-ZHvbQj8NWSI1OlI-x59Qyqw7i3ZDEGtXMDtM9xMaA5CgUo5igTXFq2Fu9xf6HUaoo9xPbkSDlogAF1RwAyKQkKY5xlVdYnj27oGphKQpehOvkWupWYyI545KUQ0fcZzHuP8WMbjDLn16QzmNljLGl5fS9b~YPLHFTCgpMd2AmY4DxjzQQlZl2LlOPnSc7emHAVIh7g6BYtPiaU7aCyVqojDu4i7LGoYAZj-n5EszKE0B9YseaLvvPnQg__",

    minted: 810,

    price: 0.0013,

    related: [
      {
        link: "",
        avatar:
          "https://s3-alpha-sig.figma.com/img/c4c9/e0a8/b0f0580c66137e005ffaa74725d2d2fa?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ol7GNAB4M~OYiJq4aOzfFc05XRk0r30HeHO8gTdEvpH2shQbQ9a0wluABbYlBYxAmSn9XS-kiXkbputVwz976WR85HBrfveELiTQSDnHu-KylBBYQfw-EbJ9kAwS9cidQ4dPts1xM7yFv~H6U8MDpxvI4i8TNiVUk-GLlDC1WnEnJG9z6yE6ZyPkuIfX7Fc7lB-ZUJzp8AovWV7rjoZMJ6aScYbMcf6W45hV~kox3Lt3EMLTdqRPQ9smZCIqGcC86NLccq83cd0s2Uh2Et7kAKWYNDLcOmqtymr0ES6ibTifC4hKIZ6ueGkjiW4V1sumCbGxhH62fFFAogqXcDLgdg__",
      },
      {
        link: "",
        avatar:
          "https://s3-alpha-sig.figma.com/img/5352/61cd/05f112c424b6fb6a64f28056732f4891?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i61WZuXwPCerOc9rjM1iYGB1HgQgz-qK~TAS63Gs-L8w~VgQ2EqVnd6mtlVQvY8jz6vWNPv3-JbAqR2p~2dwjX5v3gaJznkQScQJybLenGAgun79Rh5AdlUhu9H-zaTIVCUtZ3-XutyDDVkuPCk2FPcUJc5UG9Jea9RA220Cs3HBt0U552COxU7KoFSoSrs3dwaGvySXecdu9eA~W~hzRfqdOjQePrl~dnHPJcLWYu64dgCaF-bIaIUqCv3cHNQE09I5xpPfPC1Ou0PySWETzGecJPV8NdsGY9HwwQBHH1VuqmWZz~OYBXEiYsaUyBPbEvG-psjWrmJUHsLklPahrA__",
      },
      {
        link: "",
        avatar:
          "https://s3-alpha-sig.figma.com/img/de25/8391/363705c18ad9476cc435db1c441956e4?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E8GJWbOjeILTeiIcDGccRWynE-lPHBTBCtf6bqmhjAZhw8MG~Mi7eFAulmWlJYVAoJMDZmC8wLplSck-kBN79FYH5qWRHqZrwfj8-pBkK-PEh~em9q9h2MEkVYjJjsEeIrlIgzVVagF5P-txnzEhCaf3KQcb6tDQ8XbS3RoBO1JgCWi3rpQgbZvReA4L3d8lnjQmu1jIlg1YDBlIPmzCoJRQoNTL426nv-4BRGQuElbLj3j9lc~m6uoDuY3g8EbTSgRV745OPmcmEavybVwarcy8FI6cEQKZqKjpscCm-Y~Q8hltY1NOWv3YsQPEaVBOZt2vBS8IPUFWqfKCqPNZEw__",
      },
      {
        link: "",
        avatar:
          "https://s3-alpha-sig.figma.com/img/395a/fe82/3af0fe479dbc9dce8c13a3fc1e46ae08?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=V~bTrAZmkZzInZSHdQI~9Cn0Wp9dxErAKaxQxLMfcPBQxleTEOHwt5i2ynS9AJ1-jnaDdGrX2gHU-Q2igolPmAXYonFdawH8sg-oXfQHrDjRQNgJblnj5P1dLNTkELfXmx4Yz0YGNbpoSOZvX~9fI9eHLFdPM6g22zGmndkSHD5boQ2ohwxMIy4WGHtWSifIIJSAro6V3en6IkQ6JvHgFrq90klMULh~ySM7RX00g7a7a~kohieYXCg~h3fLgTOUsEopphSFWqo8rMCU2NR4z4tPWqf~s1UZ8VZKnNRFBFayCPBT-yYFdQxUmdqAI8hkcSDMo9qJFrDe3-2904hn6Q__",
      },
    ],
  },
];

export interface IEventCollection {}

export interface IEventStatusList {
  label: string;
  value: EventStatus;
}

export const eventStatusList = (): IEventStatusList[] => [
  {
    label: "Live",
    value: "Live",
  },
  {
    label: "Upcoming",
    value: "Upcoming",
  },
  {
    label: "Ended",
    value: "Ended",
  },
];
