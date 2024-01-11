import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ data }) => {
    const { QueueNo, QueueDate, InspectionLot, Batch, ReceivingPlant, Material, Vendor } = data;

    const createQRCodeValue = (additionalValue) => {
        return `${QueueNo},${QueueDate},${InspectionLot},${Batch},${ReceivingPlant},${Material},${Vendor},${additionalValue}`;
    };

    const qrCodeFirstValue = createQRCodeValue('0010');
    const qrCodeSecondValue = createQRCodeValue('0020');

    return (
        <div className="qr-code-container">
            <div className="qr-code">
                <QRCode value={qrCodeFirstValue} size={75} />
                {/* <p>QRCode First Inspection</p> */}
            </div>
            <div className="qr-code">
                <QRCode value={qrCodeSecondValue} size={75} />
                {/* <p>QR Code Second Inspection</p> */}
            </div>
        </div>
    );
};
export default QRCodeGenerator;
