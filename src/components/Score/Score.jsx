import "./Score.scss";

const Score = ({ type, title, children }) => {

    return (
        <div className="score">
            <h2>{title}</h2>
            <div className={type}>
                {children}
            </div>            
        </div>
    )
}

export default Score;