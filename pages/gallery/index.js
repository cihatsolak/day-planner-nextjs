import Title from '../../components/gallery/Title'
import UploadForm from '../../components/gallery/UploadForm'
import ImageGrid from '../../components/gallery/ImageGrid'

export default function Home() {
    return (
        <div className="App">
            <Title />
            <UploadForm />
            <ImageGrid />
        </div>
    )
}