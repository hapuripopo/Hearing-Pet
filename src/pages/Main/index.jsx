import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";

import Header from "../../components/Header";
import KakaoMap from "../../components/KakaoMap";
import HospitalCard from "./components/HospitalCard";
import { ReactComponent as Search } from "../../assets/icons/search.svg";

import "./style.css";


export default function Main() {
    const API_KEY = process.env.REACT_APP_HOSPITAL_PLACE;
    const API_URL = "https://openapi.gg.go.kr/OTHERHALFANIMEDIWELF";

    const [hospitalDatas, setHospitalDatas] = useState([]);

    // 병원/약국 정보를 가져옵니다.
    useEffect(()=> {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_URL,{
                    params: {
                        KEY: API_KEY,
                        TYPE: "json",
                        pIndex: "1",
                    },
                });

                console.log(response.data.OTHERHALFANIMEDIWELF[1].row);
                setHospitalDatas(response.data.OTHERHALFANIMEDIWELF[1].row);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <Header />

            <main className="Main">
                <section className="SearchSection">
                    <KakaoMap />

                    <div className="SearchInput">
                        <input
                            type="text" 
                            className="SearchInput__input"
                        />

                        <button className="SearchInput__button">
                            <span>
                                <Search width="18" height="18" />
                            </span>
                        </button>
                    </div>
                </section>

                <div className="CardContainer">
                    <ul className="CardList">
                        {
                        
                            hospitalDatas.length > 0 && (
                                hospitalDatas.map(data => {
                                    return (
                                        <HospitalCard
                                            hName = {data.CMPNM_NM}
                                            hType = {data.INDUTYPE_NM}
                                            address = {data.LOCPLC_ROADNM_ADDR}
                                        />
                                    );
                                })
                            )
                        }
                    </ul>
                </div>
            </main>
        </>
    );
}
