import React, { useState } from 'react';
import  useQScoreUploadService  from '../QscoreUploadService';
import { useAuth } from '../context/AuthContext';

const QScore = () => {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { sendUploadQScore } = useQScoreUploadService();
    const { user } = useAuth();

    // Check if the user is a superuser
    if (!user || user.role !== 'superuser') {
        return <div>Access Denied</div>;
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please select a file first!');
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await sendUploadQScore(formData);
            console.log(response);
            alert('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-custom">
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                <h2 className="mb-5 text-2xl">Upload QScore File</h2>
                <form onSubmit={handleSubmit}>
                    <input type="file" id="file" onChange={handleFileChange} />
                    <label htmlFor="file" className="cursor-pointer">Select File</label>
                    <button 
                        className="mt-4 w-full px-4 py-2 text-white bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 tracking-wide transition-colors duration-200 transform font-custom"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Uploading...' : 'Upload'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default QScore;