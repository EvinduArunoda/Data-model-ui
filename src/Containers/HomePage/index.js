import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {history} from "../../store";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
function HomePage() {
    const classes = useStyles();

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
                       <a href='https://www.researchgate.net/profile/Douglas_Gross/publication/270438309/figure/fig2/AS:642161976553472@1530114754734/Dataset-Visualization-aleft-top-after-SMOTE-bright-top-after-Tomek-Link-cleaning.png' target="_blank">
                       <img src='https://www.researchgate.net/profile/Douglas_Gross/publication/270438309/figure/fig2/AS:642161976553472@1530114754734/Dataset-Visualization-aleft-top-after-SMOTE-bright-top-after-Tomek-Link-cleaning.png' style={{ marginTop: 20 }} />
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
                                    <TableCell align="left">UNSWNBIS</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        Traffic Type :
                                    </TableCell>
                                    <TableCell align="left">Synthetic</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        Attack Type :
                                    </TableCell>
                                    <TableCell align="left">Worms, Shellcode, Reconnaissance, Generic, Backdoor, DoS, Exploits, Fuzzers</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        Total number of features :
                                    </TableCell>
                                    <TableCell align="left">49</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        Data points
                                    </TableCell>
                                    <TableCell align="left">2 million</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                </CardContent>
            </Card>
</Container>

);
}

export default HomePage;