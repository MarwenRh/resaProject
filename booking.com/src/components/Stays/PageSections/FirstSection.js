import * as React from 'react';
import style from "../style/style.module.css";
import { SearchDeals } from "../SearchDeals/SearchDeals";

export default function FirstSection({ destination }) { // Déstructurez les props ici
    return (
        <>
            <div position="static" style={{ background: '#04668a', height: '25vh' }}>
                <h1 className={style.First_secth1}>Find your next stay</h1>
                <p className={style.First_secpara}>Search deals on hotels, homes and much more...</p>
            </div>
            <SearchDeals dest={destination} /> {/* Transmettez la prop correctement */}
        </>
    );
}
