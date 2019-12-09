import {Breadcrumb, Card, Layout} from "antd";
import React from "react";
import {PlayerBarComponent} from "./PlayerBarComponent";

const {Content} = Layout;
const {Meta} = Card;


export function ContentComponent() {


    return <Content style={{margin: "0 16px"}}>
        <Breadcrumb style={{margin: "16px 0"}}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{padding: 24, background: "#fff"}}>Bill is a cat.</div>
        <PlayerBarComponent/>
    </Content>;
}
