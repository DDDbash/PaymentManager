import React from 'react';
import { connect } from 'react-redux';
import { paymentFilter } from '../actions/filters';

const SubNav = (props) => {
    const paymentStatusArray = ['all', 'paid', 'unpaid', 'overdue'];

    var totalAmount = 0;

    const calculateTotal = () => {
        // console.log("total amount: " + totalAmount);
        props.accounts.map((account) => {
            const { payment_status, amount } = account;
            // console.log("----" + amount);
            if (payment_status.toLowerCase() === 'unpaid' || payment_status.toLowerCase() === 'overdue') {
                totalAmount += Number(amount)
            }
            // console.log("total amount final: " + totalAmount);
        }
        )
    }
    calculateTotal();

    const totalAmountFormatted = (totalAmount) => parseFloat(totalAmount).toFixed(2)
    return (
        <div className="sub-nav">
            <ul className="payment-status-list">
                {
                    paymentStatusArray.map((paymentStatus, i) => (
                        <li key={i}
                            className={`payment-status ${props.filters.paymentStatus === paymentStatusArray[i] ? 'active' : ''}`}
                            onClick={() => props.dispatch(paymentFilter(paymentStatus))}
                        >
                            {paymentStatus}
                        </li>
                    ))
                }
            </ul>
            <div>
                <p className="total">Total payable amount:&nbsp;
                    <span className="total-amount">
                        <b>
                            ${totalAmountFormatted(totalAmount)}&nbsp;
                        </b>
                        USD
                    </span>
                </p>
            </div>
        </div>
    );
}

export default connect((state) => {
    return {
        accounts: state.accounts,
        filters: state.filters
    }
})(SubNav);