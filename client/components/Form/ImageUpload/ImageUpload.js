import React from 'react'
import { toast } from 'react-toastify'
import ImageUploading from 'react-images-uploading';

//styles and icons
import { RiImageAddLine } from 'react-icons/ri'
import { UploadBtn } from './ImageUpload.styles'

export default function ImageUpload({ handleOnImageUpload }) {
    return (
        <div>
          <ImageUploading
            onChange={handleOnImageUpload}
            onError={() => toast.error("Can't upload image more than 4", {
              position: "top-right",
              autoClose: 5000,
              closeOnClick: true,
              pauseOnHover: false,
            })}
            multiple
            maxNumber={4}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              <div>
                  <UploadBtn onClick={onImageUpload} type="button"><RiImageAddLine /></UploadBtn>
              </div>
            )}
          </ImageUploading>
        </div>
      );
}
