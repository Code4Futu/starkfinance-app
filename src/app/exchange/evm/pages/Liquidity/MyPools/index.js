import { useCallback, useEffect, useState } from 'react';

import { BigNumber } from '@ethersproject/bignumber';
import { useActiveWeb3React } from '../../../hooks/useActiveWeb3React';
import { getOwnerLiquidityPools, removeLiquidityCallback } from '../../../state/liquidity';
import '../style.scss';
import { Button } from 'antd';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const PairComponent = ({ pool, setReload }) => {
    const { account, library, chainId } = useActiveWeb3React();

    const [submitting, setSubmitting] = useState(false);

    const onRemoveLiquidityCallback = useCallback(async () => {
        try {
            if (!pool || !chainId || !account || !library) return;
            const removeAmount = BigNumber.from(pool.balanceOf.raw.toString());
            setSubmitting(true);
            await removeLiquidityCallback(chainId, account, library, pool.pair, removeAmount);
            setSubmitting(false);
            setReload((pre) => !pre);
            alert('Remove liquidity success');
        } catch (error) {
            console.error(error);
            setSubmitting(false);
            alert(error?.reason ?? error?.message ?? error);
        }
    }, [chainId, account, library, pool]);

    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                }}
            >
                {pool?.pair?.token0?.symbol ?? '~'} / {pool?.pair?.token1?.symbol ?? '~'}
            </TableCell>
            <TableCell style={{ textAlign: 'center' }}>{pool?.balanceOf.toSignificant(18)}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>-</TableCell>
            <TableCell style={{ textAlign: 'center' }}>-</TableCell>
            <TableCell style={{ display: 'flex', justifyContent: 'end' }}>
                <Button
                    style={{
                        border: 'none',
                        borderRadius: '10px',
                    }}
                    className="hover-primary-color"
                    onClick={onRemoveLiquidityCallback}
                    loading={submitting}
                >
                    Remove
                </Button>
            </TableCell>
        </TableRow>
    );

    // return (
    //     <div className="row gap-5 a-center p-20 input-wrapper">
    //         <div className="body-one a-center row gap-30" style={{ flex: 'auto' }}>
    //             <div className="row a-center flex-2">
    //                 <h4>
    //                     {pool?.pair?.token0?.symbol ?? '~'} / {pool?.pair?.token1?.symbol ?? '~'}
    //                 </h4>
    //             </div>

    //             <div className="col a-center flex-1">
    //                 <h5 className="body-one-title" style={{ color: '#747272' }}>
    //                     Liquidity Provided
    //                 </h5>
    //                 <h5>{pool?.balanceOf.toSignificant(18)}</h5>
    //             </div>
    //             <Button
    //                 style={{
    //                     border: 'none',
    //                     borderRadius: '10px',
    //                 }}
    //                 className="hover-primary-color"
    //                 onClick={onRemoveLiquidityCallback}
    //                 loading={submitting}
    //             >
    //                 Remove
    //             </Button>
    //         </div>
    //     </div>
    // );
};

const MyPools = () => {
    const { account, isConnected: isConnectedEvm, library, chainId } = useActiveWeb3React();

    // liquidity pools
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(true);
    const [ownerPools, setOwnerPools] = useState([]);

    useEffect(() => {
        let isMounted = true;
        getOwnerLiquidityPools(chainId, library, account)
            .then((res) => {
                isMounted && setOwnerPools(res);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
        return () => {
            isMounted = false;
        };
    }, [chainId, account, library, reload]);

    return (
        <div className="form-show" style={{ marginTop: 10 }}>
            {/* <div className="col gap-10" style={{ gap: 2, marginTop: 0, marginBottom: 0 }}>
                {isConnectedEvm ? (
                    <div className="row gap-10" style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                        {loading ? (
                            <h4>Loading...</h4>
                        ) : ownerPools.length == 0 ? (
                            <h4>No liquidity</h4>
                        ) : (
                            ownerPools.map((pool, index) => (
                                <PairComponent key={index} pool={pool} setReload={setReload} />
                            ))
                        )}
                    </div>
                ) : (
                    <h5 style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}>
                        Connect wallet to view your pools
                    </h5>
                )}
            </div> */}
            {isConnectedEvm && (
                <div className="table-swap">
                    <TableContainer component={Paper} style={{ background: '#0e0a1f' }}>
                        <Table sx={{}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ textAlign: 'left' }}>Name</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>Liquidity</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>Volume (24hr)</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>Fees (24hr)</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} style={{ textAlign: 'left' }}>
                                            Loading...
                                        </TableCell>
                                    </TableRow>
                                ) : ownerPools.length == 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} style={{ textAlign: 'left' }}>
                                            No liquidity
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    ownerPools.map((pool, index) => {
                                        return <PairComponent key={index} pool={pool} setReload={setReload} />;
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </div>
    );
};

export default MyPools;
