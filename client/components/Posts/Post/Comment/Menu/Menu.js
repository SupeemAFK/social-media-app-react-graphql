import React from 'react'
import dataURLtoFile from '../../../../../utils/dataURLtoFile'

//styles and icons
import { StyledMenu, StyledMenuItem } from '../../../../../styles/GlobalStyles'
import { CircularProgress } from '@mui/material'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

//graphql
import { useMutation } from '@apollo/client'
import { DELETE_COMMENT } from '../../../../../lib/Mutations'

export default function Menu({ comment, commentForm, setCommentForm, id, anchorEl, setAnchorEl, open }) {
    const [deleteComment, { loading: deleteCommentLoading }] = useMutation(DELETE_COMMENT, {
        onError: (deleteCommentError) => {
            console.error(deleteCommentError)
        }
    })

    async function setEditCommentForm() {
        setAnchorEl(null)
        if (!comment.commentImg ) {
            setCommentForm({...commentForm, ...comment, commentImg: "" })
            return
        }

        const imgBase64 = await toDataURL(comment.commentImg)
        const imgFile = await dataURLtoFile(imgBase64, getName(comment.commentImg))
        const imgObj = { data_url: comment.commentImg, file: imgFile}
        setCommentForm({...commentForm, ...comment, commentImg: imgObj })
    }

    function handleDeleteComment() {
        deleteComment({variables: {id: id, commentId: comment.id}})
        setCommentForm({ commentMessage: "", commentImg: "" })
    }

    if (deleteCommentLoading) {
        return (
            <StyledMenu
            id="basic-menu" 
            anchorEl={anchorEl} 
            open={open} 
            onClose={() => setAnchorEl(null)}
            >                
                <StyledMenuItem type="button"><CircularProgress /></StyledMenuItem>
            </StyledMenu>
        )
    }

    return (
        <StyledMenu
            id="basic-menu" 
            anchorEl={anchorEl} 
            open={open} 
            onClose={() => setAnchorEl(null)}
        >                
            <StyledMenuItem type="button" onClick={setEditCommentForm} ><AiFillEdit style={{ marginRight: "0.2rem" }} /> Edit</StyledMenuItem>
            <StyledMenuItem type="button" onClick={handleDeleteComment} ><AiFillDelete  style={{ marginRight: "0.2rem" }}/> Delete</StyledMenuItem>
        </StyledMenu>
    )
}

const toDataURL = url => fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
     }))

function getName(url) {
    const arr = url.split('/')
    return arr[8]
}