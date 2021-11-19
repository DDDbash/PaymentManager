import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { deleteAccount } from '../actions/accounts'

const DeleteModal = (props) => {
    const submitData = props.reducerData.filter((data, index) => props.checkedState[index] ? data : '')
    return (
        <Modal
            isOpen={props.showModal}
            contentLabel="change_amount"
            onRequestClose={props.closeModal}
            className="modal"
        >
            <form>
                Are you sure?
                <input type="submit"
                    value="Yes"
                    onClick={(e) => {
                        e.preventDefault();
                        props.dispatch(deleteAccount(submitData[0].id))
                        props.setCheckedState(props.checkedState.fill(false))
                        props.setShowModal(false)
                    }}
                />
                <input type="submit"
                    value="No"
                    onClick={(e) => {
                        e.preventDefault();
                        props.setShowModal(false)
                    }}
                />
            </form>
        </Modal>
    )
}

export default connect()(DeleteModal)
