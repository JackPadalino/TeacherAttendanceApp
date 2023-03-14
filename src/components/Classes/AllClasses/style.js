export const mainContainer = {
    display: "flex",
    flexDirection: "column",
    gap:"15px",
    //placeSelf: "center",
    //placeItems: "center",
    //placeContent: "center center",
    position: "relative",
};

export const headingStyle={
    fontFamily:"Montserrat",
};

export const className = {
    fontFamily:'Montserrat',
    fontSize:"22px"
};

export const buttonStyle={
    cursor:'pointer',
    fontFamily:"Montserrat",
    borderRadius:3,
    //marginBottom:"30px"
};

export const parentModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 5,
    px: 2,
    pb: 5,
    display:'flex',
    justifyContent:'center',
    alignItems:"center",
  };

export const childModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 5,
    px: 2,
    pb: 5,
    display:'flex',
    justifyContent:'center',
    alignItems:"center",
  };
