import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { Container, Grid, TextField, makeStyles } from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function useCoordinates(){
    const [coordinate, setCoordinate] = useState({
      lat:0,
      long:0
    });
    let geoId;
    
    useEffect(()=>{
      
      geoId = window.navigator.geolocation.watchPosition(position=>{
        setCoordinate({
          lat:position.coords.latitude,
          long:position.coords.longitude
        })
      })
      
      return ()=>{
        navigator.geolocation.clearWatch(geoId)
      }
    }
    )
    
   return coordinate;
  }

const New = () => {
    const [name, setname] = useState(" ");
    const coordinate = useCoordinates();


    const AddUserHandler = event => {
        event.preventDefault();
        const user = {
            name: name.toString(),
            lat: coordinate.lat.toString(),
            long : coordinate.long.toString()
        };


        setname('');
        if(user.name.length === 0){
            alert("Please enter Username") ;
        }
        else
           axios.post('http://localhost:4000/app/post', user) ;
    };

    const NameChange = event => {
        setname(event.target.value);
    }

    return (
        <div>
            <div className="f" onSubmit={AddUserHandler}>
                
                <form >
                    <div className="f">
                        <Container>
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={3}>
                                    <TextField fullWidth value={name} onChange={NameChange} label="Username" variant="outlined" style={{ width: "200px", color : "white" }} />
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                    <div className="f">
                    <Grid item xs={6} md={3}>

                        <input type="submit"  className="btn btn-primary" value="Submit" />

                    </Grid>
                    </div>
                </form>
            </div>
        </div>


    );
};
export default New

