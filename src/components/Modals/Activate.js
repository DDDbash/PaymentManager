import React, { useContext } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { changeUserStatus } from '../../actions/accounts'
import { AppContext } from '../../ProtectedRoutes';

const Activate = (props) => {
    const submitData = props.reducerData.filter((data, index) => props.checkedState[index] ? data : '')
    let logsArray = []
    let currentMonth = new Date().toLocaleString('default', { month: 'long' }).slice(0, 3).toUpperCase()
    let currentDate = new Date().getDate()
    let currentYear = new Date().getFullYear()

    const { isAuth } = useContext(AppContext);

    return (
        <Modal
            isOpen={props.showModal}
            contentLabel="activate_account"
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
                            submitData.map((data) => {
                                if (data.user_status.toLowerCase() !== 'active')
                                    logsArray.push(`${isAuth.result?.name} activated the user ${data.first_name} ${data.last_name} on ${currentDate}/${currentMonth}/${currentYear} `)
                            })
                            props.dispatch(changeUserStatus(submitData, props.type))
                            props.setCheckedState(props.checkedState.fill(false))
                            props.setAllChecked(false)
                            props.setLogs([...props.logs, logsArray].flat(Infinity))
                            props.setShowModal(false)
                            alert("Changes were made")
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
