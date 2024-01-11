import axios from 'axios';
import qs from 'qs';
import { QSCORE_ENDPOINT } from "../assets/Config";

const useQScoreUploadService = () => {
    const login = async () => {
        try {
            // จัดรูปแบบข้อมูลให้อยู่ในรูปแบบ x-www-form-urlencoded
            const data = qs.stringify({
                username: QSCORE_ENDPOINT.username, 
                password: QSCORE_ENDPOINT.password
            });
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            const response = await axios.post(
                `${QSCORE_ENDPOINT.apiEndpoint}/login`, 
                data,
                config
            );
            const receivedToken = response.data.access_token;
            localStorage.setItem('token', receivedToken);
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const sendUploadQScore = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const currentToken = localStorage.getItem('token');
            const response = await axios.post(`${QSCORE_ENDPOINT.apiEndpoint}/upload-csv`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${currentToken}`
                }
            });
            console.log("File uploaded successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    };
    const sendDataQScore = async (material, vendor) => {
        try {
            const currentToken = localStorage.getItem('token');
            const response = await axios.post(`${QSCORE_ENDPOINT.apiEndpoint}/qscore`, 
                {
                    Material: material,
                    Vendor: vendor
                },
                {
                    headers: {
                        'Authorization': `Bearer ${currentToken}`,
                        'Content-Type': 'application/json'  // ตรวจสอบว่ามีการกำหนด Content Type นี้
                    }
                }
            );
            console.log("Data sent successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error sending data to /qscore:", error);
            throw error;
        }
    };
        
    return { login, sendUploadQScore, sendDataQScore };
}

export default useQScoreUploadService;
