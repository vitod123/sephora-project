const tabsStyle = {
    flexGrow: 1,
    maxWidth: 'none',
    '&.Mui-selected': {
        color: 'black',
        fontSize: '24px',
        textTransform: 'none'
    },
    '&:not(.Mui-selected)': {
        color: 'grey',
        fontSize: '24px',
        textTransform: 'none',
    }
}

export default tabsStyle;