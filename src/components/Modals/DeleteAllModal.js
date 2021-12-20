import React, { useContext, useState } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { deleteAllAccount } from '../../actions/accounts'
import { AppContext } from '../../ProtectedRoutes';

const DeleteModal = (props) => {
    const submitData = props.reducerData.filter((data, index) => props.checkedState[index] ? data : '')
    let logsArray = []
    let currentMonth = new Date().toLocaleString('default', { month: 'long' }).slice(0, 3).toUpperCase()
    let currentDate = new Date().getDate()
    let currentYear = new Date().getFullYear()
    const [name, setName] = useState('')

    const handleOnChange = (e) => setName(e.target.value)

    const { isAuth } = useContext(AppContext);

    return (
        <Modal
            isOpen={props.showModal}
            contentLabel="delete_all"
            onRequestClose={props.closeModal}
            className="modal"
        >
            <form>
                Are you sure? <br />
                <input
                    type="text"
                    className="modal-input"
                    placeholder='Enter your name to confirm'
                    onChange={handleOnChange}
                />
                <input type="submit"
                    value="Yes"
                    onClick={(e) => {
                        e.preventDefault();
                        if (isAuth?.result?.name === name) {
                            props.dispatch(deleteAllAccount())
                            props.setCheckedState(props.checkedState.fill(false))
                            props.setAllChecked(false)
                            submitData.map((data) => {
                                logsArray.push(`${isAuth?.result?.name} deleted the user ${data.first_name} ${data.last_name} on ${currentDate}/${currentMonth}/${currentYear}`)
                            })
                            props.setLogs([...props.logs, logsArray].flat(Infinity))
                            props.setShowModal(false)
                            alert("Changes were made")
                        }
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
            </form>
        </Modal>
    )
}

export default connect()(DeleteModal)
