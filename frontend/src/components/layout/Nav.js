import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DehazeIcon from '@mui/icons-material/Dehaze';
import IconButton from '@mui/material/IconButton';


export default function Nav() {
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const [anchorEl3, setAnchorEl3] = React.useState(null);
    const open1 = Boolean(anchorEl1);
    const open2 = Boolean(anchorEl2);
    const open3 = Boolean(anchorEl3);

    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };
    const handleClose1 = () => {
        setAnchorEl1(null);
    };

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const handleClick3 = (event) => {
        setAnchorEl3(event.currentTarget);
    };
    const handleClose3 = () => {
        setAnchorEl3(null);
    };

    const [value1, setValue1] = React.useState('one1');
    const [value2, setValue2] = React.useState('one2');
    const [value3, setValue3] = React.useState('one3');

    const handleChange1 = (event, newValue) => {
        setValue1(newValue);
    };
    const handleChange2 = (event, newValue) => {
        setValue2(newValue);
    };
    const handleChange3 = (event, newValue) => {
        setValue3(newValue);
    };

    const options = [
        'All',
        'Floor Drain',
        'Chutney',
        'Spices',
        'Instant Mix',
        'Snacks',
        'Others',
        'Oberon',
    ];
    const ITEM_HEIGHT = 48;
    const [anchorE0, setAnchorE0] = React.useState(null);
    const open0 = Boolean(anchorE0);
    const handleClick0 = (event) => {
        setAnchorE0(event.currentTarget);
    };
    const handleClose0 = () => {
        setAnchorE0(null);
    };
    return (
        <div className='menu'>
            <Box sx={{ width: '100%' }}>
                <div>
                    <IconButton
                        className='menu-button mt-1 mb-1 ml-3'
                        aria-label="more"
                        id="long-button"
                        aria-controls={open0 ? 'long-menu' : undefined}
                        aria-expanded={open0 ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick0}
                    >
                        <DehazeIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorE0}
                        open={open0}
                        onClose={handleClose0}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                            },
                        }}
                    >
                        {options.map((option) => (
                            <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose0}>
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>






                    <Button variant="text"
                        className='menu-button mt-1 mb-1 ml-3'
                        id="basic-button2"
                        aria-controls={open2 ? 'basic-menu2' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open2 ? 'true' : undefined}
                        onClick={handleClick2}
                    >
                        About
                    </Button>
                    <Menu
                        id="basic-menu2"
                        anchorEl={anchorEl2}
                        open={open2}
                        onClose={handleClose2}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button2',
                        }}
                    >
                        <MenuItem onClick={handleClose2}>Profile</MenuItem>
                        <MenuItem onClick={handleClose2}>My account</MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose1}>Logout</MenuItem>

                    </Menu>



                    <Button variant="text"
                        className='menu-button mt-1 mb-1 ml-3'
                        id="basic-button3"
                        aria-controls={open3 ? 'basic-menu3' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open3 ? 'true' : undefined}
                        onClick={handleClick3}
                    >
                        Contact
                    </Button>
                    <Menu
                        id="basic-menu3"
                        anchorEl={anchorEl3}
                        open={open3}
                        onClose={handleClose3}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button3',
                        }}
                    >
                        <MenuItem onClick={handleClose3}>Company</MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose3}>Address :
                            Pune, Maharashtra 411027, India</MenuItem>
                    </Menu>

                </div>
            </Box>
        </div>
    );
}
