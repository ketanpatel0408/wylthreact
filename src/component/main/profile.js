import React from 'react';
import { IconButton, Avatar, Menu, MenuItem, Box } from '@mui/material';
import { Logout, Profile, UserAcccount } from '../svg';
import { CustomTooltip } from '../tooltip';

const ProfileMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <Box>
            <div className='flex items-center'>
                <CustomTooltip title="jaydeep" className="hidden sm:block">
                    <h6 className="text-dark mb-0 pr-4 hidden lg:block truncate max-w-[250px]">
                        <span className="text-black/50">Hi!</span> Jaydeep Patel
                    </h6>
                </CustomTooltip>
                <IconButton
                    onClick={handleOpen}
                    sx={{ width: 35, height: 35 }}
                    aria-controls={open ? 'profile-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar alt="Profile" src="" sx={{ width: 35, height: 35 }} />
                </IconButton>
            </div>
            <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                className='!z-[9999]'
                PaperProps={{
                    sx: {
                        maxHeight: 'none',
                        overflow: 'visible',
                    },
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', pt: 1, pb: 0, pl: 0, pr: 0 }}>
                    <div className="flex items-center mb-4 pl-3 pr-3">
                        <div className="flex-shrink-0">
                            <Avatar
                                src=""
                                alt="Profile"
                                sx={{
                                    width: "100px !important",
                                    height: "100px !important",
                                }}
                            />
                        </div>
                        <div className="ml-3">
                            <h5 className="m-0 text-base font-medium">Jaydeep Patel</h5>
                            <span className="bg-blue-500 text-white text-xs font-semibold rounded px-2 py-1 mt-1 inline-block">
                                Admin
                            </span>
                        </div>
                    </div>
                    <MenuItem onClick={handleClose}>
                        <div className='flex items-center justify-center w-[20px] h-[20px] mr-2'>
                            <Profile
                                className="w-[16px] h-[19px] text-gray-800 align-middle"
                                width="16"
                                height="19"
                                fill="currentColor"
                                viewBox="0 0 24 27"
                            />
                        </div>
                        <span className='mt-[3px]'>Profile</span>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <div className='flex items-center justify-center w-[20px] h-[20px] mr-2'>
                            <UserAcccount
                                className="w-[19px] h-[19px] text-gray-800 align-middle"
                                width="19"
                                height="19"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            />
                        </div>
                        <span className='mt-[3px]'>My account</span>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <div className='flex items-center justify-center w-[20px] h-[20px] mr-2'>
                            <Logout
                                className="w-[19px] h-[19px] text-gray-800 align-middle"
                                width="19"
                                height="19"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            />
                        </div>
                        <span className='mt-[3px]'>Logout</span>
                    </MenuItem>
                </Box>
            </Menu>
        </Box>
    );
};

export default ProfileMenu;