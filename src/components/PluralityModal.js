import React, { useEffect } from 'react';
import { Modal } from 'antd';

const PluralityModal = ({ isOpen, closePlurality, frameUrl, style }) => {

    const handleOk = () => {
        closePlurality()
    };

    const handleCancel = () => {
        closePlurality()
    };

    const reloadIframe = () => {
        const iframe = document.getElementById('iframe');
        if (iframe) {
            iframe.contentWindow.postMessage('reloadIframe', '*');
        }
    };

    useEffect(() => {
        if (isOpen) {
            reloadIframe();
        }
    }, [isOpen]);

    return (
        <>
            <Modal
                visible={!isOpen}
                footer={null}
                centered
                onOk={handleOk}
                onCancel={handleCancel}
                maskClosable={false}
                width={452}
                padding={0}
                bodyStyle={{ height: "550px" }}
                style={{
                    borderRadius: "20px",
                    overflow: "hidden",
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
                        ></iframe>

                    </div>
                </div>
            </Modal >
        </>
    );
};

export default PluralityModal;
