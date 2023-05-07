import React from 'react';
import './header.css';

const Header = () => {
    return (
        <div className="header">
            <img src="../Img/logo.png" alt="" />
            <div className="header-title">
                <span>Phó GS TS </span>
                <div className="header-group">
                    <span>Nhóm 16:</span>
                    <div className="header-name">
                        <span>Bùi Sỹ Phú - 20110539</span>
                        <span>Nguyễn Tiến Phát - 20110535</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
