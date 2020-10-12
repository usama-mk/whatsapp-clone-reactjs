import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import userEvent from '@testing-library/user-event';
import React , {useEffect, useState} from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { useStateValue } from '../../Context Api/StateProvider';
import firebase from 'firebase';
import db from '../../firebase';
import './Chat.css';

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const [roomName, setRoomName] = useState("");
    const {roomId} = useParams();
    const [messages, setMessages] = useState([])
    const [{user}, dispatch] = useStateValue();
    
    // [the variable used in useEffect should be in the brackets at the end]
    useEffect(()=>{
        db.collection("rooms").doc(`${roomId}`).onSnapshot((snapshot)=>{
            setRoomName(snapshot.data().name)
        
        db.collection("rooms").doc(roomId).collection("messages").orderBy("timeStamp" , "asc").onSnapshot((snapshot)=>
        (
            setMessages(snapshot.docs.map(doc => 
                doc.data()
                ))
        ))
 
        });
    },[roomId]);
    //runs once, then again when the room id changes
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    }, [roomId] );

    const sendMessage = (e) => {
    e.preventDefault();  //stops page from refreshing --with every event--
    console.log("You typed >>> ", input);
    db.collection("rooms").doc(roomId).collection("messages").add({
        message: input,
        name: user.displayName,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp()

    })
    setInput("");
    }

    return (
        <div className="chat">

            {/* CHAT HEADER */}
            <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
    <p>last seen{" "}{new Date(
                        messages[messages.length - 1]?.timeStamp?.toDate()
                    ).toUTCString()}</p>
                </div>
                {/* CHAT HEADER RIGHT */}
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>

                </div>
            </div>

            {/* CHAT BODY */}
            <div className="chat__body ">
                {/* THE MESSAGE SECTION */}
                {messages.map((message) => {
                  return( <p className={`chat__message ${message.name===user.displayName && "chat__reciever"}`}>
                     <span className="chat__name">
                       {message.name}
                    </span>
                         {message.message}
                         <span className="chat__timeStamp">
                            {new Date(message.timeStamp?.toDate()).toUTCString()}
                         </span>
                     </p>);
                })}
               
              
            </div>
            
            {/* CHAT FOOTER */}
            <div className="chat__footer">
                <InsertEmoticon/>
                <form action="">
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message" />
                    <button onClick={sendMessage} type="submit">send a message</button>
                </form>
                <Mic/>
            </div>

        </div>
    )
}

export default Chat
