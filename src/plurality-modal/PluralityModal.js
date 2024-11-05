import React from 'react';
import { Modal } from 'antd';
import './modalBackground.css'

const PluralityModal = ({ isOpen, showMask, closePlurality, frameUrl, style }) => {

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
                width={460}
                padding={0}
                mask={showMask}
                closable={showMask}
                bodyStyle={{ height: "560px" }}
                style={{
                    borderRadius: "20px",
                    overflowy: "scroll",
                    backgroundColor: "transparent"
                }}
                className='modalCustom'
            >
                <div className="popup-container">
                    <div className="popup-content">
                        <iframe
                            title="PluralityPopup"
                            src={frameUrl}
                            frameBorder="0"
                            id="iframe"
                            style={style}
                            allow="transparency"
                        ></iframe>

                    </div>
                </div>
            </Modal >
        </>
    );
};

export default PluralityModal;
