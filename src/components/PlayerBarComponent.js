import React, {useContext, useEffect, useRef, useState} from "react";
import {FixedBottom} from "react-fixed-bottom";
import {Col, Dropdown, Icon, Menu, Row, Slider} from "antd";
import {convertToPlayerItemObject, fancyTimeFormat, getRoundTime, getSeekTime} from "../commons/songsCommons";
import {PlaylistContext} from "../contexts/playlistContext";
import {SongIndexContext} from "../contexts/songIndexContext";
import Sound from 'react-sound';

export function PlayerBarComponent() {
    let playerBarStyle = {
        backgroundColor: '#03141A'
    };
    // let music = [
    //     {
    //         name: 'Em của ngày hôm kia',
    //         lyric: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, eveniet harum? Dignissimos, impedit, vitae. Aperiam aspernatur commodi ducimus earum iste necessitatibus tempore, totam. Adipisci cupiditate, explicabo facilis id laborum sed?',
    //         singer: 'Em Sơn Tùng',
    //         artist: 'Anh của Em Sơn Tùng',
    //         category: 'Nhạc quẩy',
    //         views: 151554,
    //         downloads: 51689,
    //         per: 12
    //     },
    //     {
    //         name: 'Em của ngày mai',
    //         lyric: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, eveniet harum? Dignissimos, impedit, vitae. Aperiam aspernatur commodi ducimus earum iste necessitatibus tempore, totam. Adipisci cupiditate, explicabo facilis id laborum sed?',
    //         singer: 'Anh Sơn Tùng',
    //         artist: 'Anh của Anh Sơn Tùng',
    //         category: 'Nhạc nhảy',
    //         views: 123214,
    //         downloads: 516389,
    //         per: 21
    //     },
    //     {
    //         name: 'Em của ngày hôm tê',
    //         lyric: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, eveniet harum? Dignissimos, impedit, vitae. Aperiam aspernatur commodi ducimus earum iste necessitatibus tempore, totam. Adipisci cupiditate, explicabo facilis id laborum sed?',
    //         singer: 'Chú Sơn Tùng',
    //         artist: 'Anh của Chú Sơn Tùng',
    //         category: 'Nhạc ngủ',
    //         views: 6856,
    //         downloads: 6786843,
    //         per: 56
    //     },
    //     {
    //         name: 'Em của ngày mốt',
    //         lyric: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, eveniet harum? Dignissimos, impedit, vitae. Aperiam aspernatur commodi ducimus earum iste necessitatibus tempore, totam. Adipisci cupiditate, explicabo facilis id laborum sed?',
    //         singer: 'Bác Sơn Tùng',
    //         artist: 'Anh của Bác Sơn Tùng',
    //         category: 'Nhạc báo thức',
    //         views: 87968,
    //         downloads: 123131,
    //         per: 72
    //     },
    //     {
    //         name: 'Em của ngày hôm nào đó',
    //         lyric: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, eveniet harum? Dignissimos, impedit, vitae. Aperiam aspernatur commodi ducimus earum iste necessitatibus tempore, totam. Adipisci cupiditate, explicabo facilis id laborum sed?',
    //         singer: 'Hàng xóm Sơn Tùng',
    //         artist: 'Anh của Hàng sóm Sơn Tùng',
    //         category: 'Nhạc đám cưới',
    //         views: 789675,
    //         downloads: 352648,
    //         per: 11
    //     },
    //     {
    //         name: 'Em của ngày hôm nớ',
    //         lyric: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, eveniet harum? Dignissimos, impedit, vitae. Aperiam aspernatur commodi ducimus earum iste necessitatibus tempore, totam. Adipisci cupiditate, explicabo facilis id laborum sed?',
    //         singer: 'Má hai Sơn Tùng',
    //         artist: 'Anh của Má hai Sơn Tùng',
    //         category: 'Nhạc khai sinh',
    //         views: 678679,
    //         downloads: 57342,
    //         per: 46
    //     }
    // ];
    //
    // let [songIndex, setSongIndex] = useState(0);
    // let {audio, state, controls, ref} = useContext(PlayerContext);
    // let {playlist, setPlaylist} = useContext(PlaylistContext);
    //
    // if (state.duration && state.duration !== 0) {
    //     masterDuration = state.duration;
    // }
    //
    // let nextSong = () => {
    //     let tempPlayList = [...playlist];
    //     tempPlayList.shift();
    //     console.log(tempPlayList)
    //     if(tempPlayList.length == 0) controls.seek(masterDuration);
    //     else setPlaylist(tempPlayList)
    // };
    //
    // let removeSongByIndex = (i) => {
    //     let tempPlaylist = [...playlist];
    //     tempPlaylist.splice(i, 1);
    //     if(tempPlaylist.length == 0) controls.seek(masterDuration);
    //     else setPlaylist(tempPlaylist);
    // }
    //
    // const onSlideBarChange = value => {
    //     console.log(value);
    //     controls.seek(getSeekTime(value, masterDuration));
    // }
    //
    // const getTime = () => {
    //     let currentTime = getRoundTime(state.time, masterDuration);
    //     return currentTime ? currentTime : 0;
    // }
    let {songIndex, setSongIndex} = useContext(SongIndexContext);
    let {playlist, setPlaylist} = useContext(PlaylistContext);

    let [src, setSrc] = useState(convertToPlayerItemObject(playlist[songIndex]));
    let [position, setPosition] = useState(0);
    let [duration, setDuration] = useState(0);
    let [volume, setVolume] = useState(80);
    let [playbackRate, setPlaybackRate] = useState(1);
    let [loop, setLoop] = useState(false);
    let [playStatus, setPlayStatus] = useState('PLAYING');

    useEffect(() => {
        setSrc(convertToPlayerItemObject(playlist[songIndex]));
    }, [songIndex]);

    const items = () => {
        return playlist.map((item, index) => {
            return <Menu.Item key={index}>
                {item.name}
                <span onClick={() => {
                    playlist.splice(index, 1);
                    setPlaylist(playlist);
                }} className="text-danger ml-2">
                <i className="far fa-1x fa-times-circle"></i></span>
            </Menu.Item>
        });
    };

    const menu = (
        <Menu>
            {items()}
        </Menu>
    );


    return <FixedBottom offset={10}>
        <div style={{width: "91%", minHeight: "6em", maxHeight: "6em", textAlign: "center"}}>
            <Sound
                url={src}
                playStatus={playStatus}
                position={position}
                volume={volume}
                playbackRate={playbackRate}
                loop={loop}
                onLoading={({bytesLoaded, bytesTotal}) => console.log(`${bytesLoaded / bytesTotal * 100}% loaded`)}
                onLoad={() => console.log('Loaded')}
                onPlaying={(e) => {
                    // console.log({position: e.position, duration: e.duration});
                    setPosition(e.position);
                    setDuration(e.duration);
                }}
                onPause={() => console.log('Paused')}
                onResume={() => console.log('Resumed')}
                onStop={() => console.log('Stopped')}
                onFinishedPlaying={() => setPlayStatus('PAUSED')}
            />
            <Row>
                <Col span={24} style={playerBarStyle}>
                    <div className="row pb-2 pl-3 pr-3 pt-1">
                        <div className="col-12">
                            <div className="d-inline">
                                <span className="text-success">{playlist[songIndex].name}</span>
                                <span className="text-white"> - </span>
                                <span className="text-light">{playlist[songIndex].artist}</span>
                            </div>
                            <br/>
                            <div className="d-inline-flex">
                                <span className="flex-item text-secondary">Sáng tác: aaaa | Thể loại: aaaa | Lượt nghe: 123 | Lượt tải: 123123</span>
                            </div>
                            <br/>
                            <div className="d-flex align-items-center">
                                <a className="text-light" onClick={
                                    () => {
                                        playStatus == 'PLAYING' ? setPlayStatus('PAUSED') : setPlayStatus('PLAYING');
                                    }}>
                                    <i className={playStatus != 'PLAYING' ? 'fas fa-play' : 'fas fa-pause'}/>
                                </a>
                                <a
                                    onClick={
                                        () => {
                                            let nextIndex = songIndex + 1 >= playlist.length ? songIndex : songIndex + 1;
                                            setSongIndex(nextIndex);
                                        }} className="text-light ml-1">
                                    <i className="fas fa-step-forward"/></a>
                                <Slider className="flex-grow ml-3 mb-3 justify-content-center"
                                        style={{maxHeight: "0.3rem", width: "60%"}} tipFormatter={null}
                                        defaultValue={0}
                                        value={getRoundTime(position, duration)}
                                        onChange={(value) => {
                                            setPosition(getSeekTime(value, duration));
                                        }}>
                                </Slider>
                                <div className="text-white m-2"><span>{fancyTimeFormat(Math.floor(0))}</span>
                                </div>
                                <a className="text-success"><i className="fas fa-repeat-alt"/></a>
                                <a className="text-light ml-1"><i className="far fa-random"/></a>
                                <a className="text-light ml-1"><i className="fas fa-volume"/></a>
                                <Slider className="flex-grow ml-3 mb-3 flex-grow"
                                        style={{maxHeight: "0.2rem", width: "10%"}} tipFormatter={null}
                                        defaultValue={volume}
                                        onAfterChange={
                                            (value) => {
                                                console.log(value);
                                                setVolume(value)
                                            }
                                        }>
                                </Slider>
                                <div className="text-success">
                                    <Dropdown overlay={menu} placement="topCenter">
                                        <i className="fas fa-music"> Queue</i>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </FixedBottom>;
}

PlayerBarComponent.propTypes = {};
