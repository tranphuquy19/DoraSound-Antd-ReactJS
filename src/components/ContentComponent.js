import {Breadcrumb, Card, Layout} from "antd";
import React, {useContext} from "react";
import {PlayerBarComponent} from "./PlayerBarComponent";
import {PlayerContext} from "../contexts/playerContext";

const {Content} = Layout;
const {Meta} = Card;


export function ContentComponent() {
    let {audio, state, controls, ref} = useContext(PlayerContext);

    return <Content style={{margin: "0 16px"}}>
        <Breadcrumb style={{margin: "16px 0"}}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>

        {/*Content Here*/}
        <div style={{padding: 24, background: "#fff"}}>{JSON.stringify(state, null, 2)}</div>
        {/*End content*/}

        <PlayerBarComponent/>
    </Content>;
}
