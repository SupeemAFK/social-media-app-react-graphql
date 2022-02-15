import React, { useState } from 'react'
import getCroppedImg from '../../utils/CroppedImage'
import dataURLtoFile from '../../utils/dataURLtoFile'
import Cropper from 'react-easy-crop'

//styles 
import {
    Overlay,
    ProfilePicEditorContainer,
    ProfilePicEditorPaper,
    Header,
    Container,
    CropperContainer,
    BtnContainer,
    DoneBtn
} from './ProfilePicEditor.styles'
import { Slider } from '@mui/material'

export default function ProfilePicEditor({ handleOnCrop, image, setOpenProfilePicEditor }) {
    const [zoom, setZoom] = useState(1)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    function onCropComplete(croppedArea, croppedAreaPixels) {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    function handleOnSliderChange(e) {
        const value = e.target.value
        setZoom(value)
    }

    async function handleOnClick() {
        const { height, width, x, y } = croppedAreaPixels
        const newFilename = String(height) + String(width) + String(x) + String(y) + image.file.name

        const canvas = await getCroppedImg(image.data_url, croppedAreaPixels)
        const croppedImageUrl = canvas.toDataURL(image.file.type)
        const croppedImageFile = dataURLtoFile(croppedImageUrl, newFilename)

        handleOnCrop({ data_url: croppedImageUrl, file: croppedImageFile })
        setOpenProfilePicEditor(null)
    }

    return (
        <>
            <Overlay onClick={() => setOpenProfilePicEditor(null)} />
            <ProfilePicEditorContainer>
                <ProfilePicEditorPaper>
                    <Header>Crop Image</Header>
                    <Container>
                        <CropperContainer>
                            <Cropper
                                image={image.data_url}
                                cropShape='round'
                                showGrid={false}
                                crop={crop}
                                zoom={zoom}
                                minZoom={1}
                                maxZoom={10}
                                aspect={1}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                objectFit="horizontal-cover"
                            />
                        </CropperContainer>
                        <Slider 
                            onChange={handleOnSliderChange}
                            min={1}
                            max={10}
                            step={0.00000001}
                            defaultValue={1}
                            value={zoom}
                            size="small"
                            aria-label="Small"
                        />
                        <BtnContainer>
                            <DoneBtn onClick={handleOnClick} type="button">Done</DoneBtn>
                        </BtnContainer>
                    </Container>
                </ProfilePicEditorPaper>
            </ProfilePicEditorContainer>
        </>
    )
}
