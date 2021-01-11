import React from 'react';
import './LoginModal.css';
import {Container} from "react-bootstrap";
import {
    Button,
    CircularProgress,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Modal
} from "@material-ui/core";
import {selectLoginModal, setLoginModal} from "../../store/app/appSlice";
import {login, selectLoggingState} from "../../store/user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";

function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

export default function LoginModal (props) {
    const dispatch = useDispatch();
    const signInModalOpen = useSelector(selectLoginModal);
    const isLogging = useSelector(selectLoggingState);

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);


    const onLogin = () => {
        dispatch(login({username, password}))
    }

    const onCloseLoginModal = () => {
        dispatch(setLoginModal(false));
    }

    return (
        <Modal
            disableAutoFocus={true}
            open={signInModalOpen}
            onClose={() => onCloseLoginModal()}>
            <div style={getModalStyle()} className="loginModal">
                <Container fluid className="flex-column" style={{padding: 0}}>
                    <AppBar position="static" style={{height: '50px', alignItems: 'center', justifyContent: 'center'}}>
                        <Toolbar style={{height: '50px'}}>
                            <Typography variant="h6">
                                Login
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <form className="my-flex-column" style={{padding: 15}}>
                        <FormControl>
                            <InputLabel>Username</InputLabel>
                            <Input onChange={e => setUsername(e.target.value)} type='text' required={true}/>
                        </FormControl>
                        <FormControl>
                            <InputLabel>Password</InputLabel>
                            <Input onChange={e => setPassword(e.target.value)}
                                   type={showPassword ? 'text' : 'password'}
                                   required={true}
                                   endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            }/>
                        </FormControl>
                        {isLogging ?
                            <div className="flex-center" style={{marginTop: 20}}>
                                <CircularProgress/>
                            </div>: null
                        }
                        <Button style={{marginTop: 20}} variant="contained" color="primary" onClick={() => onLogin()}>Sign in</Button>
                    </form>
                </Container>
            </div>
        </Modal>
    )
}