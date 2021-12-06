import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

export const ChangeAmountModal = (props) => {
    const [amount, setAmount] = useState('')
    const submitData = props.reducerData.filter((data, index) => props.checkedState[index] ? data : '')
    const amountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            setAmount(e.target.value)
        }
    };

    useEffect(() => {
        props.setModalData(submitData)
    }, [amount])

    const onSubmit = (e) => {
        e.preventDefault();
        if (!amount)
            alert("pls enter amount")
        else if (Number(amount) <= 0)
            alert("pls reduce amount through pay dues")
        else
            props.onSubmit({ amount });
        setAmount('')
    }
    return (
        <Modal
            isOpen={props.showModal}
            contentLabel="change_amount"
            onRequestClose={props.closeModal}
            className="modal"
        >
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={amountChange}
                    className="modal-input"
                />
                <input type="submit"
                    value="Change"
                    className="modal-submit"
                />
            </form>
        </Modal>
    )
}
