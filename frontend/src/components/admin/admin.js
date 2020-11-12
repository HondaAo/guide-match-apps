import Axios from 'axios'
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StarIcon from '@material-ui/icons/Star';
import './Admin.css'
import { TablePagination } from '@material-ui/core';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      marginTop: '60px'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    table: {
        minWidth: 650,
      },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
}));

function Admin() {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [ guides, setGuides ] = useState([])
    const [ tours, setTours] = useState([])
    const [ posts, setPosts ] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    useEffect(()=>{
      Axios.get('/api/guide')
      .then(res => setGuides(res.data))
      .catch(err => console.log(err))
      Axios.get('/api/tour')
      .then(res => setTours(res.data))
      .catch(err => console.log(err))
      Axios.get('/api/post')
      .then(res => {
          setPosts(res.data)
          console.log(res.data)
      })
      .catch(err => console.log(err))
    },[])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <div className="admin-page">
         <header style={{ marginBottom: '30px'}}>
             <Link to="/"><strong><h4>Expo</h4></strong></Link>
         </header>
         <h1>Admin Page</h1> 
         <div className={classes.root}>
           <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
             <AccordionSummary
               expandIcon={<ExpandMoreIcon />}
               aria-controls="panel1bh-content"
               id="panel1bh-header"
             >
               <Typography className={classes.heading}>Guide List</Typography>
               <Typography className={classes.secondaryHeading}></Typography>
             </AccordionSummary>
             <AccordionDetails>
               <Typography>
               <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Guide List</TableCell>
                      <TableCell align="right">Country</TableCell>
                      <TableCell align="right">City</TableCell>
                      <TableCell align="right">Charge</TableCell>
                      <TableCell align="right">Star</TableCell>
                      <TableCell>Detail</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {guides
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((guide) => {
                      return (
                      <TableRow key={guide._id}>
                        <TableCell component="th" scope="row">
                          {guide.name}
                        </TableCell>
                        <TableCell align="right">{guide.country}</TableCell>
                        <TableCell align="right">{guide.city}</TableCell>
                        <TableCell align="right">{guide.rate}</TableCell>
                        <TableCell align="right"><StarIcon style={{ marginRight: '20px'}}/>{guide.star}</TableCell>
                        <TableCell><Link to={`/guide/${guide._id}`}><AssignmentIndIcon /></Link></TableCell>
                      </TableRow>
                    )})}
                  </TableBody>
                 </Table>
                 </TableContainer>
                 <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={guides.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
               </Typography>
             </AccordionDetails>
           </Accordion>
           <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
             <AccordionSummary
               expandIcon={<ExpandMoreIcon />}
               aria-controls="panel2bh-content"
               id="panel2bh-header"
             >
               <Typography className={classes.heading}>Tour List</Typography>
             </AccordionSummary>
             <AccordionDetails>
               <Typography>
               <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Host Id</TableCell>
                      <TableCell align="right">Country</TableCell>
                      <TableCell align="right">City</TableCell>
                      <TableCell align="right">Charge</TableCell>
                      <TableCell align="right">Star</TableCell>
                      <TableCell align="right">isAuth</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tours
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((tour) => {
                      return (
                      <TableRow key={tour._id}>
                        <TableCell component="th" scope="row">
                          <Link to={`/tour/${tour._id}`}>{tour.host}</Link>
                        </TableCell>
                        <TableCell align="right">{tour.country}</TableCell>
                        <TableCell align="right">{tour.city}</TableCell>
                        <TableCell align="right">{tour.charge}</TableCell>
                        <TableCell align="right">{tour.date}</TableCell>
                        <TableCell align="right">{tour.isAuth}</TableCell>
                      </TableRow>
                    )})}
                  </TableBody>
                 </Table>
                 </TableContainer>
                 <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={tours.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
               </Typography>
             </AccordionDetails>
           </Accordion>
           <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
             <AccordionSummary
               expandIcon={<ExpandMoreIcon />}
               aria-controls="panel3bh-content"
               id="panel3bh-header"
             >
               <Typography className={classes.heading}>Post List</Typography>
             </AccordionSummary>
             <AccordionDetails>
               <Typography>
               <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Post List</TableCell>
                      <TableCell align="right">Title</TableCell>
                      <TableCell align="right">Comment</TableCell>
                      <TableCell align="right">Image</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {posts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((post) => {
                      return (
                      <TableRow key={post._id}>
                        <TableCell component="th" scope="row">
                          id:{post.user}
                        </TableCell>
                        <TableCell align="right">{post.title}</TableCell>
                        <TableCell align="right">{post.comment}</TableCell>
                        <TableCell align="right">{post.image.url}</TableCell>
                      </TableRow>
                    )})}
                  </TableBody>
                 </Table>
                 </TableContainer>
                 <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={posts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
               </Typography>
             </AccordionDetails>
           </Accordion>
         </div>
        </div>
    )
}

export default Admin
