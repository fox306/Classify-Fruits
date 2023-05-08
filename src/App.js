import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import Header from './Components/Header/Header';

function App() {
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);
    const [count, setCount] = useState(null);
    const [quality, setQuality] = useState(null);

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleDetectClick = async () => {
        const formData = new FormData();
        formData.append('image', image);
        try {
            const res = await axios.post('http://127.0.0.1:5000/detect_objects', formData, {
                withCredentials: true,
                crossDomain: true,
            });
            setResult(res.data.result);
            setCount(res.data.label_counts);
        } catch (err) {
            console.log(err);
        }
    };
    const handleQuality = async () => {
        const formData = new FormData();
        formData.append('image', image);
        try {
            const res = await axios.post('http://127.0.0.1:5000/detect_quality', formData, {
                withCredentials: true,
                crossDomain: true,
            });
            setResult(res.data.result);
            setQuality(res.data.label_counts);
        } catch (err) {
            console.log(err);
        }
    };
    const handleFileChoose = () => {
        document.getElementById('fileInput').click();
        setCount(null);
        setQuality(null);
    };
    console.log(count);
    return (
        <div className="app">
            <Header />
            <div className="app-result">
                <div className="app-img">
                    <div className="img-upload">
                        <img src={image ? URL.createObjectURL(image) : '../logo512.png'} alt="" />
                        <input id="fileInput" type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                        <button onClick={handleFileChoose}>Choose File</button>
                    </div>
                    <div className="img-detect">
                        <img src={result ? `data:image/jpeg;base64,${result}` : '../logo512.png'} alt="" />
                        <div className="detect-btn">
                            <button onClick={handleDetectClick}>Classify Fruit</button>
                            <button onClick={handleQuality}>Fresh Fruit</button>
                        </div>
                    </div>
                    <div className="result">
                        <span>Kết quả</span>
                        {count && Object.keys(count).length === 0 ? (
                            <div>
                                <p>Không phát hiện được đối tượng</p>
                            </div>
                        ) : (
                            count && (
                                <div>
                                    {count[0] === undefined ? '' : <p>- có {count[0]} táo đỏ</p>}
                                    {count[1] === undefined ? '' : <p>- có {count[1]} táo xanh</p>}
                                    {count[2] === undefined ? '' : <p>- có {count[2]} chùm nho xanh</p>}
                                    {count[3] === undefined ? '' : <p>- có {count[3]} chùm nho đen</p>}
                                </div>
                            )
                        )}
                        {quality && Object.keys(quality).length === 0 ? (
                            <div>
                                <p>Không phát hiện được đối tượng</p>
                            </div>
                        ) : (
                            quality && (
                                <div>
                                    {quality[0] === undefined ? '' : <p>- có {quality[0]} táo hư</p>}
                                    {quality[1] === undefined ? '' : <p>- có {quality[1]} chuối hư</p>}
                                    {quality[2] === undefined ? '' : <p>- có {quality[2]} cam hư</p>}
                                    {quality[3] === undefined ? '' : <p>- có {quality[3]} táo tốt</p>}
                                    {quality[4] === undefined ? '' : <p>- có {quality[4]} chuối tốt</p>}
                                    {quality[5] === undefined ? '' : <p>- có {quality[5]} cam tốt</p>}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
