import { Modal } from 'antd';
import React from 'react';

function Errorbox({ visible, onClose, message }) {
  return (
    <div>
      <Modal
        title="Error"
        open={visible} 
        onOk={onClose}
        onCancel={onClose}
        okText="OK"
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <p>{message}</p>
      </Modal>
    </div>
  );
}

export default Errorbox;