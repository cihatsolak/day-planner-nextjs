import { useState, useEffect } from "react";
import { storage, db } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import '../../styles/ProgressBar.module.css'

export default function ProgressBar({ file, setFile }) {

    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null)
    const [cancel, setCancel] = useState(false)

    useEffect(() => {
        const collectionRef = collection(db, 'gallery')
        const storageRef = ref(storage, file.name)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed',
            (snapshot) => {
                const perCent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (!cancel) {
                    setProgress(perCent)
                }
            },
            (err) => {
                if (!cancel) {
                    setError(err)
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    if (!cancel) {
                        setUrl(downloadURL)
                        if (url != null) {
                            const data = addDoc(collectionRef, { url, date: serverTimestamp() })
                        }
                    }
                });
            }
        );

        if (url && !cancel) {
            setFile(null)
        }

        return () => setCancel(false)

    }, [url, file])

    return (
        <div className="progress-bar" style={{ width: progress + '%' }}></div>
    )
}