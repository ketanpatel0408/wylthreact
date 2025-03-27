import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: 'var(--white)',
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: 'var(--blue-50)',
                },
                contained: {
                    borderColor: 'var(--blue-500) !important',
                    backgroundColor: 'var(--blue-500) !important',
                    color: 'var(--blue-50) !important',
                    '&:hover': {
                        backgroundColor: 'var(--blue-600) !important',
                        borderColor: 'var(--blue-600) !important',
                    },
                },
                outlined: {
                    borderColor: 'var(--blue-500) !important',
                    color: 'var(--blue-500) !important',
                    backgroundColor: 'var(--blue-50) !important',
                    '&:hover': {
                        backgroundColor: 'var(--blue-500) !important',
                        borderColor: 'var(--blue-500) !important',
                        color: 'var(--blue-50) !important',
                    },
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                switchBase: {
                    '&.Mui-checked': {
                        color: 'var(--blue-900) !important',
                    },
                    '&.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: 'var(--blue-900) !important',
                    },
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: 'var(--white) !important',
                        fontWeight: '500 !important',
                    }
                }
            }
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    display: "none",
                },
            },
        },
        MuiTabScrollButton: {
            styleOverrides: {
                root: {
                    backgroundColor: 'var(--white)',

                    '&.Mui-disabled': {
                        display: "none"
                    }
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    Color: 'var(--gray-800)',
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "var(--blue-500) !important",
                    },
                },
            },
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        color: 'var(--white)',
                        backgroundColor: 'var(--blue-500) !important',
                    }
                }
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: 'var(--blue-500)',
                    }
                }
            }
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: "gray",
                    "&.Mui-checked": {
                        color: "var(--blue-500)",
                    },
                },
            },
        }
    },
});

export default customTheme;