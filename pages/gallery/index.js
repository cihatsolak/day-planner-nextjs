import Title from '../../components/gallery/Title'
import UploadForm from '../../components/gallery/UploadForm'
import ImageGrid from '../../components/gallery/ImageGrid'
import Modal from '../../components/gallery/Modal'
import { useState } from 'react'

export default function Home() {
    const [selectedPicture, setSelectedPicture] = useState(null);

    return (
        <div className="App">
            <Title />
            <UploadForm />
            <ImageGrid setSelectedPicture={setSelectedPicture} />
            {selectedPicture && <Modal selectedPicture={selectedPicture} setSelectedPicture={setSelectedPicture} />}
        </div>
    )
}