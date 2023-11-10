import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as AbsensiIcon } from '../icons/icon1.svg';
import Wave from 'react-wavify'
const BerandaPages = ()=>{
    const menuContainerStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', // two columns
        gap: '20px',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '30px',
      };
    
      const menuItemStyle = {
        display: 'flex',
        borderRadius: '5%',
        fontSize: '1.5rem',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontFamily: 'Poppins, sans-serif',
        textDecoration: 'none', // This removes the underline from the links
        color: 'white', // This sets the text color to white, change as necessary
      };
    
      // Set a specific class for each menu item to apply the background colors
      const absensiStyle = {
        backgroundColor: '#6c757d',
      };
    
      const editDataStyle = {
        backgroundColor: '#fd7e14',
      };
    
      const laporanStyle = {
        backgroundColor: '#6f42c1',
      };
    
      const manajemenStyle = {
        backgroundColor: '#d63384',
      };
    
      // The square aspect ratio trick
      const beforeStyle = {
        content: '""',
        float: 'left',
        paddingTop: '100%', // This creates the square aspect ratio
      };
    
      const afterStyle = {
        clear: 'both',
        display: 'table',
      };
  
    
    return(
        <div>
        <div style={menuContainerStyle}>
        <Link to="/absensi" style={{ ...menuItemStyle, ...absensiStyle }}>
          <span style={beforeStyle}>
          </span>
          
          Absensi
          <span style={afterStyle}></span>
        </Link>
        <Link to="/edit-data" style={{ ...menuItemStyle, ...editDataStyle }}>
          <span style={beforeStyle}></span>
          Edit Data
          <span style={afterStyle}></span>
        </Link>
        <Link to="/laporan" style={{ ...menuItemStyle, ...laporanStyle }}>
          <span style={beforeStyle}></span>
          Laporan
          <span style={afterStyle}></span>
        </Link>
        <Link to="/manajemen" style={{ ...menuItemStyle, ...manajemenStyle }}>
          <span style={beforeStyle}></span>
          Manajemen
          <span style={afterStyle}></span>
        </Link>


  </div>
  <Wave fill='#f79902'
        paused={false}
        style={{ display: 'flex' }}
        options={{
          height: 20,
          amplitude: 30,
          speed: 0.2,
          points: 4
        }}
  />
      </div>
    
    )
};
export default BerandaPages;