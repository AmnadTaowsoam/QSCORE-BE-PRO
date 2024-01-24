import React, { useState } from 'react';
import TextInput from '../TextInput';
import TextOutput from '../TextOutput';
import '../print.css';

const Home = () => {
    const [textOutputData, setTextOutputData] = useState(null);

    const handleProcessText = (processedData) => {
        console.log(processedData); // เพิ่มบรรทัดนี้
        setTextOutputData(processedData);
    };

    return (
        <>
        <div className='bg-gray-100'>
            <div className='flex justify-center m-1 hover:text-center text-3xl font-custom font-bold text-input-section'>
                <h1>Queue Information and QR Code Generator</h1>
                
            </div>
            {/* <hr className='border-t ml-7 mr-4' style={{ borderWidth: '1px' }} /> */}
            <div className="w-full p-4 flex justify-center items-center">
                    <div className="m-4 w-60 mr-0 text-input-section">
                        <TextInput onProcessText={handleProcessText} />
                    </div>
                    <div className="w-full ml-0 print-content">
                        {textOutputData && <TextOutput data={textOutputData} />}
                    </div>
                </div>
        </div>
        </>
    );
};

export default Home;
