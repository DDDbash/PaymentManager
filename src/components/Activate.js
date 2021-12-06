import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { changeUserStatus } from '../actions/accounts'

const Activate = (props) => {
    const submitData = props.reducerData.filter((data, index) => props.checkedState[index] ? data : '')
    let logsArray = []
    let currentMonth = new Date().toLocaleString('default', { month: 'long' }).slice(0, 3).toUpperCase()
    let currentDate = new Date().getDate()
    let currentYear = new Date().getFullYear()
    return (
        <Modal
            isOpen={props.showModal}
            contentLabel="change_amount"
            onRequestClose={props.closeModal}
            className="modal"
        >
            <form>
                Are you sure?
                <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                    <input type="submit"
                        value="Yes"
                        onClick={(e) => {
                            e.preventDefault();
                            props.dispatch(changeUserStatus(submitData, props.type))
                            props.setCheckedState(props.checkedState.fill(false))
                            submitData.map((data) => {
                                logsArray.push(`Admin activated the user ${data.first_name} ${data.last_name} on ${currentDate}/${currentMonth}/${currentYear} `)
                            })
                            props.setLogs([...props.logs, logsArray].flat(Infinity))
                            props.setShowModal(false)
                        }}
                        className="modal-submit success"
                    />
                    <input type="submit"
                        value="No"
                        onClick={(e) => {
                            e.preventDefault();
                            props.setShowModal(false)
                        }}
                        className="modal-submit fail"
                    />
                </div>
            </form>
        </Modal>
    )
}

export default connect()(Activate);
