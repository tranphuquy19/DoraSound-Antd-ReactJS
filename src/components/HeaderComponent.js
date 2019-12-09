import React, {useContext} from "react";
import {Avatar, Dropdown, Layout, Menu} from "antd";
import {LoginModelContext} from "../contexts/loginModelContext";
import {UserContext} from "../contexts/userContext";

const {Header} = Layout;

export function HeaderComponent() {
    const [loginModel, setLoginModel] = useContext(LoginModelContext);
    const [user, setUser] = useContext(UserContext);

    const handleClickLogin = () => {
        setLoginModel({...loginModel, isVisible: true});
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                    1st menu item
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                    2nd menu item
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                    3rd menu item
                </a>
            </Menu.Item>
        </Menu>
    );

    return <Header style={{background: "#fff", padding: 0}}>
        <nav className="navbar navbar-light"
             style={{backgroundColor: '#001529', height: '66px', paddingTop: '0px', paddingBottom: '0px'}}>
            <a className="navbar-brand" href="#" style={{paddingTop: '0px', paddingBottom: '0px'}}>
                <img src="LOGO2.png" width={200} height={48} alt=""/>
            </a>
            <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" placeholder="Nhập tên bài hát, ca sĩ ...."
                       aria-label="Search" style={{width: '350px'}}/>
                {(user && user.token) ?
                    <div style={{marginRight: '1em', cursor: 'pointer'}}>
                        <Dropdown overlay={menu} >
                            <Avatar style={{backgroundColor: '#7265e6', verticalAlign: 'middle'}}>{user.name.split(' ').pop()}</Avatar>
                        </Dropdown>
                    </div>
                    :
                    <button className="btn btn-success my-2 my-sm-0"  style={{marginRight: '1em'}} type="button"
                            onClick={() => handleClickLogin()}>Đăng Nhập
                    </button>
                }
            </form>
        </nav>
    </Header>;
}

