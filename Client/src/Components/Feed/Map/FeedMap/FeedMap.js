import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import FeedPostElement from 'Components/Feed/Map/FeedPostElement/FeedPostElement';
import SmallDate from 'Components/Pipes/SmallDate';
import React, { useEffect, useState } from 'react';
import getDistance from 'Components/Feed/Map/FeedMap/DistanceCalculate';
import './FeedMap.css';

const FeedMap = ({ feedData = [], addLike = undefined, addComment = undefined, Center=[], setCenter=undefined, updateFeed=undefined, editPost=undefined, deletePost=undefined}) => {

    //States
    const [ShowImageIcon, setShowImageIcon] = useState(false);
    const [FirstUpdate, setFirstUpdate] = useState(true);
    const [Feed, setFeed] = useState(feedData);

    // Functions
    const addLikeToPost = (e) => addLike(e);
    const updatePost = (e) => editPost(e);
    const deletedPost = (e) => deletePost(e);
    const addCommentToPost = (e, postId) => addComment(e, postId);

    const calcDistance = (e) => {
        var distance = getDistance([e.center.lat, e.center.lng], [Center[0], Center[1]]);
        if(distance >= 82700) {
            setCenter([e.center.lat, e.center.lng]);
            updateFeed([e.center.lat, e.center.lng]);
            setFirstUpdate(false);
        }
    };

    useEffect(() => {
        setFeed(feedData)
        if (feedData.length >= 30 && ShowImageIcon) setShowImageIcon(false);
        else if (feedData.length <= 30 && !ShowImageIcon) setShowImageIcon(true);
    }, [feedData])

    return (
        <>
            <MapContainer center={[0,0]} zoom={10} scrollWheelZoom={true} className='mapContainer' eventHandlers={{}}>
                <ChangeView setTheView={FirstUpdate} center={Center} zoom={10} onMove={calcDistance} />
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {Feed.map((element, index) => {
                    return <FeedPostElement
                        key={'feedElement' + index}
                        postId={element._id}
                        userId={element._source.UserId}
                        lat={element._source.LocationLat}
                        lan={element._source.LocationLan}
                        title={element._source.Title}
                        image={element._source.Image}
                        addLike={addLikeToPost}
                        addComment={addCommentToPost}
                        description={element._source.Description}
                        date={SmallDate(element.TimeStamp)}
                        showImgIcon={ShowImageIcon}
                        editPost={updatePost}
                        deletePost={deletedPost}
                        isPublic={element._source.IsPublic}
                    />
                })}
                
            </MapContainer>
        </>
    );
};

// For centering the map
const ChangeView = ({ center, zoom, onMove, setTheView }) => {
    const map = useMap();
    if(setTheView){
        map.setView(center, zoom);
    }
    useMapEvents({
        moveend(){
            onMove({center: map.getCenter()});
        },
    })
    return null;
};

export default FeedMap;