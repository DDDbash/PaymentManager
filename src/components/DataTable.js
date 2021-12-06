import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import selectAccounts from '../selectors/accounts';
import Pagination from './Pagination';
import kebabIcon from '../icons/more.svg';
import DataTableItems from './DataTableItems';
import expandIcon from '../icons/expand.svg';
import DataModal from './DataModal';
import { updateAccounts } from '../actions/accounts';

const DataTable = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage, setDataPerPage] = useState(10);
    const [modalType, setModalType] = useState('pay');

    //index of first and last data in the table
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;

    //data from reducer
    var reducerData = props.accounts.map((account) => {
        return { ...account }
    })

    //number of data to be displayed per page
    const currentDataSet = reducerData.slice(indexOfFirstData, indexOfLastData);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    //the page will reset to 1 whenever reducer value changes
    useEffect(() => {
        if (currentDataSet.length === 0)
            setCurrentPage(1)
    }, [currentDataSet])

    //checkbox
    const [checkedState, setCheckedState] = useState(
        new Array(reducerData.length).fill(false)
    )
    const [allChecked, setAllChecked] = useState(false)

    //Modal states
    const [showModal, setShowModal] = useState(false)
    const closeModal = () => setShowModal(false)

    //Data to be transferred to the modal
    const [modalData, setModalData] = useState([])

    //checkbox on Check and unCheck
    const handleOnChange = (position) => {
        var updatedCheckedState;
        position = currentPage > 1 ? position + indexOfFirstData : position
        // console.log(position);
        if (position === 'all') {
            if (!allChecked)
                updatedCheckedState = checkedState.map(() => true)
            else
                updatedCheckedState = checkedState.map(() => false)
            setCheckedState(updatedCheckedState)
            setAllChecked(!allChecked)
        }
        else {
            updatedCheckedState = checkedState.map((item, index) => {
                // console.log(index);
                return index === position ? !item : item
            }
            );
            setAllChecked(false)
            setCheckedState(updatedCheckedState)
        }
    }

    //opens the modal
    const onSubmit = (e) => {
        e.preventDefault();
        setModalType('pay');
        const submitData = reducerData.filter((data, index) => checkedState[index] ? data : '')
        if (submitData.length === 0) {
            alert('Please select an account');
        }
        else {
            var flag = false;
            submitData.forEach(data => {
                if (data.payment_status === 'paid')
                    flag = true;
            });
            if (flag) {
                alert('Please select an acount with dues left')
            }
            else {
                setModalData(submitData)
                setShowModal(true);
            }
        }
    }

    //submits data to the reducer
    const onModalSubmit = (amount) => {
        let logsArray = [];
        let currentMonth = new Date().toLocaleString('default', { month: 'long' }).slice(0, 3).toUpperCase();
        let currentDate = new Date().getDate();
        let currentYear = new Date().getFullYear()
        if (modalType === 'pay') {
            modalData.map((data) => {
                if ((parseFloat(data.amount) - parseFloat(amount.amount)).toFixed(2) < 0)
                    alert(`The amount exceeds the payable amount for ${data.first_name} ${data.last_name} so, excluding that account from the paid value`)
                else {
                    data.amount = Number((parseFloat(data.amount) - parseFloat(amount.amount)).toFixed(2))
                    if (data.amount === 0) {
                        data.amount = Number(parseFloat(amount.amount))
                        data.payment_status = "paid";
                        data.paid_date = new Date();
                    }
                    logsArray.push(`Admin paid the dues of ${data.first_name} by $${amount.amount} on ${currentDate}/${currentMonth}/${currentYear}`)
                }
                props.setLogs([...props.logs, logsArray].flat(Infinity))
            })
            // console.log(modalData);
            // let newReducerData = reducerData.map(data => { return { ...data } })
            // newReducerData.map(data => {
            //     modalData.forEach(mData => {
            //         if (data.id === mData.id) {
            //             data.amount = mData.amount;
            //         }
            //     });
            // })
        }

        //amount change is dont without directly connecting to the user so that the total amount re render happens
        else if (modalType === 'change_amount') {
            modalData.map((data) => {
                if (Number(parseFloat(amount.amount)) <= data.amount && data.payment_status.toLowerCase() !== 'paid') {
                    alert("Please reduce the dues by Paying the dues instead of Changing the amount")
                } else {
                    if (data.payment_status.toLowerCase() === 'paid') {
                        data.payment_status = 'unpaid'
                        data.paid_date = new Date().setDate(new Date().getDate() + 7)
                    }
                    data.amount = Number(parseFloat(amount.amount))
                    logsArray.push(`Admin changed the amount of ${data.first_name} to $${amount.amount} on ${currentDate}/${currentMonth}/${currentYear}`)
                }
            })
            props.setLogs([...props.logs, logsArray].flat(Infinity))
        }

        props.setRefresh(!props.refresh)
        setCheckedState(checkedState.fill(false))
        props.dispatch(updateAccounts(modalData))
        setShowModal(false)
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    type="submit"
                    className="pay-btn"
                    value="pay dues"
                />
                <table className="payment-table">
                    <thead className="primary-header">
                        <tr>
                            <th><input
                                type="checkbox"
                                id="0"
                                name="0"
                                value={reducerData}
                                onChange={() => handleOnChange('all')}
                                checked={allChecked}
                            /></th>
                            <th>
                                <label htmlFor="0">
                                    <div style={{ width: '100%', height: '24px', paddingTop: '6px' }}>
                                        Name
                                    </div>
                                </label>
                            </th>
                            <th>
                                <label htmlFor="0">
                                    <div style={{ width: '100%', height: '24px', paddingTop: '6px' }}>
                                        User Status
                                    </div>
                                </label>
                            </th>
                            <th>
                                <label htmlFor="0">
                                    <div style={{ width: '100%', height: '24px', paddingTop: '6px' }}>
                                        Payment Status
                                    </div>
                                </label>
                            </th>
                            <th style={{ width: '75px' }}>
                                <label htmlFor="0">
                                    <div style={{ width: '100%', height: '24px', paddingTop: '6px' }}>
                                        Amount
                                    </div>
                                </label>
                            </th>
                            <th className="align-right" style={{ width: '125px' }}><img src={kebabIcon} alt="options" /></th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            currentDataSet.map((data, index) => {
                                return (
                                    <DataTableItems
                                        key={data.id}
                                        index={index}
                                        indexOfFirstData={indexOfFirstData}
                                        currentPage={currentPage}
                                        setShowModal={setShowModal}
                                        setModalType={setModalType}
                                        checkedState={checkedState}
                                        setCheckedState={setCheckedState}
                                        setAllChecked={setAllChecked}
                                        handleOnChange={handleOnChange}
                                        expandIcon={expandIcon}
                                        kebabIcon={kebabIcon}
                                        {...data}
                                    />
                                )
                            })
                        }
                    </tbody>
                </table>
            </form>
            <Pagination
                dataPerPage={dataPerPage}
                totalData={reducerData.length}
                paginate={paginate}
                currentPage={currentPage}
                setDataPerPage={setDataPerPage}
                indexOfFirstData={indexOfFirstData}
                currentDataSetLength={currentDataSet.length}
            />
            <DataModal
                setModalData={setModalData}
                type={modalType}
                showModal={showModal}
                setShowModal={setShowModal}
                closeModal={closeModal}
                reducerData={reducerData}
                checkedState={checkedState}
                setCheckedState={setCheckedState}
                onSubmit={(amount) => onModalSubmit(amount)}
                setLogs={props.setLogs}
                logs={props.logs}
            />
        </>
    )
}

export default connect((state) => {
    return {
        accounts: selectAccounts(state.accounts, state.filters)
    }
})(DataTable);