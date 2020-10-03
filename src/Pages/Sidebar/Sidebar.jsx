import { Avatar, IconButton } from '@material-ui/core'
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons'
import React from 'react'
import './Sidebar.styles.css';

function Sidebar() {
    return (
        <div className="sidebar">
            {/* SIDEBAR HEADER */}
            <div className="sidebar__header">
                <Avatar />
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
            {/* SIDEBAR CHATS */}
            <div className="sidebar__chats">
                <h1>Sidebar Chat</h1>
                <h1>Sidebar Chat</h1>
                <h1>Sidebar Chat</h1>
                <h1>Sidebar Chat</h1>
                <h1>Sidebar Chat</h1>

            </div>
        </div>
    )
}

export default Sidebar;
