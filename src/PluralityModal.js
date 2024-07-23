import React from 'react';
import { Modal } from 'antd';
import './buttonStyle.css'

const PluralityModal = ({ isOpen, closePlurality, frameUrl, style }) => {

    const handleOk = () => {
        closePlurality()
    };

    const handleCancel = () => {
        closePlurality()
    };


    return (
        <>
            <Modal
                visible={!isOpen}
                footer={null}
                centered
                onOk={handleOk}
                onCancel={handleCancel}
                maskClosable={false}
                width={1200}
                padding={0}
                bodyStyle={{ height: "620px" }}
                style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    backgroundColor: "transparent",
                }}
                className='modalCustom'
            >
                <iframe
                    title="PluralityPopup"
                    src={frameUrl}
                    frameBorder="0"
                    id="iframe"
                    style={style}
                ></iframe>
            </Modal >
        </>
    );
};

export default PluralityModal;
