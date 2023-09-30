import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginComponent = () => {
  const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            //toast.success("Login success");
            router.push("/home");
        } catch (error) {
            console.log("Login failed", error.message);
            //toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);


    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

  return (
    <div className="flex flex-col "
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "5px",
        gap: "8px",
        paddingTop: "0px",
        textAlign: "center",
      }}>
      <p style={{
        color: "orange",
        fontSize: "25px",
        fontWeight: "bold",
      }}>Welcome Back to RentNest</p>
          <div className="email">
          <TextField id="outlined-basic" label="Email" variant="outlined" sx={{
                  width: "404px"
        }}
        onChange={(e) => setUser({...user, email: e.target.value})}/>
          </div>
          <div className="password">
          <FormControl sx={{  width: '404px' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setUser({...user, password: e.target.value})}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
          </div>
          <div className="Login">
              <Button variant="contained" color="success"
                  sx={{
                  width:"404px"
          }}
          onClick={onLogin}>Login !</Button>
          </div>
          <div className="new-user" style={{fontSize:"20px"}}>
              New user ?  <a href="/signup" style={{color:"blue",textDecoration:"none"}}>SignUp</a>
          </div>
    </div>
  )
}

export default LoginComponent;