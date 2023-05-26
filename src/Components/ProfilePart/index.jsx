import { useState } from "react";
import {PropTypes} from 'prop-types'
import { Link } from "react-router-dom";



export default function UserPart({accountTitle, accountAmount, accountBalance}){

    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const handleButtonClick = () => {
        setIsButtonClicked(!isButtonClicked);
    }


    return(
        <article className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">{accountTitle}</h3>
                <p className="account-amount">{accountAmount}</p>
                <p className="account-amount-description">{accountBalance}</p>
            </div>

            <div className="account-content-wrapper cta">
                <Link to={"/transactions"}>
                    {""}
                    <button
                        className={`transaction-button ${isButtonClicked ? "transaction-button-clicked" : ""}`}
                        onClick={handleButtonClick}
                    >
                        View transaction
                    </button>
                </Link>
            </div>
        </article>
    )
}

UserPart.propTypes = {
    accountTitle : PropTypes.string.isRequired,
    accountBalance : PropTypes.string.isRequired,
    accountAmount : PropTypes.string.isRequired,
}

