import React, {useContext} from "react";
import {Layout} from "antd";
import {LoginModelContext} from "../contexts/loginModelContext";

const {Header} = Layout;

export function HeaderComponent() {
    const [loginModel, setLoginModel] = useContext(LoginModelContext);
    const handleClickLogin = () => {
        setLoginModel({...loginModel, isVisible: true});
    }

    return <Header style={{background: "#fff", padding: 0}}>
        <nav className="navbar navbar-light"
             style={{backgroundColor: '#001529', height: '66px', paddingTop: '0px', paddingBottom: '0px'}}>
            <a className="navbar-brand" href="#" style={{paddingTop: '0px', paddingBottom: '0px'}}>
                <img src="LOGO2.png" width={200} height={48} alt=""/>
            </a>
            <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" placeholder="Nhập tên bài hát, ca sỉ ...."
                       aria-label="Search" style={{width: '350px'}}/>

                <button className="btn btn-outline-success my-2 my-sm-0" type="button"
                        onClick={() => handleClickLogin()}>Đăng Nhập
                </button>
            </form>
        </nav>
    </Header>;
}

