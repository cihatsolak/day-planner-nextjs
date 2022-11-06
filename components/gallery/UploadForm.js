import { useState } from "react"
import ProgressBar from "./ProgressBar";

export default function UploadForm() {

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const typeList = ['image/png', 'image/jpeg'];

    const handleChange = (event) => {
        let selectedFile = event.target.files[0];
        if (selectedFile && typeList.includes(selectedFile.type)) {
            setFile(selectedFile);
            setError('')
        } else {
            setFile(null)
            setError('Please upload a png or jpeg/jpg file.')
        }

        console.log(event.target.files);
    }

    return (
        <form>
            <label>
                <input type="file" onChange={handleChange} />
                <span>+</span>
            </label>

            <div className="output">
                {error && <div className="error">{error}</div>}
                {file && <ProgressBar file={file} setFile={setFile} />}
            </div>
        </form>
    )
}
