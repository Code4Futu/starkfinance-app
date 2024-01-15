import { Modal, Button } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../../assets";
import ModalSettingSwap from "../../../components/ModalSettingSwap";
import useModalSettingSwap from "../../../components/ModalSettingSwap/useModalSettingSwap";
import { route } from "../../../routes/configs";
import PoolComponent from "./Pools";
import "./style.scss";

import { BigNumber } from "@ethersproject/bignumber";
import { formatEther, formatUnits, parseUnits } from "@ethersproject/units";
import { Token, TokenAmount } from "@uniswap/sdk";
import { Fraction } from "@uniswap/sdk-core";
import {
  Field,
  ROUTER_ADDRESS,
  TOKEN_ICON_LIST,
  TOKEN_LIST,
  UNKNOWN_TOKEN_ICON,
  WETH,
} from "../../configs/networks";
import { useActiveWeb3React } from "../../hooks/useActiveWeb3React";
import { approves, getAllowances, getToken } from "../../state/erc20";
import {
  EmptyPool,
  addLiquidityCallback,
  getCurrencyBalances,
  getPoolInfo,
} from "../../state/liquidity";
import { isAddress } from "../../utils";
import useListTokens from "../../hooks/useListTokens";

const FormSwap = ({ isShowAddLiquidity, setIsShowAddLiquidity }) => {
  const {
    account,
    library,
    isConnected: isConnectedEvm,
    chainId,
  } = useActiveWeb3React();

  // add liquidity
  const [tokens, setTokens] = useState({
    [Field.INPUT]: WETH[chainId],
    [Field.OUTPUT]: undefined,
  });
  const [balances, setBalances] = useState();
  const [tokenAmounts, setTokenAmounts] = useState({
    [Field.INPUT]: "",
    [Field.OUTPUT]: "",
  });
  const [parsedTokenAmounts, setParsedTokenAmounts] = useState({
    [Field.INPUT]: undefined,
    [Field.OUTPUT]: undefined,
  });
  const [independentField, setIndependentField] = useState(Field.INPUT);
  const [reloadPool, setReloadPool] = useState(false);
  const [poolInfo, setPoolInfo] = useState(EmptyPool);
  const [submitting, setSubmitting] = useState(false);
  const [typePrice, setTypePrice] = useState(Field.INPUT);
  const [tokensNeedApproved, setTokensNeedApproved] = useState([]);

  useEffect(() => {
    (async () => {
      if (!chainId || !account || !library) return;
      try {
        const [balances, poolInfo] = await Promise.all([
          getCurrencyBalances(chainId, account, library, [
            tokens[Field.INPUT],
            tokens[Field.OUTPUT],
          ]),
          getPoolInfo(chainId, account, library, [
            tokens[Field.INPUT],
            tokens[Field.OUTPUT],
          ]),
        ]);
        poolInfo && setPoolInfo(poolInfo);
        balances && setBalances(balances);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [chainId, account, library, tokens, reloadPool]);

  useEffect(() => {
    if (!account || !library || !chainId) return;
    getAllowances(
      chainId,
      library,
      account,
      ROUTER_ADDRESS[chainId],
      [tokens[Field.INPUT], tokens[Field.OUTPUT]],
      [parsedTokenAmounts[Field.INPUT], parsedTokenAmounts[Field.OUTPUT]]
    )
      .then(setTokensNeedApproved)
      .catch(console.error);
  }, [chainId, account, library, tokens, parsedTokenAmounts]);

  useEffect(() => {
    if (!poolInfo.noLiquidity) {
      setTokenAmounts({ [Field.INPUT]: "", [Field.OUTPUT]: "" });
      // TODO change amount follow independentField
    }
  }, [poolInfo]);

  const handleSelectToken = (token, depend) => {
    let _tokens = { ...tokens };
    _tokens[depend] = token;
    if (depend === Field.INPUT) {
      if (tokens[Field.OUTPUT] && token.equals(tokens[Field.OUTPUT])) {
        if (tokens[Field.INPUT]) _tokens[Field.OUTPUT] = tokens[Field.INPUT];
        else _tokens[Field.OUTPUT] = undefined;
      }
    } else {
      if (tokens[Field.INPUT] && token.equals(tokens[Field.INPUT])) {
        if (tokens[Field.OUTPUT]) _tokens[Field.INPUT] = tokens[Field.OUTPUT];
        else _tokens[Field.INPUT] = undefined;
      }
    }
    setTokens(_tokens);
    setIsShow(false);
  };

  const handleChangeAmounts = (value, independentField) => {
    if (value === "") {
      poolInfo.noLiquidity
        ? setTokenAmounts((amounts) => ({ ...amounts, [independentField]: "" }))
        : setTokenAmounts({ [Field.INPUT]: "", [Field.OUTPUT]: "" });
      return;
    }

    setIndependentField(independentField);
    const remainField =
      independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT;
    const decimalsIndependent = tokens?.[independentField]?.decimals ?? 18;
    const remainDecimals = tokens?.[remainField]?.decimals ?? 18;
    let parsedAmount;
    if (poolInfo.noLiquidity && !poolInfo.prices[independentField]) {
      setTokenAmounts((amounts) => ({ ...amounts, [independentField]: value }));
      try {
        parsedAmount = new Fraction(
          parseUnits(value, decimalsIndependent).toString()
        );
        tokens[independentField] &&
          setParsedTokenAmounts((amounts) => ({
            ...amounts,
            [independentField]: new TokenAmount(
              tokens[independentField],
              parsedAmount?.quotient.toString()
            ),
          }));
      } catch (error) {
        console.error(error);
        return;
      }
    } else {
      try {
        parsedAmount = new Fraction(
          parseUnits(value, decimalsIndependent).toString()
        );
      } catch (error) {
        console.error(error);
        return;
      }
      if (!parsedAmount) return;
      const remainParsedAmount = parsedAmount.multiply(
        poolInfo.prices[remainField]?.raw ?? "1"
      );
      setParsedTokenAmounts({
        [independentField]: new TokenAmount(
          tokens[independentField],
          parsedAmount.quotient.toString()
        ),
        [remainField]: new TokenAmount(
          tokens[remainField],
          remainParsedAmount.quotient.toString()
        ),
      });
      setTokenAmounts({
        [independentField]: value,
        [remainField]: formatUnits(
          remainParsedAmount.quotient.toString(),
          remainDecimals
        ),
      });
    }
  };

  const isDisableBtn = useMemo(() => {
    if (
      [tokens, tokenAmounts, parsedTokenAmounts].some(
        (e) => !e[Field.INPUT] || !e[Field.OUTPUT]
      ) ||
      !balances?.[0] ||
      !balances?.[1] ||
      !parsedTokenAmounts[Field.INPUT] ||
      !parsedTokenAmounts[Field.OUTPUT]
    )
      return true;

    if (
      BigNumber.from(parsedTokenAmounts[Field.INPUT]?.raw.toString()).gt(
        BigNumber.from(balances[0].raw.toString())
      )
    ) {
      return true;
    }
    if (
      BigNumber.from(parsedTokenAmounts[Field.OUTPUT]?.raw.toString()).gt(
        BigNumber.from(balances[1].raw.toString())
      )
    ) {
      return true;
    }
    return false;
  }, [tokens, tokenAmounts, parsedTokenAmounts]);

  const isNeedApproved = useMemo(
    () => (tokensNeedApproved.length > 0 ? true : false),
    [tokensNeedApproved]
  );

  const onAddLiquidityCallback = useCallback(async () => {
    try {
      if (!chainId || !account || !library || submitting) return;
      setSubmitting(true);
      await addLiquidityCallback(
        chainId,
        account,
        library,
        tokens,
        parsedTokenAmounts
      );
      setReloadPool((pre) => !pre);
      setSubmitting(false);
      alert("Add liquidity success");
    } catch (error) {
      console.error(error);
      alert(error?.reason ?? error?.message ?? error);
      setSubmitting(false);
    }
  }, [chainId, account, library, tokens, parsedTokenAmounts]);

  const onApproveTokens = useCallback(async () => {
    try {
      if (!chainId || !account || !library || submitting) return;
      setSubmitting(true);
      const result = await approves(
        chainId,
        library,
        account,
        ROUTER_ADDRESS[chainId],
        tokensNeedApproved
      );
      if (result) setTokensNeedApproved([]);
      setSubmitting(false);
      alert("Approve success");
    } catch (error) {
      console.error(error);
      alert(error?.reason ?? error?.message ?? error);
      setSubmitting(false);
    }
  }, [chainId, account, library, tokensNeedApproved]);

  const buttonText = useMemo(() => {
    if (!account) return "Connect wallet";
    if (
      !parsedTokenAmounts[Field.INPUT] ||
      !parsedTokenAmounts[Field.OUTPUT] ||
      !balances?.[0] ||
      !balances?.[1]
    )
      return "Add Liquidity";
    if (
      BigNumber.from(parsedTokenAmounts[Field.INPUT]?.raw.toString()).gt(
        BigNumber.from(balances[0].raw.toString())
      )
    ) {
      return `Insufficient ${tokens[Field.INPUT]?.symbol} balance`;
    }
    if (
      BigNumber.from(parsedTokenAmounts[Field.OUTPUT]?.raw.toString()).gt(
        BigNumber.from(balances[1].raw.toString())
      )
    ) {
      return `Insufficient ${tokens[Field.OUTPUT]?.symbol} balance`;
    }
    if (isNeedApproved) return "Approve tokens";
    return "Add Liquidity";
  }, [isNeedApproved, parsedTokenAmounts, balances, account]);

  const onSubmit = () => {
    if (!(buttonText === "Approve tokens" || buttonText === "Add Liquidity"))
      return;
    if (isNeedApproved) {
      onApproveTokens();
    } else if (!isDisableBtn) {
      onAddLiquidityCallback();
    }
  };

  // REMOVE BELOW

  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();

  const handleAddLiquidity = () => {
    if (isConnectedEvm) {
      onSubmit();
    } else {
      alert("Please connect wallet");
    }
  };

  const openModalSetting = () => {
    toggleSettingSwap();
  };

  const { isShowingSetting, toggleSettingSwap } = useModalSettingSwap();

  // search token
  const listTokens = useListTokens(chainId);
  const [searchToken, setSearchToken] = useState("");
  const [_listTokens, _setListTokens] = useState([]);

  const handleSearchToken = useCallback(async () => {
    if (!searchToken || !isAddress(searchToken)) return listTokens;
    const existsTokens = listTokens.filter(
      (t) => t.address.toLowerCase() === searchToken.toLowerCase()
    );
    if (existsTokens.length) return existsTokens;
    const _t = await getToken(chainId, searchToken, library);
    if (_t instanceof Token) return [_t];
    return [];
  }, [listTokens, searchToken, library, chainId]);

  useEffect(() => {
    (async () => {
      try {
        const _tokens = await handleSearchToken();
        _setListTokens(_tokens);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [handleSearchToken]);

  const handleTokenShow = (field) => {
    setIndependentField(field);
    setIsShow(true);
  };

  const setTokenAmountByPercentOfBalance = (percent, independentField) => {
    const balance =
      independentField === Field.INPUT
        ? balances?.[0]?.raw.toString()
        : balances?.[1]?.raw.toString();
    const value = !balance
      ? ""
      : BigNumber.from(balance)
          .mul(BigNumber.from(percent))
          .div(BigNumber.from(100));
    handleChangeAmounts(
      formatEther(value.toString()).toString(),
      independentField
    );
  };

  const percentNumbers = [
    {
      number: 25,
      handleChoosingPercent: (independentField) => {
        setTokenAmountByPercentOfBalance(25, independentField);
        return;
      },
    },
    {
      number: 50,
      handleChoosingPercent: (independentField) => {
        setTokenAmountByPercentOfBalance(50, independentField);
        return;
      },
    },
    {
      number: 75,
      handleChoosingPercent: (independentField) => {
        setTokenAmountByPercentOfBalance(75, independentField);
        return;
      },
    },
    {
      number: 100,
      handleChoosingPercent: (independentField) => {
        setTokenAmountByPercentOfBalance(100, independentField);
        return;
      },
    },
  ];

  const currentPath = window.location.pathname;

  return (
    <Modal
      open={isShowAddLiquidity}
      footer={null}
      centered
      bodyStyle={{
        backgroundColor: "#000",
        overflow: "auto",
        gap: 20,
      }}
      onCancel={() => {
        setIsShowAddLiquidity(false);
      }}
    >
      <div className="form-wrapper col gap-10" style={{ gap: 2 }}>
        {/* <ModalSelectToken
                    isShow={isShow}
                    setIsShow={setIsShow}
                    token0={token0}
                    token1={token1}
                    setToken0={setToken0}
                    setToken1={setToken1}
                    mockDataTokenTest={mockDataTokenTest}
                    typeModal={typeModal}
                /> */}
        <div style={{ height: 20 }}> </div>
        <ModalSettingSwap
          isShowing={isShowingSetting}
          hide={toggleSettingSwap}
        />
        <div className="row j-between" style={{ margin: "10px 0" }}>
          <div className="row gap-10" style={{ marginBottom: 10 }}>
            <h4
              className="hover-primary-color-2 primary-color-2 title-noactive"
              onClick={() => {
                navigate("/swap");
              }}
            >
              Swap
            </h4>
            <h4
              className={`hover-primary-color-2 ${
                currentPath === "/liquidity"
                  ? "primary-color-1"
                  : "primary-color-2"
              }`}
            >
              Liquidity
            </h4>
          </div>
          <div
            className="btn__setting row gap-10 center"
            style={{ marginBottom: 10 }}
            onClick={() => {
              openModalSetting();
            }}
          >
            <img
              src={assets.svg.setting}
              style={{ width: 15, height: 15 }}
              alt=""
            />
          </div>
          {/* <div style={{ height: 20, width: 20 }}>
                    <img src={assets.svg.setting} />
                </div> */}
        </div>
        <div className="input-wrapper">
          <div style={{ padding: 12 }}>
            <div className="row">
              <input
                placeholder="0.0"
                // type={'number'}
                value={tokenAmounts[Field.INPUT]}
                onChange={(e) =>
                  handleChangeAmounts(e.target.value, Field.INPUT)
                }
              />
              <div>
                <div
                  className="row gap-5 option-wrapper a-center p-10"
                  onClick={() => {
                    handleTokenShow(Field.INPUT);
                  }}
                >
                  <img
                    src={
                      TOKEN_ICON_LIST[chainId]?.[
                        tokens[Field.INPUT]?.address
                      ] ?? UNKNOWN_TOKEN_ICON
                    }
                    style={{ height: 30, width: 30 }}
                    alt="eth_icon"
                  />
                  <h5>{tokens[Field.INPUT]?.symbol}</h5>
                  <img
                    src={assets.svg.down_arrow}
                    style={{ height: 20, width: 20 }}
                    alt="down_arrow_icon"
                  />
                </div>
                <div className="wrapper-percent" style={{ marginTop: 10 }}>
                  {percentNumbers.map((item, index) => {
                    return (
                      <button
                        key={index}
                        className="btn-percent"
                        onClick={() => item.handleChoosingPercent(Field.INPUT)}
                      >
                        <p>{item.number === 100 ? "MAX" : item.number + "%"}</p>
                      </button>
                    );
                  })}
                </div>
                <div className="input-balance-wrapper">
                  <p>Balance: {balances?.[0]?.toSignificant(18)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="center icon-swap-wrapper"
          style={{
            marginTop: 4,
            marginBottom: 4,
            zIndex: 99,
            // border: '4px solid #26193c',
            cursor: "pointer",
          }}
          // onClick={() => handleReverse()}
        >
          <img
            src={assets.svg.swap}
            style={{ height: 24, width: 24 }}
            alt="swap_icon"
          />
        </div>
        <div className="input-wrapper">
          <div style={{ padding: 12 }}>
            <div className="row">
              <input
                placeholder="0.0"
                value={tokenAmounts[Field.OUTPUT]}
                onChange={(e) =>
                  handleChangeAmounts(e.target.value, Field.OUTPUT)
                }
              />
              <div>
                <div
                  className="row gap-5 option-wrapper a-center p-10"
                  onClick={() => {
                    handleTokenShow(Field.OUTPUT);
                  }}
                >
                  <img
                    src={
                      TOKEN_ICON_LIST[chainId]?.[
                        tokens[Field.OUTPUT]?.address
                      ] ?? UNKNOWN_TOKEN_ICON
                    }
                    style={{ height: 30, width: 30 }}
                    alt="eth_icon"
                  />
                  <h5>{tokens[Field.OUTPUT]?.symbol}</h5>
                  <img
                    src={assets.svg.down_arrow}
                    style={{ height: 20, width: 20 }}
                    alt="down_arrow_icon"
                  />
                </div>
                <div className="input-balance-wrapper">
                  <p>Balances: {balances?.[1]?.toSignificant(18)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button
          style={{
            marginTop: 20,
            width: "100%",
            border: "none",
          }}
          className="btn"
          onClick={() => {
            handleAddLiquidity();
          }}
          loading={submitting}
        >
          {buttonText}
        </Button>

        {/* Select token modal */}
        <Modal
          open={isShow}
          footer={null}
          centered
          bodyStyle={{
            backgroundColor: "#000",
            overflow: "auto",
            gap: 20,
          }}
          onCancel={() => {
            setIsShow(false);
          }}
        >
          <div className="select-token-modal">
            <div className="header-modal-wrapper">
              <h3>Select a token or search token</h3>

              <div className="search-wrapper">
                <img src={assets.svg.search} alt="search" />
                <input
                  placeholder="Token address"
                  value={searchToken}
                  onChange={(e) => setSearchToken(e.target.value)}
                />
              </div>
            </div>

            <div className="line"></div>

            <div className="list-wrapper">
              {searchToken == "" || _listTokens.length > 0 ? (
                <div>
                  {_listTokens.map((t, index) => {
                    return (
                      <div
                        key={index}
                        className="row gap-10 a-center item-wrapper "
                        onClick={() => handleSelectToken(t, independentField)}
                      >
                        <img
                          src={
                            TOKEN_ICON_LIST[chainId]?.[t.address] ??
                            UNKNOWN_TOKEN_ICON
                          }
                          alt={t.symbol ?? "?"}
                          style={{ height: 30, width: 30 }}
                        />
                        <h3>{t.symbol}</h3>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                >
                  {searchToken != "" ? (
                    <div className="row gap-10 a-center item-wrapper "></div>
                  ) : (
                    <h3>Token not found</h3>
                  )}
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </Modal>
  );
};

const LiquidityPage = () => {
  const [isShowAddLiquidity, setIsShowAddLiquidity] = useState(false);
  return (
    <div className="liquidity-page">
      <FormSwap
        setIsShowAddLiquidity={setIsShowAddLiquidity}
        isShowAddLiquidity={isShowAddLiquidity}
      />
      <PoolComponent setIsShowAddLiquidity={setIsShowAddLiquidity} />
    </div>
  );
};

export default LiquidityPage;
