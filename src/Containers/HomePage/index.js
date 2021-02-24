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
    if (!props.Datasets) {
        return <LoadingIndicator/>
    }
    const dataset = (props.Datasets[0]);

    function intersperse(arr, sep) {
        if (arr.length === 0) {
            return [];
        }

        return arr.slice(1).reduce(function(xs, x, i) {
            return xs.concat([sep, x]);
        }, [arr[0]]);
    }
    return (
        <Container maxWidth="md">
            <h2
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                }}
            >
                Dataset Visualizer
            </h2>
        <Card className={classes.root}>
            <CardContent>
                   <div>
                       <a href={dataset.visualizer_url} target="_blank">
                       <img src={dataset.visualizer_url} style={{ marginTop: 20 }} />
                       </a>
                   </div>
            </CardContent>
        </Card>
            <h2
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                }}
            >
                Dataset Details
            </h2>
            <Card className={classes.root}>
                <CardContent>
                        <Table className={classes.table} aria-label="simple table">
                            <TableBody>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        Dataset :
                                    </TableCell>
                                    <TableCell align="left">{dataset.name}</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        Traffic Type :
                                    </TableCell>
                                    <TableCell align="left">{dataset.traffic_type}</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        Attack Type(s) :
                                    </TableCell>
                                    <TableCell align="left">{intersperse(dataset.attack_type,', ')}</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        Total number of features :
                                    </TableCell>
                                    <TableCell align="left">{dataset.no_of_features}</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        Data points :
                                    </TableCell>
                                    <TableCell align="left">{dataset.data_points}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                </CardContent>
            </Card>
</Container>

);
}
const mapStateToProps = ({firestore}) => {
    return {
        Datasets: firestore.ordered['Datasets']
    }
};

const mapDispatchToProps = {};

export default withRouter(compose(firestoreConnect(() => [
    { collection: 'Datasets' },
]),connect(mapStateToProps, mapDispatchToProps))(withFirebase(HomePage)));