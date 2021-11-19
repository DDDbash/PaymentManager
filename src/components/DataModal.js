import React, { useState } from 'react'
import Modal from 'react-modal';
import { PayModal } from './PayModal';
import { ChangeAmountModal } from './ChangeAmountModal';
import Activate from './Activate';
import Inactivate from './Inactivate';
import DeleteModal from './DeleteModal';

const DataModal = (props) => {
    Modal.setAppElement('#root');
    if (props.type === 'pay') {
        return <PayModal {...props} />
    } else if (props.type === 'change_amount') {
        return <ChangeAmountModal {...props} />
    } else if (props.type === 'activate') {
        return <Activate {...props} />
    } else if (props.type === 'inactivate') {
        return <Inactivate {...props} />
    } else if (props.type === 'delete') {
        return <DeleteModal {...props} />
    }
}

export default DataModal;
