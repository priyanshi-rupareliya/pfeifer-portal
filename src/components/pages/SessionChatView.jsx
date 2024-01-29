import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { getSessionMessages } from "../../services/Service";
import { useQuery } from "react-query";
import { PFEIFER_BASE_URL } from "../../utils/Constants";
import parse from 'html-react-parser';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { CircularProgress } from "@mui/material";

function SessionChatView(props) {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const [conversationId] = useState(query.get("id"));
    const [name] = useState(query.get("name"));
    const { data: result, refetch, isFetching } = useQuery("sessionMessages", () => getSessionMessages(conversationId))

    function renderMessages() {
        return result?.map((item, index) => {
            const cssClassName = item.sender === "bot" ? "message" : "message self"

            if (item.type === 'text') {

                return <div key={`message-${index}`} className={cssClassName}>
                    <div className="message-content">{parse(item.message)}</div>
                </div>
            } else if (item.type === 'search') {
                const message = JSON.parse(item.message);
                
                return <div key={`message-${index}`} className="message">
                    <div className="message-content">{message.text}
                    
                    {
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={10}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Pagination]}
                            className="mySwiper mt-2"
                        >
                            {message.data.map((data, index) => {
                                return <SwiperSlide key={`product-${index}`}>
                                    <div className="carousel-card-div"> 
                                        <img className="carousel-card-image" src={`${PFEIFER_BASE_URL}/media/catalog/product${data.image}`} />
                                        <p className="carousel-card-name">{data.name}</p>
                                    </div>
                                </SwiperSlide>

                            }) }
                        </Swiper>
                    }
                    </div>
                </div>
            }
        })
    }

    return (
        <div className="row chat-message-container m-0 p-4">
            <div className="col-6 mx-auto">
                <h3>
                    {name}
                </h3><hr className="chatMessage-hr"></hr>
                {renderMessages()}

                { isFetching && <div className="p-3 text-center">
                        <CircularProgress size={30} color="inherit"/>
                    </div>
                }
            </div>
        </div>
    );
}
export default SessionChatView;
