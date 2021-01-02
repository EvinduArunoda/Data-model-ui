import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Bars from 'react-bars';
import {history} from "../../store";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {firestoreConnect, withFirebase} from "react-redux-firebase";
import {connect} from "react-redux";
import LoadingIndicator from "../../Components/LoadinfIndicator";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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
    formControl: {
        margin: 1,
        minWidth: 120,
    },
});

function DashboardPage(props) {
    const classes = useStyles();
    if (!props.Datasets) {
        return <LoadingIndicator/>
    }
    const dataset = (props.Datasets[0]);
    // const inputLabel = React.useRef(null);
    // const [labelWidth, setLabelWidth] = React.useState(0);
    // React.useEffect(() => {
    //     setLabelWidth(inputLabel.current.offsetWidth);
    // }, []);
    function intersperse(arr, sep) {
        if (arr.length === 0) {
            return [];
        }

        return arr.slice(1).reduce(function(xs, x, i) {
            return xs.concat([sep, x]);
        }, [arr[0]]);
    }

    return(
        <Container maxWidth="md">
            <h2
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                }}
                onClick={() => window.location.href = '/homepage'}
            >
                {dataset.name}
            </h2>
            <h4
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                }}
            >
                Model Information
            </h4>
            <Card className={classes.root}>
                <CardContent>
                    <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    Dataset :
                                </TableCell>
                                {/*<TableCell align="left" onClick={() => window.location.href = '/homepage'}> {dataset.name} </TableCell>*/}
                                <TableCell align="left" >
                                    <FormControl variant="outlined" className={classes.formControl}>
                                    {/*<InputLabel  id="demo-simple-select-outlined-label">*/}
                                    {/*    Dataset*/}
                                    {/*</InputLabel>*/}
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={dataset.name}
                                        onChange={() => console.log('here')}
                                        // labelWidth={labelWidth}
                                        style={{ borderRadius: 8 + 'px' }}
                                    >
                                        <MenuItem value={dataset.name}>{dataset.name}</MenuItem>
                                    </Select>
                                </FormControl>
                                </TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    Algorithms used :
                                </TableCell>
                                <TableCell align="left">{intersperse(dataset.algorithms,', ')}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card className={classes.root}>
                <CardContent>
                    <h5
                        style={{
                            display: 'flex',
                            justifyContent: 'left',
                            alignItems: 'left',
                            // padding: 5,
                        }}
                    >
                        Attack Detection :
                    </h5>
                    <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell align="center">Predicted attack detection</TableCell>
                                    <TableCell align="center">Actual detection</TableCell>
                                </TableRow>
                            </TableHead>
                        <TableBody>

                        <TableRow >
                                <TableCell component="th" scope="row">
                                    NOR :
                                </TableCell>
                                <TableCell align="center">{dataset.nor.predict ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="center">{dataset.nor.actual !== undefined ? dataset.nor.actual : '-'}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    DoS :
                                </TableCell>
                                <TableCell align="center">{dataset.dos.predict ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="center">{dataset.dos.actual !== undefined ? dataset.dos.actual : '-'}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    SQL :
                                </TableCell>
                                <TableCell align="center">{dataset.sql.predict ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="center">{dataset.sql.actual !== undefined ? dataset.sql.actual : '-'}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                   DDos :
                                </TableCell>
                                <TableCell align="center">{dataset.DDos.predict ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="center">{dataset.DDos.actual !== undefined ? dataset.DDos.actual : '-'}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    Other :
                                </TableCell>
                                <TableCell align="center">{dataset.other.predict ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="center">{dataset.other.actual !== undefined ? dataset.other.actual : '-'}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <h4
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                }}
            >
                Intrusion Detection Workflow
            </h4>
            <Card className={classes.root}>
                <CardContent>
                    <Bars data={[{label:'Packet Capture :', value:dataset.pkt_capture, barColor: '#03e3fc'},
                    {label:'Feature Extraction :', value:dataset.feature_extraction, barColor:'red'}]} makeUppercase={false}/>
                </CardContent>
            </Card>
            <h4
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                }}
            >
                Performance Metrics
            </h4>
            <Card className={classes.root}>
                <CardContent>
                    <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    Precision :
                                </TableCell>
                                <TableCell align="left">{dataset.precision}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    Recall :
                                </TableCell>
                                <TableCell align="left">{dataset.recall}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    FAR :
                                </TableCell>
                                <TableCell align="left">{dataset.far}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    TNR :
                                </TableCell>
                                <TableCell align="left">{dataset.tnr}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    Accuracy :
                                </TableCell>
                                <TableCell align="left">{dataset.accuracy}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Container>
    )
}

const mapStateToProps = ({firestore}) => {
    return {
        Datasets: firestore.ordered['Datasets']
    }
};

const mapDispatchToProps = {};

export default withRouter(compose(firestoreConnect(() => [
    { collection: 'Datasets' },
]),connect(mapStateToProps, mapDispatchToProps))(withFirebase(DashboardPage)));