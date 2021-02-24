import React, { Fragment } from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Bars from 'react-bars';
import {compose} from "redux";
import {firestoreConnect, withFirebase} from "react-redux-firebase";
import {connect} from "react-redux";
import LoadingIndicator from "../../Components/LoadinfIndicator";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';

const styles = theme => ({
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

function DashboardPage({classes, Datasets}) {
    const [dataSet, setDataSet] = React.useState('UNSW-NB15');
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    if (!Datasets) {
        return <LoadingIndicator/>
    }
    const handleChange = event => {
        setDataSet(event.target.value);
    };

    const dataset = (Datasets.filter(el => el.name === dataSet)[0]);

    function intersperse(arr, sep) {
        if (arr.length === 0) {
            return [];
        }

        return arr.slice(1).reduce(function(xs, x, i) {
            return xs.concat([sep, x]);
        }, [arr[0]]);
    }

    return(

    <Container >
        <SimpleDialog open={open} dataSet={dataset} onClose={handleClose} />

            <h1
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {dataset.name}
            </h1>
        <h5
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'blue'
            }}
            onClick={() => handleClickOpen()}
        >
            Click Here
        </h5>
            <h3
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                }}
            >
                Model Information
            </h3>
            <Card className={classes.root}>
                <CardContent>
                    <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    Dataset :
                                </TableCell>

                                <TableCell align="left" >
                                    <FormControl variant="outlined" className={classes.formControl}>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={dataset.name}
                                        onChange={handleChange}
                                        style={{ borderRadius: 8 + 'px' }}
                                    >
                                        {Datasets.map(el => <MenuItem key={el.name} value={el.name}>{el.name}</MenuItem> )}
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
function SimpleDialog(props) {
    const classes = useStyles();

    const {
        dataSet, onClose, open
    } = props;
    if (!dataSet ) {
        return (<LoadingIndicator />);
    }
    const handleClose = () => {
        onClose();
    };

    function intersperse(arr, sep) {
        if (arr.length === 0) {
            return [];
        }

        return arr.slice(1).reduce(function(xs, x, i) {
            return xs.concat([sep, x]);
        }, [arr[0]]);
    }


    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <Container >
            {/*<DialogTitle id="simple-dialog-title">Add New Waste Type</DialogTitle>*/}
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
                        <a href={dataSet.visualizer_url} target="_blank">
                            <img src={dataSet.visualizer_url} style={{ marginTop: 20, height: 400, width: 400 }} />
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
                                <TableCell align="left">{dataSet.name}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    Traffic Type :
                                </TableCell>
                                <TableCell align="left">{dataSet.traffic_type}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    Attack Type(s) :
                                </TableCell>
                                <TableCell align="left">{intersperse(dataSet.attack_type,', ')}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    Total number of features :
                                </TableCell>
                                <TableCell align="left">{dataSet.no_of_features}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    Data points :
                                </TableCell>
                                <TableCell align="left">{dataSet.data_points}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Container>

        </Dialog>
    );
}

const mapStateToProps = ({firestore}) => {
    return {
        Datasets: firestore.ordered['Datasets']
    }
};

const mapDispatchToProps = {};

export default compose(firestoreConnect(() => [
    { collection: 'Datasets' },
]),connect(mapStateToProps, mapDispatchToProps))(withStyles(styles)(withFirebase(DashboardPage)));