import React, { useState } from 'react'
import './App.css'
import {jsPDF} from "jspdf"

function App() {


  const[source,setSource] = useState('')
  const[destination,setDestination] = useState('')
  const[name,setName] = useState('')
  const[age,setAge] = useState('')
  const[date,setDate] = useState('')
  const[mob,setMob] = useState('')
  const[email,setEmail] = useState('')

  const getTodayDate=()=>{
    const today =new Date();
    return today.toISOString().split('T')[0];
  };
  const minDate = getTodayDate();
  const getBase64ImageFromURL = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  


  const downloadTicket = async ()=>{
    
      if(source==destination){
        alert('Source city and destination city should not be same')
      }
      else if(source=="" || destination==""||name==""||age==""||mob==""||date==""||email==""){
          alert("Can not book ticket with empty details")
      }

      else{
            const ticket = new jsPDF();
           

           const logoBase64 = await getBase64ImageFromURL('/logo.png');
            
           const arrowBase64 =await getBase64ImageFromURL("/right-arrow.png");
           ticket.addImage(arrowBase64,'PNG',98,48,15,10);

              // Outer Box
             ticket.rect(10, 10, 190, 50); // Top box
              
            ticket.setLineWidth(0.5);
              // Logos
             ticket.addImage(logoBase64, 'PNG', 12, 12, 30,25); // Left logo
            
              // Center icon or name
              ticket.setFontSize(23);
             ticket.setTextColor(206, 144, 177);
              ticket.text('RideReserve', 105, 25, { align: 'center' });
            
              ticket.setFontSize(12);
              ticket.setTextColor(0);
             ticket.text(' Reservation Slip', 105, 33, { align: 'center' });
            
              // From → To
             ticket.setFontSize(10);
              ticket.text("From", 20, 45);
           ticket.setFont('helvetica', 'bold');
              ticket.text(`${source}`, 20, 50);
              ticket.setFont('helvetica', 'normal');
              ticket.text(`Departure: ${date}`, 20, 55);

             
            
              ticket.text(`To`, 140, 45);
              ticket.setFont('helvetica', 'bold');
              ticket.text(`${destination}`, 140, 50);
              ticket.setFont('helvetica', 'normal');
              ticket.text(`Arrival: ${date}`, 140, 55); // Assuming one-day trip
            
              // Passenger Details box
              ticket.setLineWidth(0.2);
              ticket.rect(10, 70, 190, 60);
             ticket.setFontSize(12);
              ticket.setFont('helvetica', 'bold');
              ticket.text("Passenger Details", 15, 80);
            
             ticket.setFont('helvetica', 'normal');
              ticket.text(`Name:  ${name}`, 15, 90);
              ticket.text(`Age: ${age}`, 15, 100);
             ticket.text(`Mobile: ${mob}`, 15, 110);
              ticket.text(`Email: ${email}`, 15, 120);
            
              const message = "Thank you for booking ticket!";
const pageWidth = ticket.internal.pageSize.getWidth();
const textWidth = ticket.getTextWidth(message);
const centerX = (pageWidth - textWidth) / 2;

// 30px below the box (130 + 30 = 160)
ticket.text(message, centerX, 160);
              ticket.save("RideReserve_Ticket.pdf");
            };

           
      
  }


  return (
    <>
        <div className="main">
              <header className="header">
                <img src="./logo.png" width="200" height="100" style={{borderRadius:'12px'}}/>
                <h1  width="400"style={{color:"#ca5f98", letterSpacing:'7px', textAlign:'center',fontSize:'50px'}}>RideReserve</h1>
              </header>

              <div className='ticket'>
                    <h2 style={{fontSize:'32px', color:'#752851',letterSpacing:'7px', flexWrap:'wrap'}}>Book your ticket</h2>

                    <div className='form'>
                    
                     <div className="booking">
                      <div id="from">
                        <img src="./pick.png" width="35" height="35"></img>
                        <select value={source} onChange={(event)=>{setSource(event.target.value)}}>
                          <option>Select source city</option>
                          <option value="Hyderabad">Hyderabad</option>
                          <option value="Vizag">Vizag</option>
                          <option value="Bengaluru">Bengaluru</option>
                          <option value="Mumbai">Mumbai</option>
                          <option value="Pune">Pune</option>
                          <option value="guntur">Guntur</option>
                        </select>
                      </div>
                      <div id="to">
                      <img src="./drop.png" width="35" height="35"></img>
                        <select value={destination} onChange={(event)=>{setDestination(event.target.value)}}>
                          <option>Select Destination city</option>
                          <option value="Hyderabad">Hyderabad</option>
                          <option value="Vizag">Vizag</option>
                          <option value="Bengaluru">Bengaluru</option>
                          <option value="Mumbai">Mumbai</option>
                          <option value="Pune">Pune</option>
                          <option value="guntur">Guntur</option>
                        </select>
                        </div>

                        <div id="calender">
                        <img src="./calender.png" width="35" height="35"></img>
                        <input type='date' value={date} onChange={(event)=>setDate(event.target.value)}
                        min={minDate}
                        placeholder="yyyy-mm-dd"/>
                        </div>
                        </div>
                     

                       

                        
                        <div className="input">
                          <h3  height="50" width="200"style={{alignItems:"center",justifyContent:"center",color:"#923667",paddingLeft:"90px",fontSize:"20px"}}>Passenger Details</h3>
                          <div style={{display:'flex' ,columnGap:'10px',alignItems:'center',justifyContent:'center'}}>
                        <label style={{fontSize:'20px',width:'150'}}>Enter your name:</label>
                        <input type='text' placeholder='Enter your name'
                        value={name} onChange={(event)=>{setName(event.target.value)}}
                        />
                        </div>
                        <div style={{display:'flex',columnGap:'32px',alignItems:'center',justifyContent:'center'}}>
                         <label style={{fontSize:'20px',width:'150'}}>Enter your age:</label>
                        <input type='tel' placeholder='Enter your Age' value={age} onChange={(event)=>{setAge(event.target.value)}}/>
                      </div> 
                      <div style={{display:'flex',columnGap:'10px',alignItems:'center',justifyContent:'center'}}>
                        <label style={{fontSize:'20px',width:'150'}}>Enter you mobile:</label>
                        <input type='tel' placeholder='Enter your Mob' value={mob} onChange={(event)=>{setMob(event.target.value)}}/>
                      </div>
                      <div style={{display:'flex',columnGap:'20px',alignItems:'center',justifyContent:'center'}}>
                        <label style={{fontSize:'20px',width:'150'}}>Enter you email:</label>
                        <input type='email' placeholder='Enter your email'
                        value={email}
                        onChange={(event)=>{setEmail(event.target.value)}}
                        />
                        </div>
                      </div>
                   

                       
                    </div>
                    <div>
                    <button onClick={downloadTicket}>Download Ticket</button>
                    </div>
              </div>
        </div>
    </>
  )
}

export default App