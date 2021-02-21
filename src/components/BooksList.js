import React, {useEffect} from 'react';
import {createMuiTheme, makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {EditModal} from "./EditModal";
import axios from "axios";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const themeX = createMuiTheme({
    palette: {
        type: "dark",
        background: {
            paper: "#222222"
        }
    }
});
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#000000'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal2: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#222222"
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: "#222222",
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    paper: {
        display: 'flex',
        width: 150,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1),

    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '140%',
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: '#3c3c3c',
        padding: theme.spacing(6),
    },
}));

function BooksList() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openBook, setOpenBook] = React.useState(false);
    const [books, setBooks] = React.useState([]);
    const [bookDescription, setBookDescription] = React.useState();


    useEffect(() => {
        const fetchData = async () => {
            const booksData = await axios.get('/BooksLib/books.json',
            );
            setBooks(processBooksData(booksData.data));
        };
        fetchData();
    }, []);

    const handleOnCLickSave = (object) => {
        let items = [...books];
        items[items.findIndex(el => el.id === object.id)] = {...object}
        setBooks(processBooksData(items))
        setBookDescription(object)
        setOpen(false);
    }

    const handleClickOpen = () => {
        setOpenBook(true);
    };

    const handleClickClose = () => {
        setOpenBook(false);
    };

    const handleOpen = (editingBook) => {
        setBookDescription(editingBook)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (object) => {
        let items = [...books];
        setBooks(processBooksData(items.filter(data => data.id !== object.id)))
        alert(`Book "${object.Title}" was deleted`)
    }

    return (
        <React.Fragment>
            <MuiThemeProvider theme={themeX}>
                <CssBaseline/>
                <AppBar position="relative">
                    <Toolbar>
                        <LibraryBooksIcon className={classes.icon}/>
                        <Typography variant="h6" color="inherit" noWrap>
                            Books Library
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main className={classes.root}>
                    <div className={classes.heroContent}>
                        <Container maxWidth="sm">
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                Collection
                            </Typography>
                            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                The best books of the whole time
                            </Typography>
                            <div className={classes.heroButtons}>
                                <Grid container spacing={2} justify="center">
                                    <Grid item>
                                        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                                            Add new book
                                        </Button>
                                        <Dialog open={openBook} onClose={handleClickClose}
                                                aria-labelledby="form-dialog-title">
                                            <DialogTitle id="form-dialog-title">Add book</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    To add new book to this website, please enter title, author and
                                                    date
                                                    here. We will send updates
                                                    occasionally.
                                                </DialogContentText>
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="name"
                                                    label="Title"
                                                    type="email"
                                                    fullWidth
                                                />
                                                <TextField
                                                    margin="dense"
                                                    id="name"
                                                    label="Author"
                                                    type="email"
                                                    fullWidth
                                                />
                                                <TextField
                                                    margin="dense"
                                                    id="name"
                                                    label="Date"
                                                    type="email"
                                                    fullWidth
                                                />
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClickClose} color="primary">
                                                    Save
                                                </Button>
                                                <Button onClick={handleClickClose} color="secondary">
                                                    Cancel
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                    </div>
                    <Container className={classes.cardGrid} maxWidth="md">
                        <Grid container spacing={4}>
                            {books.map((bookDetail) => (
                                <Grid item key={bookDetail.id} xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={bookDetail.img}
                                            title="Image title"
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {bookDetail.Author}
                                            </Typography>
                                            <Typography>
                                                {bookDetail.Title}
                                            </Typography>
                                            <Typography>
                                                {bookDetail.Date}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                View
                                            </Button>
                                            <Button size="small" color="primary"
                                                    onClick={() => handleOpen(bookDetail)}>
                                                Edit
                                            </Button>
                                            <Button size="small" color="secondary"
                                                    onClick={() => handleDelete(bookDetail)}>
                                                Delete
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                            {open &&
                            <EditModal
                                open={open}
                                book={bookDescription}
                                onSave={(object) => handleOnCLickSave(object)}
                                onCancel={handleClose}
                            />
                            }
                        </Grid>
                    </Container>
                </main>
                <footer className={classes.footer}>
                    <Typography variant="h6" align="center" gutterBottom>
                        Footer
                    </Typography>
                    <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                        Reading books is cool!
                    </Typography>
                    <Copyright/>
                </footer>
            </MuiThemeProvider>
        </React.Fragment>
    )
}

export default BooksList;

const processBooksData = books => {
    function trim_str(str) {
        const regex = /[^a-zA-Z\s]+/g;
        return str.replace(regex, '').toLowerCase().trim().split(' ').map((word) => {
            return word[0].toUpperCase() + word.substring(1);
        }).join(" ");
    }

    function normalize(value, expectedType, fallback = "Unknown") {
        return typeof (value) === expectedType ? value : fallback;
    }

    return books.map(bookDetail => ({
            id: normalize(bookDetail.id, "number"),
            Author: normalize(bookDetail.Author, "string"),
            Title: trim_str(normalize(bookDetail.Title, "string")),
            Date: normalize(bookDetail.Date, "number"),
            img: normalize(bookDetail.img, "string",
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pinclipart.com%2Fpicdir%2Fmiddle%2F169-1690579_book-icon-png-clip-art-transparent-download-book.png&f=1&nofb=1"),

        })
    )
}
