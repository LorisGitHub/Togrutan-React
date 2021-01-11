import React from 'react';
import './Forum.css';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function Forum (){
    const classes = useStyles();

    const rows = [
        {
            topic: 'Rate The Last Movie You Saw',
            username: 'TheUsualSuspect',
            lastPost: new Date(2019, 11, 17),
            msgNumber: 356
        },
        {
            topic: 'CURRENT MOVIE CLICHES',
            username: 'GulfportDoc',
            lastPost: new Date(2020, 5, 4),
            msgNumber: 269
        },
        {
            topic: 'Tragic endings or happy endings?',
            username: 'LordWhis',
            lastPost: new Date(2020, 10, 13),
            msgNumber: 123
        },
        {
            topic: 'My Top 10 Films of 2020',
            username: 'ScarletLion',
            lastPost: new Date(2021, 0, 7),
            msgNumber: 75
        },
        {
            topic: 'Have you ever written an essay on film?',
            username: 'Rhys',
            lastPost: new Date(2020, 5, 5),
            msgNumber: 45
        },
        {
            topic: 'Worst Lead Role Casting Decision ',
            username: 'Darth Wish',
            lastPost: new Date(2020, 10, 23),
            msgNumber: 820
        },
        {
            topic: 'Challenge: One Film for every Country',
            username: 'Jabs',
            lastPost: new Date(2020, 11, 2),
            msgNumber: 49
        },
        {
            topic: 'The making of a favorite movies list, how do you make yours?',
            username: 'MovieFan1988',
            lastPost: new Date(2021, 0, 10),
            msgNumber: 14
        },
    ];

    const getLastPostTimestamp = (lastpost: Date) => {
        const today: Date = new Date();
        const diffTime = today.getTime() - lastpost.getTime();
        const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
        if(diffDays/365 > 1){
            return Math.round(diffDays/365) + " years ago";
        } else if(diffDays/30 > 1) {
            return Math.round(diffDays/30) + " months ago";
        } else {
            return diffDays + " days ago";
        }
    }

    return (
        <div style={{ margin: '30px'}}>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead style={{backgroundColor: '#3f51b5'}}>
                        <TableRow>
                            <TableCell className='white-cell'>Topic</TableCell>
                            <TableCell className='white-cell' align="right">User</TableCell>
                            <TableCell className='white-cell' align="right">Last post</TableCell>
                            <TableCell className='white-cell' align="right">Replies</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.username}>
                                <TableCell component="th" scope="row">
                                    {row.topic}
                                </TableCell>
                                <TableCell align="right">{row.username}</TableCell>
                                <TableCell align="right">{getLastPostTimestamp(row.lastPost)}</TableCell>
                                <TableCell align="right">{row.msgNumber}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}