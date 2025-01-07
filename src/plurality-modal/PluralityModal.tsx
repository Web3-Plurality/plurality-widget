import React from 'react';
import { Modal } from 'antd';
import './css/modalBackground.css'

interface PluralityModalTypes {
    isOpen: boolean
    showMask: boolean
    closePlurality: () => void
    frameUrl: string | undefined
    style: any

}

const PluralityModal = ({ isOpen, showMask, closePlurality, frameUrl, style }: PluralityModalTypes) => {

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
                mask={showMask}
                closable={showMask}
                bodyStyle={{ height: "560px", padding: 0 }}
                style={{
                    borderRadius: "20px",
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
