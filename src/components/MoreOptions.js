import React from 'react'
import closeIcon from '../icons/close.svg'

export const MoreOptions = ({ showOptions, userStatus, setShowOptions, wrapperRef, setShowModal, setModalType, changeUserStatus }) => {

    const openModal = (type) => {
        setModalType(type)
        setShowOptions(false)
        setShowModal(true)
    }

    return (
        <div className={showOptions ? 'more-options show' : 'more-options'} ref={wrapperRef}>
            <div style={{
                content: "",
                position: 'absolute',
                borderRadius: '50%',
                right: '-8px',
                top: '-8px',
                background: 'white',
                border: '2px solid white',
                zIndex: '3',
                boxShadow: ' 0px 0px 5px 0px #00000040',
                paddingLeft: '4px',
                paddingRight: '4px',
                cursor: 'pointer'
            }}
                onClick={() => setShowOptions(!showOptions)}
            >
                <img src={closeIcon} height="8" width="8" alt="close" />
            </div>
            <ul>
                <li className="option" onClick={() => openModal('change_amount')}>
                    Change Amount
                </li>
                <li className="option" >
                    View Profile
                </li>
                {
                    userStatus === 'active' ?
                        <li className="option inactivate" onClick={() => openModal('inactivate')}>inactivate</li> :
                        <li className="option activate" onClick={() => openModal('activate')}>activate</li>
                }
                <li className="option delete"
                    onClick={() => openModal('delete')}>
                    Delete
                </li>
            </ul>
        </div>
    )
}
