import React, { useState } from 'react';
import Modal from 'react-modal';

export const PayModal = (props) => {
    const [amount, setAmount] = useState('')

    const amountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            setAmount(e.target.value)
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (amount)
            props.onSubmit({ amount });
        else
            alert("pls enter amount")
        setAmount('')
    }

    return (
        <Modal
            isOpen={props.showModal}
            contentLabel="pay_dues"
            onRequestClose={props.closeModal}
            className="modal"
        >
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={amountChange}
                />
                <input type="submit"
                    value="Pay"
                />
            </form>
        </Modal>
    )
}
