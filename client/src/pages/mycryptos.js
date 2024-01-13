import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
const Mycryptos = () => {
    const [cryptos, setCryptos] = useState(null)
    const [details, setDetails] = useState(null)
    const getCryptos = async()=>{
        try{
            const response = await axios.post("http://localhost:3001/auth/cryptos", {
                userId:window.localStorage.getItem('userID'),
              });
            setCryptos(response.data.cryptos);
            console.log(cryptos);
        }catch(err){
            console.log(err);
        }
    }
    const getDetails = async()=>{
        if(cryptos!=null){
            try{
                const response = await axios.post("http://localhost:5000/getinfo", {
                    names:cryptos
                })
                console.log(response.data.cryptos);
                setDetails(response.data.cryptos);
            }catch(err){
                console.log(err);
            }
        }
    }
    const deleteCrypto = async(cryptoName)=>{
        try{
            const response = await axios.put(`http://localhost:3001/auth/cryptos/${window.localStorage.getItem('userID')}/${cryptoName}`)
            console.log(response.status);
            alert("Successfully deleted!")

        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getCryptos();
    },[])
  return (
    <div className='App'><br/>
      <button onClick={getDetails}>Scrape Data</button><br/>
      <div>
        
      <Container maxWidth="">
                    <Grid container spacing={2}>
                      {details!=null && details.map((name) => (
                        <Grid item  xs={12} sm={6} md={6} lg={6}>
                          <Card
                            sx={{
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              width: '50rem',
                              backgroundColor: '#333',
                              color: '#fff',
                              '&:hover': {
                                backgroundColor: '#555',
                              },
                              transition: 'background-color 0.3s',
                              cursor: 'pointer',
                            }}
                            
                          >
                            
                            <CardContent sx={{ flexGrow: 1 }}>
                            <IconButton sx={{ p: 0 }}>
                                <Avatar alt={name.term} src={name.logo!==undefined ? name.logo:"logo"} />
                            </IconButton>
                              <Typography gutterBottom variant="h5" component="h2">
                                {name.crypto!==undefined ? name.crypto:name.term}
                              </Typography>
                              {name.price!==undefined ? <>
                              <Typography>
                                <strong>Price:</strong> {name.price}
                              </Typography>
                              <Typography>
                                Circulating Supply: {name['Circulating supply']}
                              </Typography>
                              <Typography>
                              Fully diluted market cap: {name['Fully diluted market cap']}
                              </Typography>
                              <Typography>
                              Market cap: {name['Market cap']}
                              </Typography>
                              <Typography>
                              Max. supply: {name['Max. supply']}
                              </Typography>
                              <Typography>
                              Total supply: {name['Total supply']}
                              </Typography>
                              <Typography>
                              Volume (24h): {name['Volume (24h)']}
                              </Typography>
                              <Typography>
                              Volume/Market cap (24h): {name['Volume/Market cap (24h)']}
                              </Typography></>
:<h1>Does not exist!</h1>}
                            </CardContent>
                            <CardActions>
                            <Button size="small" onClick={()=>deleteCrypto(name.term)}>Delete</Button>
                            </CardActions>
                          </Card>
                        
                        </Grid>
                      ))}
                      
                    </Grid>
                  </Container>
      </div>
    </div>
  )
}

export default Mycryptos
