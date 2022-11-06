

export default function Modal({ selectedPicture, setSelectedPicture }) {
    const handleClick = (event) => {
        if (event.target.classList.contains('backdrop')) {
            setSelectedPicture(null);
        }
    }

    return (
        <div className="backdrop" onClick={handleClick}>
            <img src={selectedPicture} alt="image" />
        </div>
    )
} 