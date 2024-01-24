import React, { useState } from 'react';
import columnMapping from '../assets/ColumnKey';
import useQScoreUploadService from './QscoreUploadService';
import { VscClearAll } from "react-icons/vsc";
import { VscLayersActive } from "react-icons/vsc";

const TextInput = ({ onProcessText }) => {
    const [text, setText] = useState('');
    const { login, sendDataQScore } = useQScoreUploadService();

    const processText = (text) => {
        const lines = text.split('\n');
        let dataDict = {};
        lines.forEach(line => {
            if (line.includes('\t')) {
                let [key, value] = line.split('\t').map(item => item.trim());
                let modifiedKey = columnMapping[key] || key.replace(/\s+/g, '');
                dataDict[modifiedKey] = value;
            }
        });
        return dataDict;
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleClear = () => {
        setText('');  // ตั้งค่า text เป็นสตริงว่าง
    };
    

    const handleSubmit = async () => {
        try {
            const processedData = processText(text);
            console.log(processedData);
            if (processedData['Material'] && processedData['Vendor']) {
                const material = processedData['Material'];
                const vendor = processedData['Vendor'];
                await login('username', 'password');
                const qscoreResponse = await sendDataQScore(material, vendor);
                console.log(qscoreResponse);
    
                const combinedData = {
                    ...processedData,
                    ...qscoreResponse
                };
    
                // ย้ายการเรียก onProcessText มาไว้ที่นี่
                onProcessText(combinedData);
            } else {
                console.log("Material or Vendor is missing");
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
        }
    };    

    return (
        <div className="container mx-auto px-4 md: w-96">
            <div className="flex justify-center w-full h-full font-custom">
                <textarea
                    className="border-2 border-gray-300 w-full p-2 mb-2 h-full resize-none"
                    style={{ height: '750px' }}
                    value={text}
                    onChange={handleTextChange}
                />
            </div>
            <div className="flex justify-center w-full mb-2">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
                    onClick={handleSubmit}
                >
                    <VscLayersActive className="inline-block mr-1" /> Process Text
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl ml-4"
                    onClick={handleClear}
                >
                    <VscClearAll className="inline-block mr-1" /> Clear
                </button>
            </div>
        </div>
    );
};

export default TextInput;