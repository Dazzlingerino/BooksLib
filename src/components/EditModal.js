import React, {useState} from "react";
import {Modal} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles2 = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        display: 'flex',
        height: 150,
        width: 450,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2),

    },

}));
export const EditModal = ({open, book, onSave, onCancel}) => {
    const classes = useStyles2();
    const [title, setTitle] = useState(book.Title)
    const [author, setAuthor] = useState(book.Author)
    const [date, setDate] = useState(book.Date)
    const [img, setImg] = useState(book.img)
    const [id, setId] = useState(book.id)
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleAuthorChange = (e) => {
        setAuthor(e.target.value)
    }
    const handleDateChange = (e) => {
        setDate(e.target.value)
    }
    const onSaveClick = () => {
        onSave({
            id: id,
            Author: author,
            Date: date,
            Title: title,
            img: img,
        })
    }

    return (
        <Modal
            className={classes.modal}
            open={open}
            onClose={onCancel}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div className={classes.paper}>
                <form className={classes.root} noValidate autoComplete="off">
                    <Input
                        onChange={handleAuthorChange}
                        label="Change Author"
                        defaultValue={author}
                        variant="outlined">
                    </Input>
                    <Input
                        onChange={handleTitleChange}
                        label="Change Title"
                        defaultValue={title}
                        variant="outlined">>
                    </Input>
                    <Input
                        onChange={handleDateChange}
                        label="Change Date"
                        defaultValue={date}
                        variant="outlined">>
                    </Input>
                </form>
                <Button size="medium" color="primary" onClick={onSaveClick}>
                    save
                </Button>
                <Button size="medium" color="secondary" onClick={onCancel}>
                    cancel
                </Button>
            </div>
        </Modal>
    )
}