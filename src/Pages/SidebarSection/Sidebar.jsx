import { Avatar, IconButton } from '@material-ui/core'
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import SidebarChat from '../../Components/SidebarChat';
import { useStateValue } from '../../Context Api/StateProvider';
import db from '../../firebase';  //the local firebase(file created by us) not the module firebase
import './Sidebar.styles.css';


function Sidebar() {
    const[rooms, setRooms]= useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(()=>{
        // snapshot takes the pic of rooms list(whats in there) and listens to live changes and then gets triggered again on change
        //so on CHANGE, DELETE OR UPDATE ETC it is like it takes another Snapshot(pic) of the list, and it gives us the new snapshot
        //hence it's real time everytime it gets updated we get the latest snapshot.
        //Whenever you do onSnapshot it returns unsubscribe //2:14:00
  const unsubscribe =   db.collection('rooms').onSnapshot((snapshot)=>
         {
        setRooms(snapshot.docs.map(doc =>    //  doc refers to the list of elements in the database,  //access whats inside the snapshot                          
            ({
                id: doc.id,        //the unique 'auto' ids
                data: doc.data(),  //the data inside the doc(coll>doc>data)
            })
            ))
         } );
         return () => {      //when comp cleansup/unmount(cleansup is better), (always) detach this real time listener after it's done using it(best def)
             unsubscribe();  //this is for optimization
         }
    }, []); //grabing the empty brackets(dependencies) here means to run this once, when the sidebar loads(once onlt)

    return (
        <div className="sidebar">
            {/* SIDEBAR HEADER */}
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                {/*SIDEBAR HEADER RIGHT */}
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <Chat />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>

                </div>

            </div>
            {/* SIDEBAR SEARCH */}
            <div className="sidebar__search">
               <div className="sidebar__searchContainer">
               <SearchOutlined/>
                <input type="text" placeholder="Search or start new chat"/>
               </div>
            </div>
            {/* SIDEBAR SINGLE CHAT TEMPLATE */}
            <div className="sidebar__chats">
              <SidebarChat addNewChat />
               {rooms.map(room => (
                   <SidebarChat key={room.id} id={room.id} 
                   name={room.data.name}
                   /> //key is used for performance in react
               ) )}
            </div>
        </div>
    )
}

export default Sidebar;
