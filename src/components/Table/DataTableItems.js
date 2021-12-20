import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { connect } from 'react-redux';
import { updatePaymentStatusDynamically } from '../../actions/accounts';
import { DataTableExpandItems } from './Subtable/DataTableExpandItems';
import { MoreOptions } from './MoreOptions';
import useOutsideAlerter from '../useOutsideAlerter';

const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        const updateSize = () => {
            setSize([window.innerWidth, window.innerHeight]);
        };
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
};

const DataTableItems = (
    {
        id,
        first_name,
        last_name,
        email,
        user_status,
        last_login_date,
        payment_status,
        paid_date,
        amount,
        activity,
        expandIcon,
        kebabIcon,
        index,
        indexOfFirstData,
        currentPage,
        checkedState,
        setAllChecked,
        setCheckedState,
        handleOnChange,
        setShowModal,
        setModalType,
        dispatch
    }) => {

    const wrapperRef = useRef(null)
    const [showOptions, setShowOptions] = useState(false)
    const [showSub, setShowSub] = useState(false)
    const tableRef = useRef(null)
    const divRef = useRef(null)
    useOutsideAlerter(wrapperRef, setShowOptions)
    const [width, height] = useWindowSize();

    useEffect(() => {
        const subHeight = tableRef.current.getBoundingClientRect().height;
        if (showSub) {
            divRef.current.style.height = `${subHeight}px`;
        } else {
            divRef.current.style.height = "0px";
        }
    }, [showSub, width])

    let lastLoginDate = new Date(last_login_date)
    const month = lastLoginDate.toLocaleString('default', { month: 'long' }).slice(0, 3).toUpperCase()
    const day = lastLoginDate.getDate()
    const year = lastLoginDate.getFullYear()

    const paymentVariable = ['paid', 'dues', 'dued']

    let paidDate = new Date(paid_date)
    const monthForPaidDate = paidDate.toLocaleString('default', { month: 'long' }).slice(0, 3).toUpperCase()
    const dayForPaidDate = paidDate.getDate()
    const yearForPaidDate = paidDate.getFullYear()

    useEffect(() => {
        if (payment_status !== 'paid') {
            const pstatus = new Date() > paidDate ? "overdue" : 'unpaid'
            dispatch(updatePaymentStatusDynamically(id, pstatus))
        }
    }, []);

    const checkboxStuffs = (position) => {
        !showOptions && setShowOptions(true)
        position = currentPage > 1 ? position + indexOfFirstData : position
        var updatedCheckedState = checkedState.map((data, index) =>
            index === position ?
                !data ?
                    true :
                    data
                : false
        )
        setCheckedState(updatedCheckedState)
        setAllChecked(false)
    }

    return (
        <>
            <tr key={id} className={`primary-records${showSub || showOptions || checkedState[index + indexOfFirstData] ? ' showSub' : ''}`} >
                <td>
                    <input
                        type="checkbox"
                        id={id}
                        name={id}
                        value={id}
                        onChange={() => handleOnChange(index)}
                        checked={checkedState[index + indexOfFirstData]}
                    />
                </td>

                <td>
                    <label htmlFor={id}>
                        <div style={{ width: '100%', height: '48px', paddingTop: '12px' }}>
                            <span className="capitalize">
                                {first_name} {last_name}
                            </span>
                            <br />
                            <span className="support-data" style={{ textTransform: 'none' }}>
                                {email}
                            </span>
                        </div>
                    </label>
                </td>

                <td>
                    <label htmlFor={id}>
                        <div style={{ width: '100%', height: '46px', paddingTop: '14px' }}>
                            <span className={`capitalize${user_status.toLowerCase() === 'active' ?
                                ' active-user' :
                                ' inactive-user'}`
                            }
                            >
                                <i className="fas fa-circle"></i>{user_status}
                            </span>
                            <br />
                            <span className="support-data">
                                Last login: {`${day}/${month}/${year}`}
                            </span>
                        </div>
                    </label>
                </td>

                <td>
                    <label htmlFor={id}>
                        <div style={{ width: '100%', height: '46px', paddingTop: '14px' }}>
                            <span className={`capitalize${payment_status.toLowerCase() === 'paid' ?
                                ' paid-user' :
                                payment_status.toLowerCase() === 'unpaid' ?
                                    new Date() > paidDate ?
                                        ' overdue-user' :
                                        ' unpaid-user' :
                                    ' overdue-user'}`}>
                                <i className="fas fa-circle"></i>{payment_status}
                            </span>
                            <br />
                            <span className="support-data">
                                {
                                    payment_status.toLowerCase() === 'paid' ?
                                        paymentVariable[0] :
                                        payment_status.toLowerCase() === 'unpaid' ?
                                            new Date() > paidDate ?
                                                paymentVariable[2] :
                                                paymentVariable[1] :
                                            paymentVariable[2]
                                } on: {`${dayForPaidDate}/${monthForPaidDate}/${yearForPaidDate}`}
                            </span>
                        </div>
                    </label>
                </td>

                <td className="align-right">
                    <label htmlFor={id}>
                        <div style={{ width: '100%', height: '46px', paddingTop: '14px' }}>
                            ${amount}
                            <br />
                            <span className="support-data">
                                USD
                            </span>
                        </div>
                    </label>
                </td>

                <td className="align-right">
                    <img
                        src={expandIcon}
                        alt="expand"
                        onClick={() => setShowSub(!showSub)}
                        className={showSub ? 'expand show' : 'expand'}
                    />
                    <img
                        src={kebabIcon}
                        alt="options"
                        className="show-more"
                        onClick={() => checkboxStuffs(index)}
                    />
                    <MoreOptions
                        setShowModal={setShowModal}
                        setModalType={setModalType}
                        userStatus={user_status.toLowerCase()}
                        setShowOptions={setShowOptions}
                        wrapperRef={wrapperRef}
                        showOptions={showOptions}
                    />
                </td>
            </tr>

            <tr className="expanded-row">
                <td colSpan="6">
                    <div ref={divRef}>
                        <table className="sub-table" ref={tableRef}>
                            <thead>
                                <tr className="sub-header">
                                    <th>Date</th>
                                    <th colSpan="2">User Activity</th>
                                    <th colSpan="3">Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    activity ?
                                        activity.map((act) => {
                                            return (
                                                <DataTableExpandItems
                                                    key={act.aid}
                                                    {...act}
                                                />
                                            )
                                        }) :
                                        <tr className="activity empty">
                                            <td colSpan="6">No Records Found</td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default connect()(DataTableItems);
