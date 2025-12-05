import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from "@mui/material/Box";

const options = [
    'Edit',
    'Delete',
];

const ITEM_HEIGHT = 48;

type ActionMenuProps = {
    onEdit: () => void,
    setOpenConfirm: (open: boolean) => void
}

export default function ActionMenu({onEdit, setOpenConfirm}: ActionMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const action = event.currentTarget.textContent;
        setAnchorEl(null);
        if (action === 'Edit') {
            onEdit();
        } else if (action === 'Delete') {
            setOpenConfirm(true);
        }
    }

    return (
        <Box
            sx={{
                p: 0,
                border: 'none',
                position: 'absolute',
                right: '15px',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                height: 'fit-content',
                width: 'fit-content',
            }}>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '10ch',
                        },
                    },
                    list: {
                        'aria-labelledby': 'long-button',
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleMenuItemClick}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}
