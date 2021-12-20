import React from 'react'
import Modal from 'react-modal'

const ProfileModal = (props) => {
    var submitData = props.reducerData.filter((data, index) => props.checkedState[index] ? data : '')
    if (submitData.length === 0) {
        submitData[0] = {
            first_name: '',
            last_name: '',
            email: '',
            user_status: '',
            payment_status: ''
        }
    }

    return (
        <Modal
            isOpen={props.showModal}
            contentLabel="view_profile"
            onRequestClose={props.closeModal}
            className="modal"
        >
            <table className="profile-table">
                <thead>
                    <tr>
                        <th>Account Information</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Name: </th>
                        <td>{submitData[0].first_name} {submitData[0].last_name}</td>
                    </tr>
                    <tr>
                        <th>Email: </th>
                        <td style={{ "textTransform": "none" }}>{submitData[0].email}</td>
                    </tr>
                    <tr>
                        <th>User Status: </th>
                        <td>{submitData[0].user_status}</td>
                    </tr>
                    <tr>
                        <th>Payment Status: </th>
                        <td>{submitData[0].payment_status}</td>
                    </tr>
                </tbody>
            </table>
            <button
                className="pay-btn"
                onClick={() => props.setShowModal(false)}>Go Back</button>
        </Modal>
    )
}

export default ProfileModal;
