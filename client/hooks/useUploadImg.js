import React, { useState } from "react";

export default function useUploadImg() {
    const [isUploading, setIsUploading] = useState(false);

    async function uploadImg(file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'kurkzobi')
        try {
            setIsUploading(true);
            const res = await fetch('https://api.cloudinary.com/v1_1/dkmwuwsvw/image/upload', { method: 'POST', body: formData })
            const data = await res.json();
            return data.url;
            
        } catch (error) {
            console.log(error)
        }
    }

    return { isUploading, uploadImg }
}