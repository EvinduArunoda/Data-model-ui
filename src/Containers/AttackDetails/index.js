import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {firestoreConnect, withFirebase} from "react-redux-firebase";
import {connect} from "react-redux";
import LoadingIndicator from "../../Components/LoadinfIndicator";
import firebase from "firebase/app";
import {history} from "../../store";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import IconButton from "@material-ui/core/IconButton";
import { CSVLink, CSVDownload} from "react-csv";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: 20
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 0,
    },
    menuButton: {
        marginTop: 20,
    },
    field: {
        width: '100%',
        marginBottom: 20,
        backgroundColor: 'white'
    },
    table: {
        minWidth: 400,
    },
});


function HomePage(props) {
    const classes = useStyles();
    if (!props.Attacks) {
        return <LoadingIndicator/>
    }
    const attacks = (props.Attacks);

    const checkRead = async () => {
        const doc = firebase.firestore().collection('Configs').doc('read_check');
        await doc.update({
            read: true
        })
    }
    const deleteAlert = async (id) => {
        const doc = firebase.firestore().collection('Attacks').doc(id);
        await doc.delete()
    }
    checkRead();
    function intersperse(arr, sep) {
        if (arr.length === 0) {
            return [];
        }
        return arr.slice(1).reduce(function(xs, x, i) {
            return xs.concat([sep, x]);
        }, [arr[0]]);
    }
    const csvData = attacks.map(el => [el.timestamp.toDate().toLocaleString(), el.type, el.ipAddress])
    return (
        <Container maxWidth="md">
            <h2
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                Attacks Detected
            </h2>
            <button>
                <CSVLink data={csvData}>Download CSV</CSVLink>
            </button>
            <br/>
            <br/>
            <br/>
            {attacks.map(el => (
                <Card className={classes.root} key={el.id}>
                    <CardContent>
                        <Table className={classes.table} aria-label="simple table">
                            <TableBody>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        Date :
                                    </TableCell>
                                    <TableCell align="left">{el.timestamp.toDate().toLocaleString()}</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        Attack Type :
                                    </TableCell>
                                    <TableCell align="left">{el.type}</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        Actions to take :
                                    </TableCell>
                                    <TableCell align="left">{intersperse(el.actionsToTake,', ')}</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        IP address :
                                    </TableCell>
                                    
                                    <TableCell align="left">{el.ipAddress}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <IconButton
                            edge="start"
                            style={{
                                display: "flex",
                                marginLeft: "auto",
                                marginTop: 30
                            }}
                            color="inherit"
                            aria-label="menu"
                            onClick={()=>deleteAlert(el.id)}
                        >
                            <DeleteForeverOutlinedIcon />
                        </IconButton>
                    </CardContent>
                </Card>
                )
            )}
</Container>

);
}
const mapStateToProps = ({firestore}) => {
    return {
        Attacks: firestore.ordered['Attacks']
    }
};

const mapDispatchToProps = {};

export default withRouter(compose(firestoreConnect(() => [
    { collection: 'Attacks',
    orderBy:["timestamp","desc"]}
]),connect(mapStateToProps, mapDispatchToProps))(withFirebase(HomePage)));